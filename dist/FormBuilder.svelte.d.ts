import { SvelteComponentTyped } from 'svelte';
import type { BuilderOptions } from '$lib/Utils/types';
import { BuilderAPI } from '$lib/lib/API/BuilderAPI';
import 'balloon-css/balloon.min.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import { RenderAPI } from '$lib/lib/API/RenderAPI';
declare const __propDef: {
	props: {
		options: Partial<BuilderOptions>;
		builderAPI?: typeof BuilderAPI;
		renderAPI?: typeof RenderAPI;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type FormBuilderProps = typeof __propDef.props;
export type FormBuilderEvents = typeof __propDef.events;
export type FormBuilderSlots = typeof __propDef.slots;
export default class FormBuilder extends SvelteComponentTyped<
	FormBuilderProps,
	FormBuilderEvents,
	FormBuilderSlots
> {
	get builderAPI(): typeof BuilderAPI;
	get renderAPI(): typeof RenderAPI;
}
export {};
