import type { Condition, Field } from '$lib/Utils/types';
export declare class ConditionManager {
	conditions: Condition[];
	constructor();
	initFields(): Promise<void>;
	EvaluateFieldValue(e: Event | undefined, field: Field, customValue?: unknown): Promise<void>;
}
