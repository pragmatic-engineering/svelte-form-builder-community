import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
	};
	events: {
		invalid: Event;
		pointerleave: PointerEvent;
		pointerenter: PointerEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type MonthProps = typeof __propDef.props;
export type MonthEvents = typeof __propDef.events;
export type MonthSlots = typeof __propDef.slots;
export default class Month extends SvelteComponentTyped<MonthProps, MonthEvents, MonthSlots> {}
export {};
