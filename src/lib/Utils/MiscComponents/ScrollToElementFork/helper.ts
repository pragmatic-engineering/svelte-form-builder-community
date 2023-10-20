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
    container?: any;
    onAborting?: any;
    element?: HTMLElement|null;
  }
  
  export interface ScrollToElementPosition {
    top: number;
    left: number;
  }

export const selector = (selector: HTMLElement|null|undefined): HTMLElement | null |undefined => {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  return selector;
};

export const extend = (...args: ScrollToElementOptions[]): ScrollToElementOptions =>
  Object.assign({}, ...args);

export const cumulativeOffset = (element: HTMLElement | any): ScrollToElementPosition => {
  let top = 0;
  let left = 0;

  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top,
    left
  };
};

export const directScroll = (element: HTMLElement | any): boolean =>
  element && element !== document && element !== document.body;

export const scrollTop = (element: HTMLElement | any, value?: number): number => {
  const inSetter = value !== undefined;
  if (directScroll(element)) {
    return inSetter ? (element.scrollTop = value) : element.scrollTop;
  }
  return inSetter
    ? (document.documentElement.scrollTop = document.body.scrollTop = value)
    : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

export const scrollLeft = (element: HTMLElement, value?: number): number => {
  const inSetter = value !== undefined;
  if (directScroll(element)) {
    return inSetter ? (element.scrollLeft = value) : element.scrollLeft;
  }
  return inSetter
    ? (document.documentElement.scrollLeft = document.body.scrollLeft = value)
    : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};