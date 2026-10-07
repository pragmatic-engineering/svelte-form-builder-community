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
export type PropertyPanelTooltipProps = typeof __propDef.props;
export type PropertyPanelTooltipEvents = typeof __propDef.events;
export type PropertyPanelTooltipSlots = typeof __propDef.slots;
export default class PropertyPanelTooltip extends SvelteComponentTyped<
	PropertyPanelTooltipProps,
	PropertyPanelTooltipEvents,
	PropertyPanelTooltipSlots
> {}
export {};
