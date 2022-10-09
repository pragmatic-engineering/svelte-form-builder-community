import { DefinitionManager } from '$lib/lib/DefinitionManager';
import { componentInstances } from '$lib/Utils/store';
import type { SerializeResult } from '$lib/Utils/types';
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

				const fieldInfo = DefinitionManager.getFieldInfo(id);
				if (fieldInfo) {
					if (!fieldInfo.field.htmlAttributes.disabled && fieldInfo.field.htmlAttributes.name) {
						const result: Partial<SerializeResult> = {
							name: fieldInfo.field.htmlAttributes.name,
							componentName: fieldInfo.field.componentName
						};

						//Do any validation defined inside component customUserInputSerialization function
						if (componentInstance && componentInstance.customUserInputSerialization) {
							result.value = await componentInstance.customUserInputSerialization();
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
}
