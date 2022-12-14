import { DefinitionManager } from '$lib/lib/DefinitionManager';
import { componentInstances } from '$lib/Utils/store';
import type { Field, SerializeResult } from '$lib/Utils/types';
import { get } from 'svelte/store';

export class RenderManager {
	static applyDefaultValues() {
		DefinitionManager.visitAllFields((field) => {
			field.htmlAttributes.value = field.defaultValue;
		});
	}

	static async serialize() {
		const formData: SerializeResult[] = [];

		const instances = get(componentInstances);
		if (instances) {
			for (const id in instances) {
				const componentInstance = instances[id];
				if (!componentInstance) {
					continue;
				}

				const fieldInfo = DefinitionManager.getFieldInfo({ id: id });
				if (fieldInfo) {
					if (!fieldInfo.field.htmlAttributes.disabled && fieldInfo.field.htmlAttributes.name) {
						const result: Partial<SerializeResult> = {
							name: fieldInfo.field.htmlAttributes.name,
							componentName: fieldInfo.field.componentName
						};

						//Do any validation defined inside component customGetUserData function
						if (componentInstance && componentInstance.customGetUserData) {
							result.value = await componentInstance.customGetUserData();
						} else {
							result.value = fieldInfo.field.htmlAttributes.value;
						}

						formData.push(result as SerializeResult);
					}
				}
			}
		}

		return JSON.stringify(formData);
	}

	public static getFieldUserData(field: Field) {
		const component = DefinitionManager.getFieldInstance(field);
		let value = field.htmlAttributes.value;

		//If component has a customGetUserData, then use that instead
		if (component.customGetUserData) {
			value = component.customGetUserData();
		}

		return value;
	}

	public static setFieldUserData(field: Field, value: unknown) {
		const component = DefinitionManager.getFieldInstance(field);

		//If component has a custom way to set its data, use that, otherwise use default htmlAttribute.value
		if (component.customSetUserData) {
			component.customSetUserData(value);
		} else {
			field.htmlAttributes.value = value;
			component.$set({ field: field });
		}
	}
}
