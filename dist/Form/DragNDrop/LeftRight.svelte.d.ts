import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		drop: DragEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type LeftRightProps = typeof __propDef.props;
export type LeftRightEvents = typeof __propDef.events;
export type LeftRightSlots = typeof __propDef.slots;
export default class LeftRight extends SvelteComponentTyped<
	LeftRightProps,
	LeftRightEvents,
	LeftRightSlots
> {}
export {};
