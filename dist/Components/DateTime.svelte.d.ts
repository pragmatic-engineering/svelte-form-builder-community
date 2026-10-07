import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
	};
	events: {
		pointerleave: PointerEvent;
		pointerenter: PointerEvent;
		invalid: Event;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type DateTimeProps = typeof __propDef.props;
export type DateTimeEvents = typeof __propDef.events;
export type DateTimeSlots = typeof __propDef.slots;
export default class DateTime extends SvelteComponentTyped<
	DateTimeProps,
	DateTimeEvents,
	DateTimeSlots
> {}
export {};
