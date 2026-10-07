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
export type WeekProps = typeof __propDef.props;
export type WeekEvents = typeof __propDef.events;
export type WeekSlots = typeof __propDef.slots;
export default class Week extends SvelteComponentTyped<WeekProps, WeekEvents, WeekSlots> {}
export {};
