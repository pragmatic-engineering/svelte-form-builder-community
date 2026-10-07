/** @typedef {typeof __propDef.props}  SelectSlotProps */
/** @typedef {typeof __propDef.events}  SelectSlotEvents */
/** @typedef {typeof __propDef.slots}  SelectSlotSlots */
export default class SelectSlot extends SvelteComponentTyped<
	{
		[x: string]: never;
	},
	{
		[evt: string]: CustomEvent<any>;
	},
	{
		default: {};
	}
> {}
export type SelectSlotProps = typeof __propDef.props;
export type SelectSlotEvents = typeof __propDef.events;
export type SelectSlotSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		[x: string]: never;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export {};
