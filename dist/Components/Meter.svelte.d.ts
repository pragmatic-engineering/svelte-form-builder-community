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
export type MeterProps = typeof __propDef.props;
export type MeterEvents = typeof __propDef.events;
export type MeterSlots = typeof __propDef.slots;
export default class Meter extends SvelteComponentTyped<MeterProps, MeterEvents, MeterSlots> {}
export {};
