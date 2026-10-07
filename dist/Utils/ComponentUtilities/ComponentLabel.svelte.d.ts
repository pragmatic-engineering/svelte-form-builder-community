import { SvelteComponentTyped } from 'svelte';
import type { Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ComponentLabelProps = typeof __propDef.props;
export type ComponentLabelEvents = typeof __propDef.events;
export type ComponentLabelSlots = typeof __propDef.slots;
export default class ComponentLabel extends SvelteComponentTyped<
	ComponentLabelProps,
	ComponentLabelEvents,
	ComponentLabelSlots
> {}
export {};
