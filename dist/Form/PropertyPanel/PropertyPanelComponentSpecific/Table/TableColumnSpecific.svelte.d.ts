import { SvelteComponentTyped } from 'svelte';
export declare const requiredColumn = '<i class="required"></i>';
export declare function cleanColumnTitle(column: ColumnDefinition): string;
import type { Field } from '$lib/Utils/types';
import type { ColumnDefinition } from 'tabulator-tables';
declare const __propDef: {
	props: {
		field: Field;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type TableColumnSpecificProps = typeof __propDef.props;
export type TableColumnSpecificEvents = typeof __propDef.events;
export type TableColumnSpecificSlots = typeof __propDef.slots;
export default class TableColumnSpecific extends SvelteComponentTyped<
	TableColumnSpecificProps,
	TableColumnSpecificEvents,
	TableColumnSpecificSlots
> {}
export {};
