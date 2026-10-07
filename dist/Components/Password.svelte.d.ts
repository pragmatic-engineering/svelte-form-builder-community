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
export type PasswordProps = typeof __propDef.props;
export type PasswordEvents = typeof __propDef.events;
export type PasswordSlots = typeof __propDef.slots;
export default class Password extends SvelteComponentTyped<
	PasswordProps,
	PasswordEvents,
	PasswordSlots
> {}
export {};
