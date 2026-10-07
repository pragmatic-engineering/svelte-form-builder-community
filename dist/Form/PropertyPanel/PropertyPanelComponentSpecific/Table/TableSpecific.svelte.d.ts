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
export type TableSpecificProps = typeof __propDef.props;
export type TableSpecificEvents = typeof __propDef.events;
export type TableSpecificSlots = typeof __propDef.slots;
export default class TableSpecific extends SvelteComponentTyped<
	TableSpecificProps,
	TableSpecificEvents,
	TableSpecificSlots
> {}
export {};
