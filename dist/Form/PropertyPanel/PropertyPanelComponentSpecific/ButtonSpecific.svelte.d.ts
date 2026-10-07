import { SvelteComponentTyped } from 'svelte';
import type { Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ButtonSpecificProps = typeof __propDef.props;
export type ButtonSpecificEvents = typeof __propDef.events;
export type ButtonSpecificSlots = typeof __propDef.slots;
export default class ButtonSpecific extends SvelteComponentTyped<
	ButtonSpecificProps,
	ButtonSpecificEvents,
	ButtonSpecificSlots
> {}
export {};
