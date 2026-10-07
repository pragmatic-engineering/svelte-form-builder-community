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
export type ParagraphProps = typeof __propDef.props;
export type ParagraphEvents = typeof __propDef.events;
export type ParagraphSlots = typeof __propDef.slots;
export default class Paragraph extends SvelteComponentTyped<
	ParagraphProps,
	ParagraphEvents,
	ParagraphSlots
> {}
export {};
