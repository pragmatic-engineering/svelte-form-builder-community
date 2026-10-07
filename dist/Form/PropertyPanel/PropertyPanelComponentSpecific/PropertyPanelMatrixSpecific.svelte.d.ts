import { SvelteComponentTyped } from 'svelte';
import type { Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PropertyPanelMatrixSpecificProps = typeof __propDef.props;
export type PropertyPanelMatrixSpecificEvents = typeof __propDef.events;
export type PropertyPanelMatrixSpecificSlots = typeof __propDef.slots;
export default class PropertyPanelMatrixSpecific extends SvelteComponentTyped<
	PropertyPanelMatrixSpecificProps,
	PropertyPanelMatrixSpecificEvents,
	PropertyPanelMatrixSpecificSlots
> {}
export {};
