import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
		validateUserInput?: () => ValidationResult;
		customGetUserData?: () => any;
		triggerConditionChange?: () => void;
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
export type RadioGroupProps = typeof __propDef.props;
export type RadioGroupEvents = typeof __propDef.events;
export type RadioGroupSlots = typeof __propDef.slots;
export default class RadioGroup extends SvelteComponentTyped<
	RadioGroupProps,
	RadioGroupEvents,
	RadioGroupSlots
> {
	get validateUserInput(): () => ValidationResult;
	get customGetUserData(): () => any;
	get triggerConditionChange(): () => void;
}
export {};
