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
export type SelectOptionsProps = typeof __propDef.props;
export type SelectOptionsEvents = typeof __propDef.events;
export type SelectOptionsSlots = typeof __propDef.slots;
export default class SelectOptions extends SvelteComponentTyped<
	SelectOptionsProps,
	SelectOptionsEvents,
	SelectOptionsSlots
> {}
export {};
