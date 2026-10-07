/** @typedef {typeof __propDef.props}  ConditionsProps */
/** @typedef {typeof __propDef.events}  ConditionsEvents */
/** @typedef {typeof __propDef.slots}  ConditionsSlots */
export default class Conditions extends SvelteComponentTyped<
	{
		[x: string]: never;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{}
> {}
export type ConditionsProps = typeof __propDef.props;
export type ConditionsEvents = typeof __propDef.events;
export type ConditionsSlots = typeof __propDef.slots;
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
