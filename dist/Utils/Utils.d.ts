import type { CustomDataAttribute, Field } from '$lib/Utils/types';
export declare function capitalizeFirstLetter(string: string): string;
export declare function convertDataAttributes(attributes: CustomDataAttribute[] | undefined): any;
export declare function scrollTo(field: Field): void;
export declare function CScope(suffix: string): string;
export declare function RemoveAlphaNumeric(value: string | undefined): string;
export declare const LibraryPrefix = 'svelte-fb';
