import { SvelteComponentTyped } from 'svelte';
import { type IconType } from '$lib/Utils/MiscComponents/Icon.svelte';
declare const __propDef: {
	props: {
		title?: string;
		icon?: IconType;
		menuOpen?: boolean;
		showRight?: string;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type DropdownMenuProps = typeof __propDef.props;
export type DropdownMenuEvents = typeof __propDef.events;
export type DropdownMenuSlots = typeof __propDef.slots;
export default class DropdownMenu extends SvelteComponentTyped<
	DropdownMenuProps,
	DropdownMenuEvents,
	DropdownMenuSlots
> {}
export {};
