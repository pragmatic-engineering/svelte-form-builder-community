import { SvelteComponentTyped } from 'svelte';
import type { StarsConfig } from '$lib/Components/Stars.svelte';
declare const __propDef: {
	props: {
		config?: StarsConfig;
	};
	events: {
		change: Event;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type StarRating2Props = typeof __propDef.props;
export type StarRating2Events = typeof __propDef.events;
export type StarRating2Slots = typeof __propDef.slots;
export default class StarRating2 extends SvelteComponentTyped<
	StarRating2Props,
	StarRating2Events,
	StarRating2Slots
> {}
export {};
