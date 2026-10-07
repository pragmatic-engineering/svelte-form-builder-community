import { SvelteComponentTyped } from 'svelte';
import type { ListEditorParams } from 'tabulator-tables';
import type { Field } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		editorParams: ListEditorParams;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ListEditorProps = typeof __propDef.props;
export type ListEditorEvents = typeof __propDef.events;
export type ListEditorSlots = typeof __propDef.slots;
export default class ListEditor extends SvelteComponentTyped<
	ListEditorProps,
	ListEditorEvents,
	ListEditorSlots
> {}
export {};
