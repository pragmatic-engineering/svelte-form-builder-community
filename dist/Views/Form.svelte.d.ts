import { SvelteComponentTyped } from 'svelte';
import type { FormDefinition } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		definition: FormDefinition;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type FormProps = typeof __propDef.props;
export type FormEvents = typeof __propDef.events;
export type FormSlots = typeof __propDef.slots;
export default class Form extends SvelteComponentTyped<FormProps, FormEvents, FormSlots> {}
export {};
