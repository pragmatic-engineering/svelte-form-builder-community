import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type DragImageProps = typeof __propDef.props;
export type DragImageEvents = typeof __propDef.events;
export type DragImageSlots = typeof __propDef.slots;
export default class DragImage extends SvelteComponentTyped<
	DragImageProps,
	DragImageEvents,
	DragImageSlots
> {}
export {};
