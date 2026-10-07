import {
	cumulativeOffset,
	scrollLeft,
	scrollTop,
	extend,
	selector
} from '$lib/Utils/MiscComponents/ScrollToElementFork/helper';
import { cubicInOut } from 'svelte/easing';
const noop = () => undefined;
const now = () => performance.now();
const loop = (callback) => {
	let rafId = 0;
	const tick = (time) => {
		if (!callback(time)) {
			return;
		}
		rafId = requestAnimationFrame(tick);
	};
	rafId = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(rafId);
};
const defaultOptions = {
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
const scrollToInternal = (options) => {
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
		offset = offset();
	}
	const cumulativeOffsetContainer = cumulativeOffset(container);
	const cumulativeOffsetTarget = element ? cumulativeOffset(element) : { top: y, left: x };
	const initialX = scrollLeft(container);
	const initialY = scrollTop(container);
	const targetX = cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset;
	const targetY = cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset;
	const diffX = targetX - initialX;
	const diffY = targetY - initialY;
	let scrolling = true;
	let started = false;
	const startTime = now() + Number(delay || 0);
	const endTime = startTime + (duration ?? 0);
	function scrollToTopLeft(target, top, left) {
		if (!target) {
			return;
		}
		if (scrollX) scrollLeft(target, left);
		if (scrollY) scrollTop(target, top);
	}
	function start(delayStart) {
		if (!delayStart) {
			started = true;
			onStart(element, { x, y });
		}
	}
	function tick(progress) {
		scrollToTopLeft(container, initialY + diffY * progress, initialX + diffX * progress);
	}
	function stop() {
		scrolling = false;
	}
	loop((time) => {
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
const proceedOptions = (options) => {
	const opts = extend({}, defaultOptions, options ?? {});
	opts.container = selector(opts.container);
	opts.element = selector(opts.element);
	return opts;
};
const scrollContainerHeight = (containerElement) => {
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
const setGlobalOptions = (options) => {
	extend(defaultOptions, options || {});
};
const scrollTo = (options) => scrollToInternal(proceedOptions(options));
const scrollToBottom = (options) => {
	const resolvedOptions = proceedOptions(options);
	return scrollToInternal(
		extend(resolvedOptions, {
			element: null,
			y: scrollContainerHeight(resolvedOptions.container ?? document.body)
		})
	);
};
const scrollToTop = (options) => {
	const resolvedOptions = proceedOptions(options);
	return scrollToInternal(
		extend(resolvedOptions, {
			element: null,
			y: 0
		})
	);
};
const makeScrollToAction = (scrollToFunc) => (node, options) => {
	let current = options;
	const handle = (e) => {
		e.preventDefault();
		const normalizedOptions = typeof current === 'string' ? { element: current } : current;
		scrollToFunc(normalizedOptions);
	};
	node.addEventListener('click', handle);
	node.addEventListener('touchstart', handle);
	return {
		update(nextOptions) {
			current = nextOptions;
		},
		destroy() {
			node.removeEventListener('click', handle);
			node.removeEventListener('touchstart', handle);
		}
	};
};
const scrollToAdapter = (scrollToFunc) => (options) => {
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
