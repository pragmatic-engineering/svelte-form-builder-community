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
export type BuildToolsProps = typeof __propDef.props;
export type BuildToolsEvents = typeof __propDef.events;
export type BuildToolsSlots = typeof __propDef.slots;
export default class BuildTools extends SvelteComponentTyped<
	BuildToolsProps,
	BuildToolsEvents,
	BuildToolsSlots
> {}
export {};
