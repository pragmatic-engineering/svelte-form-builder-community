import type { Field } from '$lib/Utils/types';
export declare class RenderManager {
	static applyDefaultValues(): void;
	static serialize(): Promise<string>;
	static getFieldUserData(field: Field): any;
	static setFieldUserData(field: Field, value: unknown): void;
}
