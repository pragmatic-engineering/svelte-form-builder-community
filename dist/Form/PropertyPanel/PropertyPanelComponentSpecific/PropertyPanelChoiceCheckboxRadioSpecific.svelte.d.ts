import { SvelteComponentTyped } from 'svelte';
import { type Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PropertyPanelChoiceCheckboxRadioSpecificProps = typeof __propDef.props;
export type PropertyPanelChoiceCheckboxRadioSpecificEvents = typeof __propDef.events;
export type PropertyPanelChoiceCheckboxRadioSpecificSlots = typeof __propDef.slots;
export default class PropertyPanelChoiceCheckboxRadioSpecific extends SvelteComponentTyped<
	PropertyPanelChoiceCheckboxRadioSpecificProps,
	PropertyPanelChoiceCheckboxRadioSpecificEvents,
	PropertyPanelChoiceCheckboxRadioSpecificSlots
> {}
export {};
