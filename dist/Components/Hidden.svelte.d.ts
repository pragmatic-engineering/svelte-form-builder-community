import { SvelteComponentTyped } from 'svelte';
import type { ComponentOptions, Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
	};
	events: {
		pointerleave: PointerEvent;
		pointerenter: PointerEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type HiddenProps = typeof __propDef.props;
export type HiddenEvents = typeof __propDef.events;
export type HiddenSlots = typeof __propDef.slots;
export default class Hidden extends SvelteComponentTyped<HiddenProps, HiddenEvents, HiddenSlots> {}
export {};
