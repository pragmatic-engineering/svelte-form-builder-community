import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
	props: {
		id: string;
		value: any;
		label: string;
		fontSize?: string;
		marginTop?: string;
		marginLeft?: string;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type CheckboxProps = typeof __propDef.props;
export type CheckboxEvents = typeof __propDef.events;
export type CheckboxSlots = typeof __propDef.slots;
export default class Checkbox extends SvelteComponentTyped<
	CheckboxProps,
	CheckboxEvents,
	CheckboxSlots
> {}
export {};
