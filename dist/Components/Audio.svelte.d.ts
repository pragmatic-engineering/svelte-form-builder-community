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
export type AudioProps = typeof __propDef.props;
export type AudioEvents = typeof __propDef.events;
export type AudioSlots = typeof __propDef.slots;
export default class Audio extends SvelteComponentTyped<AudioProps, AudioEvents, AudioSlots> {}
export {};
