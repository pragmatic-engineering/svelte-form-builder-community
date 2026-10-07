import { SvelteComponentTyped } from 'svelte';
import type { Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		guid: string;
		field: Field;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PropertyPanelLabelProps = typeof __propDef.props;
export type PropertyPanelLabelEvents = typeof __propDef.events;
export type PropertyPanelLabelSlots = typeof __propDef.slots;
export default class PropertyPanelLabel extends SvelteComponentTyped<
	PropertyPanelLabelProps,
	PropertyPanelLabelEvents,
	PropertyPanelLabelSlots
> {}
export {};
