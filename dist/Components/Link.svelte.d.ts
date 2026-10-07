import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
	};
	events: {
		pointerleave: PointerEvent;
		pointerenter: PointerEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type LinkProps = typeof __propDef.props;
export type LinkEvents = typeof __propDef.events;
export type LinkSlots = typeof __propDef.slots;
export default class Link extends SvelteComponentTyped<LinkProps, LinkEvents, LinkSlots> {}
export {};
