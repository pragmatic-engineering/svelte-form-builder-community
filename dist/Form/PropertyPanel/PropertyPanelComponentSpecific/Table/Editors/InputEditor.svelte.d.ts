import { SvelteComponentTyped } from 'svelte';
import type { InputParams } from 'tabulator-tables';
declare const __propDef: {
	props: {
		editorParams: InputParams;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type InputEditorProps = typeof __propDef.props;
export type InputEditorEvents = typeof __propDef.events;
export type InputEditorSlots = typeof __propDef.slots;
export default class InputEditor extends SvelteComponentTyped<
	InputEditorProps,
	InputEditorEvents,
	InputEditorSlots
> {}
export {};
