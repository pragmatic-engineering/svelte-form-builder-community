import {
	type ScrollToElementOptions,
	cumulativeOffset,
	scrollLeft,
	scrollTop,
	extend,
	selector
} from '$lib/Utils/MiscComponents/ScrollToElementFork/helper';
import { cubicInOut } from 'svelte/easing';
import { loop, noop, now } from 'svelte/internal';

const defaultOptions: ScrollToElementOptions = {
	container: 'body',
	duration: 500,
	delay: 0,
	offset: 0,
	easing: cubicInOut,
	onStart: noop,
	onDone: noop,
	onAborting: noop,
	scrollX: false,
	scrollY: true
};

const scrollToInternal = (options: ScrollToElementOptions): (() => void) => {
	const {
		duration,
		delay,
		easing,
		x = 0,
		y = 0,
		scrollX,
		scrollY,
		onStart,
		onDone,
		container,
		onAborting,
		element
	} = options;

	let { offset } = options;

	if (typeof offset === 'function') {
		offset = offset() as Function;
	}

	const cumulativeOffsetContainer = cumulativeOffset(container);
	const cumulativeOffsetTarget = element ? cumulativeOffset(element) : { top: y, left: x };

	const initialX = scrollLeft(container);
	const initialY = scrollTop(container);

	const targetX = cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + (offset as number);
	const targetY = cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + (offset as number);

	const diffX = targetX - initialX;
	const diffY = targetY - initialY;

	let scrolling = true;
	let started = false;
	const startTime = now() + delay;
	const endTime = startTime + duration;

	function scrollToTopLeft(element: HTMLElement, top: number, left: number): void {
		if (scrollX) scrollLeft(element, left);
		if (scrollY) scrollTop(element, top);
	}

	function start(delayStart: number | boolean): void {
		if (!delayStart) {
			started = true;
			onStart(element, { x, y });
		}
	}

	function tick(progress: number): void {
		scrollToTopLeft(container, initialY + diffY * progress, initialX + diffX * progress);
	}

	function stop(): void {
		scrolling = false;
	}

	loop((now): boolean => {
		if (!started && now >= startTime) {
			start(false);
		}

		if (started && now >= endTime) {
			tick(1);
			stop();
			onDone(element, { x, y });
		}

		if (!scrolling) {
			onAborting(element, { x, y });
			return false;
		}
		if (started && duration) {
			const p = now - startTime;
			const t = 0 + 1 * easing(p / duration);
			tick(t);
		}

		return true;
	});

	start(delay);

	tick(0);

	return stop;
};

const proceedOptions = (options: ScrollToElementOptions): ScrollToElementOptions => {
	const opts = extend({}, defaultOptions, options);
	opts.container = selector(opts.container);
	opts.element = selector(opts.element);
	return opts;
};

const scrollContainerHeight = (containerElement: HTMLElement | Document): number => {
	if (containerElement && containerElement !== document && containerElement !== document.body) {
		return (
			(containerElement as HTMLElement).scrollHeight -
			(containerElement as HTMLElement).offsetHeight
		);
	}
	const { body } = document;
	const html = document.documentElement;

	return Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);
};

const setGlobalOptions = (options: ScrollToElementOptions): void => {
	extend(defaultOptions, options || {});
};

const scrollTo = (options: ScrollToElementOptions): (() => void) =>
	scrollToInternal(proceedOptions(options));

const scrollToBottom = (options?: ScrollToElementOptions): (() => void) => {
	options = proceedOptions(options);

	return scrollToInternal(
		extend(options, {
			element: null,
			y: scrollContainerHeight(options.container)
		})
	);
};

const scrollToTop = (options?: ScrollToElementOptions): (() => void) => {
	options = proceedOptions(options);

	return scrollToInternal(
		extend(options, {
			element: null,
			y: 0
		})
	);
};

const makeScrollToAction =
	(scrollToFunc: Function) => (node: Node, options: ScrollToElementOptions) => {
		let current = options;
		const handle: EventListenerOrEventListenerObject = (e: Event) => {
			e.preventDefault();
			scrollToFunc(typeof current === 'string' ? { element: current } : current);
		};
		node.addEventListener('click', handle);
		node.addEventListener('touchstart', handle);
		return {
			update(options: ScrollToElementOptions): void {
				current = options;
			},
			destroy(): void {
				node.removeEventListener('click', handle);
				node.removeEventListener('touchstart', handle);
			}
		};
	};

// Actions
export const scrollto = makeScrollToAction(scrollTo);
export const scrolltotop = makeScrollToAction(scrollToTop);
export const scrolltobottom = makeScrollToAction(scrollToBottom);

// Methods
export const animateScroll = { scrollTo, scrollToTop, scrollToBottom, setGlobalOptions };
