import { get } from 'svelte/store';

import type { ValidationError, ValidationResult, FieldInfo } from '$lib/Utils/types';
import { DefinitionManager } from '$lib/lib/DefinitionManager';
import { componentInstances } from '$lib/Utils/store';

export function validateDefinitions() {
	const results: ValidationError[] = [];

	DefinitionManager.visitAllFieldInstances((fieldInfo, componentInstance) => {
		//Do any validation defined in options
		if (fieldInfo?.componentImport?.componentOptions.validateDefinition) {
			const validationResult = fieldInfo?.componentImport?.componentOptions.validateDefinition.call(
				undefined,
				fieldInfo
			);
			appendResults(validationResult, results);
		}

		//Do any validation defined inside component validateDefinition function
		if (componentInstance && componentInstance.validateDefinition) {
			const validationResult = componentInstance.validateDefinition();
			appendResults(validationResult, results);
		}
	});

	return results;
}

export function validateUserInputs() {
	const results: ValidationError[] = [];
	const instances = get(componentInstances);

	for (const id in instances) {
		const componentInstance = instances[id];
		if (!componentInstance) {
			continue;
		}

		const fieldInfo = DefinitionManager.getFieldInfo({ id: id });

		//Do standard HTML validity check
		if (
			fieldInfo &&
			!fieldInfo?.componentImport.componentOptions.disableStandardHTMLValidityCheck
		) {
			const validationResult = validateStandardHtmlAttributes(fieldInfo);
			appendResults(validationResult, results);
		}

		//Do any validation defined in options
		if (fieldInfo?.componentImport?.componentOptions.validateUserInput) {
			const validationResult = fieldInfo?.componentImport?.componentOptions.validateUserInput.call(
				undefined,
				fieldInfo
			);
			appendResults(validationResult, results);
		}

		//Do any validation defined inside component validateUserInput function
		if (componentInstance && componentInstance.validateUserInput) {
			const validationResult = componentInstance.validateUserInput();
			appendResults(validationResult, results);
		}
	}

	return results;
}

function appendResults(validationResult: ValidationResult, results: ValidationError[]) {
	if (validationResult) {
		if (Array.isArray(validationResult) && validationResult.length) {
			results.push(...validationResult);
		} else {
			results.push(validationResult as ValidationError);
		}
	}
}

export function validateStandardHtmlAttributes(fieldInfo: FieldInfo): ValidationError | undefined {
	const result: ValidationError = { field: fieldInfo.field, tab: fieldInfo.tab, errors: [] };

	if (fieldInfo.field.htmlAttributes.id) {
		const el = document.getElementById(fieldInfo.field.htmlAttributes.id);
		if (!el) {
			//If element doesn't exist it may be because it is hidden/disabled due to some condition
			return;
		}

		result.validity = (el as HTMLInputElement).validity;

		if (result.validity.valueMissing) {
			result.errors.push(getErrorMessage_Required(fieldInfo));
		}

		if (result.validity.badInput) {
			result.errors.push(getErrorMessage(fieldInfo, 'has bad input'));
		}

		if (result.validity.patternMismatch) {
			result.errors.push(getErrorMessage(fieldInfo, 'does not match the requested pattern'));
		}

		if (result.validity.rangeOverflow) {
			result.errors.push(getErrorMessage(fieldInfo, 'is over the max'));
		}

		if (result.validity.rangeUnderflow) {
			result.errors.push(getErrorMessage(fieldInfo, 'is below the min'));
		}

		if (result.validity.stepMismatch) {
			result.errors.push(getErrorMessage(fieldInfo, 'has step mismatch'));
		}

		if (result.validity.tooLong) {
			result.errors.push(getErrorMessage(fieldInfo, 'is too long'));
		}

		if (result.validity.tooShort) {
			result.errors.push(getErrorMessage(fieldInfo, 'is too short'));
		}

		if (result.validity.typeMismatch) {
			result.errors.push(getErrorMessage(fieldInfo, 'input not match the expected type'));
		}
	}

	if (result.errors.length == 0) {
		return;
	}

	return result;
}

function getIdentifier(fieldInfo: Partial<FieldInfo>) {
	if (fieldInfo.field) {
		return fieldInfo.field.labelAttributes?.label ?? fieldInfo.field.componentName;
	}
}

export function getErrorMessage(fieldInfo: Partial<FieldInfo>, message: string) {
	return `${getIdentifier(fieldInfo)} ${message}`;
}

export function getErrorMessage_Required(fieldInfo: Partial<FieldInfo>) {
	return `${getIdentifier(fieldInfo)} is required`;
}
