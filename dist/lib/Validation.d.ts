import type { ValidationError, FieldInfo } from '$lib/Utils/types';
export declare function validateDefinitions(): ValidationError[];
export declare function validateUserInputs(): ValidationError[];
export declare function validateStandardHtmlAttributes(
	fieldInfo: FieldInfo
): ValidationError | undefined;
export declare function getErrorMessage(fieldInfo: Partial<FieldInfo>, message: string): string;
export declare function getErrorMessage_Required(fieldInfo: Partial<FieldInfo>): string;
