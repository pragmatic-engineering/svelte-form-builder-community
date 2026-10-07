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
export type TextAreaProps = typeof __propDef.props;
export type TextAreaEvents = typeof __propDef.events;
export type TextAreaSlots = typeof __propDef.slots;
export default class TextArea extends SvelteComponentTyped<
	TextAreaProps,
	TextAreaEvents,
	TextAreaSlots
> {}
export {};
