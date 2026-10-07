import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		guid: string;
		name: string;
		label?: string;
		value: any;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PropertyPanelHtmlAttributesProps = typeof __propDef.props;
export type PropertyPanelHtmlAttributesEvents = typeof __propDef.events;
export type PropertyPanelHtmlAttributesSlots = typeof __propDef.slots;
export default class PropertyPanelHtmlAttributes extends SvelteComponentTyped<
	PropertyPanelHtmlAttributesProps,
	PropertyPanelHtmlAttributesEvents,
	PropertyPanelHtmlAttributesSlots
> {}
export {};
