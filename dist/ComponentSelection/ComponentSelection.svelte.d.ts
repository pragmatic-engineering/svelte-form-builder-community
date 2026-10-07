import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ComponentSelectionProps = typeof __propDef.props;
export type ComponentSelectionEvents = typeof __propDef.events;
export type ComponentSelectionSlots = typeof __propDef.slots;
export default class ComponentSelection extends SvelteComponentTyped<
	ComponentSelectionProps,
	ComponentSelectionEvents,
	ComponentSelectionSlots
> {}
export {};
