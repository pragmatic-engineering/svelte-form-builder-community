import type { HTMLAttributes } from '$lib/Utils/other-types/svelte-types';
import type { CustomDataAttribute, FormComponentsType } from '$lib/Utils/types';
import type { ComponentSelectionMetaData } from '$lib/Utils/types';
import type { HTMLAttributesKeys } from '$lib/Utils/types';
export declare function GetComponentSelectionMetaData(
	componentName: FormComponentsType
): ComponentSelectionMetaData;
export declare const defaultHTMLAttributes: Partial<
	Record<FormComponentsType, HTMLAttributes<HTMLElement>>
>;
export declare const defaultDataAttributes: Partial<
	Record<FormComponentsType, CustomDataAttribute[]>
>;
export declare const defaultDisabledHTMLAttributes: Partial<
	Record<FormComponentsType, HTMLAttributesKeys[]>
>;
export declare const defaultCategories: Partial<Record<FormComponentsType, string[]>>;
export declare const defaultKeywords: Partial<Record<FormComponentsType, string[]>>;
export declare const defaultDisableStandardHTMLValidityCheck: Partial<
	Record<FormComponentsType, boolean>
>;
export declare const defaultHasChoices: Partial<Record<FormComponentsType, boolean>>;
export declare const defaultNoTooltipProperties: Partial<Record<FormComponentsType, boolean>>;
export declare const defaultIcons: Record<FormComponentsType, string>;
