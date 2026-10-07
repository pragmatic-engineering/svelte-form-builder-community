export type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning';

export type ToastOptions = {
	type?: ToastType;
	closeButton?: boolean;
	[key: string]: unknown;
};

type ToastItem = {
	id: number;
	message: string;
	type: ToastType;
	closeButton: boolean;
};

declare global {
	var __sfb_toasts__:
		| {
				nextId: number;
				items: ToastItem[];
		  }
		| undefined;
}

const registry = (() => {
	const globalObject = globalThis as typeof globalThis & {
		__sfb_toasts__?: {
			nextId: number;
			items: ToastItem[];
		};
	};

	if (!globalObject.__sfb_toasts__) {
		globalObject.__sfb_toasts__ = { nextId: 0, items: [] };
	}

	return globalObject.__sfb_toasts__;
})();

export function getToastRegistry() {
	return registry;
}

const pushToast = (message: string, options: ToastOptions = {}): number => {
	const nextId = ++registry.nextId;
	registry.items = [
		...registry.items,
		{
			id: nextId,
			message,
			type: options.type ?? 'default',
			closeButton: options.closeButton ?? false
		}
	];

	return nextId;
};

export const toast = Object.assign(
	(message: string, options: ToastOptions = {}) => pushToast(message, options),
	{
		push: (message: string, options: ToastOptions = {}) => pushToast(message, options),
		success: (message: string, options: ToastOptions = {}) =>
			pushToast(message, { ...options, type: 'success' }),
		error: (message: string, options: ToastOptions = {}) =>
			pushToast(message, { ...options, type: 'error' }),
		info: (message: string, options: ToastOptions = {}) =>
			pushToast(message, { ...options, type: 'info' }),
		warning: (message: string, options: ToastOptions = {}) =>
			pushToast(message, { ...options, type: 'warning' }),
		dismiss: (toastId?: number | string) => {
			if (toastId === undefined) {
				registry.items = [];
				return;
			}

			const targetId = typeof toastId === 'string' ? Number(toastId) : toastId;
			registry.items = registry.items.filter((entry) => entry.id !== targetId);
		}
	}
);

export { default as Toaster } from './Toaster.svelte';
