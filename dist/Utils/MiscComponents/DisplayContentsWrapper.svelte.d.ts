import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		showIf: boolean;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type DisplayContentsWrapperProps = typeof __propDef.props;
export type DisplayContentsWrapperEvents = typeof __propDef.events;
export type DisplayContentsWrapperSlots = typeof __propDef.slots;
export default class DisplayContentsWrapper extends SvelteComponentTyped<
	DisplayContentsWrapperProps,
	DisplayContentsWrapperEvents,
	DisplayContentsWrapperSlots
> {}
export {};
