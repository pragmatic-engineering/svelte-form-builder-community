import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type TabHeaderProps = typeof __propDef.props;
export type TabHeaderEvents = typeof __propDef.events;
export type TabHeaderSlots = typeof __propDef.slots;
export default class TabHeader extends SvelteComponentTyped<
	TabHeaderProps,
	TabHeaderEvents,
	TabHeaderSlots
> {}
export {};
