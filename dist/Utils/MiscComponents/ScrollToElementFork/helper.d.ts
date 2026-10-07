export interface ScrollToElementOptions {
	offset?: number | Function;
	duration?: number;
	delay?: number | boolean;
	easing?: any;
	x?: number;
	y?: number;
	scrollX?: boolean;
	scrollY?: boolean;
	onStart?: any;
	onDone?: any;
	container?: HTMLElement | string | null;
	onAborting?: any;
	element?: HTMLElement | string | null;
}
export interface ScrollToElementPosition {
	top: number;
	left: number;
}
export declare const selector: (
	selector: HTMLElement | string | null | undefined
) => HTMLElement | null | undefined;
export declare const extend: (...args: ScrollToElementOptions[]) => ScrollToElementOptions;
export declare const cumulativeOffset: (element: HTMLElement | any) => ScrollToElementPosition;
export declare const directScroll: (element: HTMLElement | any) => boolean;
export declare const scrollTop: (element: HTMLElement | any, value?: number) => number;
export declare const scrollLeft: (element: HTMLElement, value?: number) => number;
