import { SvelteComponentTyped } from 'svelte';
import type { ChoiceConfiguration, Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		choiceConfiguration: ChoiceConfiguration | undefined;
		customAttribute?: any;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PropertyPanelChoicesProps = typeof __propDef.props;
export type PropertyPanelChoicesEvents = typeof __propDef.events;
export type PropertyPanelChoicesSlots = typeof __propDef.slots;
export default class PropertyPanelChoices extends SvelteComponentTyped<
	PropertyPanelChoicesProps,
	PropertyPanelChoicesEvents,
	PropertyPanelChoicesSlots
> {}
export {};
