import { SvelteComponentTyped } from 'svelte';
export interface HeaderLinks {
	text: string;
	value: string;
	onClick?: () => any;
	hidden?: boolean;
}
declare const __propDef: {
	props: {
		links: HeaderLinks[];
		selectedValue: string;
		height?: string;
		gap?: string;
		fontSize?: string;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {
		default: {};
	};
};
export type HeaderProps = typeof __propDef.props;
export type HeaderEvents = typeof __propDef.events;
export type HeaderSlots = typeof __propDef.slots;
export default class Header extends SvelteComponentTyped<HeaderProps, HeaderEvents, HeaderSlots> {}
export {};
