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
export type VideoProps = typeof __propDef.props;
export type VideoEvents = typeof __propDef.events;
export type VideoSlots = typeof __propDef.slots;
export default class Video extends SvelteComponentTyped<VideoProps, VideoEvents, VideoSlots> {}
export {};
