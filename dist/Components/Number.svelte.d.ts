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
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type NumberProps = typeof __propDef.props;
export type NumberEvents = typeof __propDef.events;
export type NumberSlots = typeof __propDef.slots;
export default class Number extends SvelteComponentTyped<NumberProps, NumberEvents, NumberSlots> {}
export {};
