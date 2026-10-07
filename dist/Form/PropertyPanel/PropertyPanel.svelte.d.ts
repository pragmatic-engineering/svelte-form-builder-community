import { SvelteComponentTyped } from 'svelte';
export declare function addAndSelectExternalTab(tab: string): void;
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type PropertyPanelProps = typeof __propDef.props;
export type PropertyPanelEvents = typeof __propDef.events;
export type PropertyPanelSlots = typeof __propDef.slots;
export default class PropertyPanel extends SvelteComponentTyped<
	PropertyPanelProps,
	PropertyPanelEvents,
	PropertyPanelSlots
> {}
export {};
