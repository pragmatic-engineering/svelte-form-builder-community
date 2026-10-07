import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type QuickMenuProps = typeof __propDef.props;
export type QuickMenuEvents = typeof __propDef.events;
export type QuickMenuSlots = typeof __propDef.slots;
export default class QuickMenu extends SvelteComponentTyped<
	QuickMenuProps,
	QuickMenuEvents,
	QuickMenuSlots
> {}
export {};
