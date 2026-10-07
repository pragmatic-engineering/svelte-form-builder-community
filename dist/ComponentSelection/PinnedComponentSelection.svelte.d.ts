import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PinnedComponentSelectionProps = typeof __propDef.props;
export type PinnedComponentSelectionEvents = typeof __propDef.events;
export type PinnedComponentSelectionSlots = typeof __propDef.slots;
export default class PinnedComponentSelection extends SvelteComponentTyped<
	PinnedComponentSelectionProps,
	PinnedComponentSelectionEvents,
	PinnedComponentSelectionSlots
> {}
export {};
