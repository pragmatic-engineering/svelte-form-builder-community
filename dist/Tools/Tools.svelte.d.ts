import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: Record<string, never>;
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ToolsProps = typeof __propDef.props;
export type ToolsEvents = typeof __propDef.events;
export type ToolsSlots = typeof __propDef.slots;
export default class Tools extends SvelteComponentTyped<ToolsProps, ToolsEvents, ToolsSlots> {}
export {};
