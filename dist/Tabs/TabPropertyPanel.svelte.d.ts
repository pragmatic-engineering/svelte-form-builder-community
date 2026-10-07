import { SvelteComponentTyped } from 'svelte';
import type { FormTab } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		tab: FormTab;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type TabPropertyPanelProps = typeof __propDef.props;
export type TabPropertyPanelEvents = typeof __propDef.events;
export type TabPropertyPanelSlots = typeof __propDef.slots;
export default class TabPropertyPanel extends SvelteComponentTyped<
	TabPropertyPanelProps,
	TabPropertyPanelEvents,
	TabPropertyPanelSlots
> {}
export {};
