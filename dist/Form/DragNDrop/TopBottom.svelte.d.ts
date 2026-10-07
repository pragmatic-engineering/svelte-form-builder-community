import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		height?: string;
		text?: string;
	};
	events: {
		drop: DragEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type TopBottomProps = typeof __propDef.props;
export type TopBottomEvents = typeof __propDef.events;
export type TopBottomSlots = typeof __propDef.slots;
export default class TopBottom extends SvelteComponentTyped<
	TopBottomProps,
	TopBottomEvents,
	TopBottomSlots
> {}
export {};
