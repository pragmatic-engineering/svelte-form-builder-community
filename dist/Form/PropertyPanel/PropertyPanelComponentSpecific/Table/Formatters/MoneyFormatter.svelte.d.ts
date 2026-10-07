import { SvelteComponentTyped } from 'svelte';
import type { MoneyParams } from 'tabulator-tables';
declare const __propDef: {
	props: {
		formatterParams: MoneyParams;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type MoneyFormatterProps = typeof __propDef.props;
export type MoneyFormatterEvents = typeof __propDef.events;
export type MoneyFormatterSlots = typeof __propDef.slots;
export default class MoneyFormatter extends SvelteComponentTyped<
	MoneyFormatterProps,
	MoneyFormatterEvents,
	MoneyFormatterSlots
> {}
export {};
