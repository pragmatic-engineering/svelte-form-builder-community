import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type StyledSidePanelProps = typeof __propDef.props;
export type StyledSidePanelEvents = typeof __propDef.events;
export type StyledSidePanelSlots = typeof __propDef.slots;
export default class StyledSidePanel extends SvelteComponentTyped<
	StyledSidePanelProps,
	StyledSidePanelEvents,
	StyledSidePanelSlots
> {}
export {};
