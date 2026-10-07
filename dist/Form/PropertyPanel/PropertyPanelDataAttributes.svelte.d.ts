import { SvelteComponentTyped } from 'svelte';
import type { CustomDataAttribute } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		dataAttribute: CustomDataAttribute;
		guid: string;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PropertyPanelDataAttributesProps = typeof __propDef.props;
export type PropertyPanelDataAttributesEvents = typeof __propDef.events;
export type PropertyPanelDataAttributesSlots = typeof __propDef.slots;
export default class PropertyPanelDataAttributes extends SvelteComponentTyped<
	PropertyPanelDataAttributesProps,
	PropertyPanelDataAttributesEvents,
	PropertyPanelDataAttributesSlots
> {}
export {};
