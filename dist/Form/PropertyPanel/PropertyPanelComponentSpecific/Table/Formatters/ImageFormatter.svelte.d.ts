import { SvelteComponentTyped } from 'svelte';
import type { ImageParams } from 'tabulator-tables';
declare const __propDef: {
	props: {
		formatterParams: ImageParams;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ImageFormatterProps = typeof __propDef.props;
export type ImageFormatterEvents = typeof __propDef.events;
export type ImageFormatterSlots = typeof __propDef.slots;
export default class ImageFormatter extends SvelteComponentTyped<
	ImageFormatterProps,
	ImageFormatterEvents,
	ImageFormatterSlots
> {}
export {};
