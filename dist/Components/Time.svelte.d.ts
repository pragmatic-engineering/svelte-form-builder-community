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
export type TimeProps = typeof __propDef.props;
export type TimeEvents = typeof __propDef.events;
export type TimeSlots = typeof __propDef.slots;
export default class Time extends SvelteComponentTyped<TimeProps, TimeEvents, TimeSlots> {}
export {};
