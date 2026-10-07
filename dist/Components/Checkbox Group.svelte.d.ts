import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
		validateUserInput?: () => ValidationResult;
		customGetUserData?: () => string[];
		customReset?: () => void;
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
export type CheckboxGroupProps = typeof __propDef.props;
export type CheckboxGroupEvents = typeof __propDef.events;
export type CheckboxGroupSlots = typeof __propDef.slots;
export default class CheckboxGroup extends SvelteComponentTyped<
	CheckboxGroupProps,
	CheckboxGroupEvents,
	CheckboxGroupSlots
> {
	get validateUserInput(): () => ValidationResult;
	get customGetUserData(): () => string[];
	get customReset(): () => void;
	get triggerConditionChange(): () => void;
}
export {};
