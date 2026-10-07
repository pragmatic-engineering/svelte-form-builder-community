import { SvelteComponentTyped } from 'svelte';
export type IconType =
	| 'VerticalGrip'
	| 'Delete'
	| 'Settings'
	| 'Copy'
	| 'Search'
	| 'Popout'
	| 'Popin'
	| 'VerticalMenu'
	| 'AllWayMove'
	| 'HorizontalMove'
	| 'SquarePlus'
	| 'Close'
	| 'Tools'
	| 'Empty'
	| 'CirclePlus'
	| 'InfoCircle'
	| 'SquareCheck'
	| 'Download'
	| 'Upload'
	| 'Minimize'
	| 'Maximize'
	| 'ArrowRight'
	| 'ArrowLeft'
	| 'Eye'
	| 'Random';
declare const __propDef: {
	props: {
		type: IconType;
		viewBox?: string;
		size?: string;
		alternateSize?: string;
		title?: string;
		fill?: string;
		alternateFill?: string;
		marginLeft?: string;
		marginRight?: string;
		marginTop?: string;
		marginBottom?: string;
		enableAlternate?: boolean;
	};
	events: {
		click: PointerEvent;
		pointerover: PointerEvent;
		pointerleave: PointerEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type IconProps = typeof __propDef.props;
export type IconEvents = typeof __propDef.events;
export type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponentTyped<IconProps, IconEvents, IconSlots> {}
export {};
