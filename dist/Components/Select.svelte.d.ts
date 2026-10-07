import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
		triggerConditionChange?: () => void;
		validateUserInput?: () => ValidationResult;
	};
	events: {
		pointerleave: PointerEvent;
		pointerenter: PointerEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
export default class Select extends SvelteComponentTyped<SelectProps, SelectEvents, SelectSlots> {
	get triggerConditionChange(): () => void;
	get validateUserInput(): () => ValidationResult;
}
export {};
