/** @typedef {typeof __propDef.props}  TextSlotProps */
/** @typedef {typeof __propDef.events}  TextSlotEvents */
/** @typedef {typeof __propDef.slots}  TextSlotSlots */
export default class TextSlot extends SvelteComponentTyped<
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
export type TextSlotProps = typeof __propDef.props;
export type TextSlotEvents = typeof __propDef.events;
export type TextSlotSlots = typeof __propDef.slots;
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
