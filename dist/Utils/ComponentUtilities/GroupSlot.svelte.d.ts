import { SvelteComponentTyped } from 'svelte';
import type { Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type GroupSlotProps = typeof __propDef.props;
export type GroupSlotEvents = typeof __propDef.events;
export type GroupSlotSlots = typeof __propDef.slots;
export default class GroupSlot extends SvelteComponentTyped<
	GroupSlotProps,
	GroupSlotEvents,
	GroupSlotSlots
> {}
export {};
