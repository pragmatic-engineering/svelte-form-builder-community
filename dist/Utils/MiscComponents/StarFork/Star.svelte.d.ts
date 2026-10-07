import { SvelteComponentTyped } from 'svelte';
import type { StarConfig } from '$lib/Components/Stars.svelte';
declare const __propDef: {
	props: {
		id: string;
		readOnly: boolean;
		fillPercentage: any;
		starConfig: StarConfig;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type StarProps = typeof __propDef.props;
export type StarEvents = typeof __propDef.events;
export type StarSlots = typeof __propDef.slots;
export default class Star extends SvelteComponentTyped<StarProps, StarEvents, StarSlots> {}
export {};
