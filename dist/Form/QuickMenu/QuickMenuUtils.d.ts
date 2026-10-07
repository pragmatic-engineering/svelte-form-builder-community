import type { Field, FormDefinition } from '$lib/Utils/types';
export declare class QuickMenuUtils {
	definition: FormDefinition;
	constructor(definition: FormDefinition);
	static editField(field: Field): void;
	static pointerOver(e: PointerEvent, field: Field): void;
	static pointerLeave(e: PointerEvent, field: Field): void;
}
