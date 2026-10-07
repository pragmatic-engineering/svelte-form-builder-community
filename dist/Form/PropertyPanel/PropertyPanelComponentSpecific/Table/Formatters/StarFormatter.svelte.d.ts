import { SvelteComponentTyped } from 'svelte';
import type { StarRatingParams } from 'tabulator-tables';
declare const __propDef: {
	props: {
		formatterParams: StarRatingParams;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type StarFormatterProps = typeof __propDef.props;
export type StarFormatterEvents = typeof __propDef.events;
export type StarFormatterSlots = typeof __propDef.slots;
export default class StarFormatter extends SvelteComponentTyped<
	StarFormatterProps,
	StarFormatterEvents,
	StarFormatterSlots
> {}
export {};
