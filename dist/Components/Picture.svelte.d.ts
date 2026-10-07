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
export type PictureProps = typeof __propDef.props;
export type PictureEvents = typeof __propDef.events;
export type PictureSlots = typeof __propDef.slots;
export default class Picture extends SvelteComponentTyped<
	PictureProps,
	PictureEvents,
	PictureSlots
> {}
export {};
