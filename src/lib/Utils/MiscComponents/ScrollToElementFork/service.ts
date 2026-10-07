import {
	type ScrollToElementOptions,
	cumulativeOffset,
	scrollLeft,
	scrollTop,
	extend,
	selector
} from '#lib/Utils/MiscComponents/ScrollToElementFork/helper';
import { cubicInOut } from 'svelte/easing';

const noop = () => undefined;
const now = () => performance.now();
const loop = (callback: (now: number) => boolean): (() => void) => {
	let rafId = 0;
	const tick = (time: number) => {
		if (!callback(time)) {
			return;
		}
		rafId = requestAnimationFrame(tick);
	};
	rafId = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(rafId);
};

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
		duration = 0,
		delay,
		easing,
		x = 0,
		y = 0,
		scrollX,
		scrollY,
		onStart = noop,
		onDone = noop,
		container,
		onAborting = noop,
		element
	} = options;

	let { offset } = options;

	if (typeof offset === 'function') {
		offset = offset() as number;
	}

	const cumulativeOffsetContainer = cumulativeOffset(container as HTMLElement);
	const cumulativeOffsetTarget = element
		? cumulativeOffset(element as HTMLElement)
		: { top: y, left: x };

	const initialX = scrollLeft(container as HTMLElement);
	const initialY = scrollTop(container as HTMLElement);

	const targetX = cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + (offset as number);
	const targetY = cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + (offset as number);

	const diffX = targetX - initialX;
	const diffY = targetY - initialY;

	let scrolling = true;
	let started = false;
	const startTime = now() + Number(delay || 0);
	const endTime = startTime + (duration ?? 0);

	function scrollToTopLeft(
		target: HTMLElement | null | undefined,
		top: number,
		left: number
	): void {
		if (!target) {
			return;
		}
		if (scrollX) scrollLeft(target, left);
		if (scrollY) scrollTop(target, top);
	}

	function start(delayStart: number | boolean | undefined): void {
		if (!delayStart) {
			started = true;
			onStart(element, { x, y });
		}
	}

	function tick(progress: number): void {
		scrollToTopLeft(
			container as HTMLElement,
			initialY + diffY * progress,
			initialX + diffX * progress
		);
	}

	function stop(): void {
		scrolling = false;
	}

	loop((time): boolean => {
		if (!started && time >= startTime) {
			start(false);
		}

		if (started && time >= endTime) {
			tick(1);
			stop();
			onDone(element, { x, y });
		}

		if (!scrolling) {
			onAborting(element, { x, y });
			return false;
		}
		if (started && duration) {
			const p = time - startTime;
			const t = easing(p / duration);
			tick(t);
		}

		return true;
	});

	start(delay);
	if (duration === 0) {
		tick(1);
	}
	tick(0);

	return stop;
};

const proceedOptions = (options?: ScrollToElementOptions): ScrollToElementOptions => {
	const opts = extend({}, defaultOptions, options ?? {});
	opts.container = selector(opts.container as string | HTMLElement | null | undefined) as
		HTMLElement | null | undefined;
	opts.element = selector(opts.element as string | HTMLElement | null | undefined) as
		HTMLElement | null | undefined;
	return opts;
};

const scrollContainerHeight = (
	containerElement: HTMLElement | string | null | undefined
): number => {
	const resolvedContainer = selector(containerElement) ?? document.body;
	if (resolvedContainer && resolvedContainer !== document.body) {
		return resolvedContainer.scrollHeight - resolvedContainer.offsetHeight;
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
	const resolvedOptions = proceedOptions(options);

	return scrollToInternal(
		extend(resolvedOptions, {
			element: null,
			y: scrollContainerHeight(resolvedOptions.container ?? document.body)
		})
	);
};

const scrollToTop = (options?: ScrollToElementOptions): (() => void) => {
	const resolvedOptions = proceedOptions(options);

	return scrollToInternal(
		extend(resolvedOptions, {
			element: null,
			y: 0
		})
	);
};

const makeScrollToAction =
	(scrollToFunc: (options?: ScrollToElementOptions | string) => void | (() => void)) =>
	(node: Node, options?: ScrollToElementOptions | string) => {
		let current = options;
		const handle: EventListenerOrEventListenerObject = (e: Event) => {
			e.preventDefault();
			const normalizedOptions = typeof current === 'string' ? { element: current } : current;
			scrollToFunc(normalizedOptions);
		};
		node.addEventListener('click', handle);
		node.addEventListener('touchstart', handle);
		return {
			update(nextOptions: ScrollToElementOptions | string | undefined): void {
				current = nextOptions;
			},
			destroy(): void {
				node.removeEventListener('click', handle);
				node.removeEventListener('touchstart', handle);
			}
		};
	};

const scrollToAdapter =
	(scrollToFunc: (options: ScrollToElementOptions) => () => void) =>
	(options?: ScrollToElementOptions | string) => {
		if (typeof options === 'string') {
			return scrollToFunc({ element: options });
		}
		return scrollToFunc(options ?? {});
	};

// Actions
export const scrollto = makeScrollToAction(scrollToAdapter(scrollTo));
export const scrolltotop = makeScrollToAction(scrollToAdapter(scrollToTop));
export const scrolltobottom = makeScrollToAction(scrollToAdapter(scrollToBottom));

// Methods
export const animateScroll = { scrollTo, scrollToTop, scrollToBottom, setGlobalOptions };
