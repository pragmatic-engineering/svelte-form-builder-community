import { SvelteComponentTyped } from 'svelte';
import type { Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		label: string | undefined;
		id: string;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type CheckboxRadioCommonProps = typeof __propDef.props;
export type CheckboxRadioCommonEvents = typeof __propDef.events;
export type CheckboxRadioCommonSlots = typeof __propDef.slots;
export default class CheckboxRadioCommon extends SvelteComponentTyped<
	CheckboxRadioCommonProps,
	CheckboxRadioCommonEvents,
	CheckboxRadioCommonSlots
> {}
export {};
