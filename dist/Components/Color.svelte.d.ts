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
export type ColorProps = typeof __propDef.props;
export type ColorEvents = typeof __propDef.events;
export type ColorSlots = typeof __propDef.slots;
export default class Color extends SvelteComponentTyped<ColorProps, ColorEvents, ColorSlots> {}
export {};
