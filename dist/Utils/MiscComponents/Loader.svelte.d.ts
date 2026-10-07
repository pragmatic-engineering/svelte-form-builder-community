/** @typedef {typeof __propDef.props}  LoaderProps */
/** @typedef {typeof __propDef.events}  LoaderEvents */
/** @typedef {typeof __propDef.slots}  LoaderSlots */
export default class Loader extends SvelteComponentTyped<
	{
		[x: string]: never;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type LoaderProps = typeof __propDef.props;
export type LoaderEvents = typeof __propDef.events;
export type LoaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: never;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export {};
