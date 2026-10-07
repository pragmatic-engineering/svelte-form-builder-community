import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		contentData: string;
		customContentData: any;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type RenderToolsProps = typeof __propDef.props;
export type RenderToolsEvents = typeof __propDef.events;
export type RenderToolsSlots = typeof __propDef.slots;
export default class RenderTools extends SvelteComponentTyped<
	RenderToolsProps,
	RenderToolsEvents,
	RenderToolsSlots
> {}
export {};
