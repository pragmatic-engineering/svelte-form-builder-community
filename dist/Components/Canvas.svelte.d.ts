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
export type CanvasProps = typeof __propDef.props;
export type CanvasEvents = typeof __propDef.events;
export type CanvasSlots = typeof __propDef.slots;
export default class Canvas extends SvelteComponentTyped<CanvasProps, CanvasEvents, CanvasSlots> {}
export {};
