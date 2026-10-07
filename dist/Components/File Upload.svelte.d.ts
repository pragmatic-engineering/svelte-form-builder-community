import { SvelteComponentTyped } from 'svelte';
import type { Field, FormTab, ComponentOptions, FileUploadSerialization } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
		customGetUserData?: () => Promise<FileUploadSerialization[]>;
		customClear?: () => void;
	};
	events: {
		pointerleave: PointerEvent;
		pointerenter: PointerEvent;
		invalid: Event;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type FileUploadProps = typeof __propDef.props;
export type FileUploadEvents = typeof __propDef.events;
export type FileUploadSlots = typeof __propDef.slots;
export default class FileUpload extends SvelteComponentTyped<
	FileUploadProps,
	FileUploadEvents,
	FileUploadSlots
> {
	get customGetUserData(): () => Promise<FileUploadSerialization[]>;
	get customClear(): () => void;
}
export {};
