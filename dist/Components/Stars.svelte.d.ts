import { SvelteComponentTyped } from 'svelte';
export interface StarsConfig {
	readOnly?: boolean | undefined | null;
	countStars: number;
	range: {
		min?: number;
		max?: number;
		step?: number;
	};
	score: number;
	showScore?: boolean;
	starConfig: StarConfig;
}
export interface StarConfig {
	size?: number;
	fillColor?: string;
	strokeColor?: string;
}
import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
declare const __propDef: {
	props: {
		field: Field;
		componentOptions: ComponentOptions;
		tab: FormTab;
		customGetUserData?: () => number;
		validateUserInput?: () => ValidationResult;
		triggerConditionChange?: () => void;
		customClear?: () => void;
	};
	events: {
		pointerleave: PointerEvent;
		pointerenter: PointerEvent;
	} & {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type StarsProps = typeof __propDef.props;
export type StarsEvents = typeof __propDef.events;
export type StarsSlots = typeof __propDef.slots;
export default class Stars extends SvelteComponentTyped<StarsProps, StarsEvents, StarsSlots> {
	get customGetUserData(): () => number;
	get validateUserInput(): () => ValidationResult;
	get triggerConditionChange(): () => void;
	get customClear(): () => void;
}
export {};
