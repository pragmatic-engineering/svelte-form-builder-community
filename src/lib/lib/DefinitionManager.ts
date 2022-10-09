import { nanoid } from 'nanoid';
import {
	componentInstances,
	importedComponents,
	mainDefinition,
	optionsProcessorStore,
	opts
} from '$lib/Utils/store';
import { get } from 'svelte/store';
import merge from 'lodash.merge';
import { TabManager } from '$lib/Tabs/TabManager';
import type { FieldInfo } from '$lib/Utils/types';
import type { Field, FormDefinition, FormTab } from '$lib/Utils/types';
import type { ComponentImport, FieldGroup, SvelteFBComponent } from '$lib/Utils/types';

export class DefinitionManager {
	static getFieldComponent(field: Field) {
		return get(importedComponents).find(
			(x) => x.componentOptions.componentName == field.componentName
		) as ComponentImport;
	}

	static getData(space: number | string | undefined = 2) {
		let result = '';

		const customFieldMap = new Map<string, Field>();

		DefinitionManager.visitAllFields((field) => {
			const instance = this.getFieldInstance(field);

			if (instance && instance.customFormDefinitionSerialization) {
				customFieldMap.set(
					field.htmlAttributes.id as string,
					instance.customFormDefinitionSerialization()
				);
			}
		});

		//If any fields had custom serialization needs then return definition using that replacing the field
		if (customFieldMap.size) {
			const definitionsJSON = JSON.stringify(get(mainDefinition));
			const tmp: FormDefinition[] = JSON.parse(definitionsJSON);

			if (tmp) {
				for (const definition of tmp) {
					definition.rows.forEach((row) => {
						row.fields.forEach((field, i) => {
							if (customFieldMap.has(field.htmlAttributes.id as string)) {
								row.fields[i] = customFieldMap.get(field.htmlAttributes.id as string) as Field;
							}
						});
					});
				}
			}

			result = JSON.stringify(tmp, undefined, space);
		} else {
			//Normal return
			result = JSON.stringify(get(mainDefinition), undefined, space);
		}

		return result;
	}

	public static processField(field: Field) {
		//If new, initialize htmlAttributes
		if (!field.htmlAttributes) {
			field.htmlAttributes = {};
		}

		//Set label as component name if this is a new field and has no label
		if (!field.htmlAttributes.id && !field.labelAttributes) {
			field.labelAttributes = { label: field.componentName };

			//Don't give paragraph a default label
			if (field.componentName == 'Paragraph') {
				field.labelAttributes.label = '';
			}
		}

		//Autogenerate id if one not provided
		field.htmlAttributes.id =
			field.htmlAttributes.id ?? DefinitionManager.GenerateFieldIdentifier(field);
		field.htmlAttributes.name = field.htmlAttributes.name ?? field.htmlAttributes.id;

		const fieldComponent = DefinitionManager.getFieldComponent(field);
		if (fieldComponent) {
			DefinitionManager.SetupAttributes(field, fieldComponent);
		}
	}

	//Reasonably unique/short name in the form of [ComponentName]-[randomID]
	private static GenerateFieldIdentifier(field: Field) {
		//Replace all non-alpha numeric
		return `${field.componentName.replace(/[\W_]+/g, '')}-${nanoid(8)}`;
	}

	private static SetupAttributes(field: Field, componentImport: ComponentImport) {
		this.SetupHtmlAttributes(field, componentImport);
		this.SetupDataAttributes(field, componentImport);
	}

	private static SetupHtmlAttributes(field: Field, componentImport: ComponentImport) {
		if (componentImport.componentOptions.htmlAttributes) {
			if (!field.htmlAttributes) {
				//If the fields' component defines a set of attributes, copy them all to the field the first time
				field.htmlAttributes = merge({}, componentImport.componentOptions.htmlAttributes);
				//field.htmlAttributes = Object.assign({}, componentImport.componentOptions.htmlAttributes);
			} else {
				field.htmlAttributes = merge(
					{},
					componentImport.componentOptions.htmlAttributes,
					field.htmlAttributes
				);
				//field.htmlAttributes = Object.assign({}, componentImport.componentOptions.htmlAttributes, field.htmlAttributes);
			}
		}
	}

	private static SetupDataAttributes(field: Field, componentImport: ComponentImport) {
		if (!Array.isArray(field.dataAttributes)) {
			field.dataAttributes = [];
		}

		if (componentImport.componentOptions.dataAttributes) {
			if (!field.dataAttributes) {
				//If the fields' component defines a set of attributes, copy them all to the field the first time
				field.dataAttributes = Array.from(componentImport.componentOptions.dataAttributes);
			} else {
				componentImport.componentOptions.dataAttributes.forEach((componentDefinitionAttribute) => {
					//If there exists a new attribute on the component level that doesn't exist on the field level, add it
					const fieldAttribute = field.dataAttributes?.some(
						(x) => x.name == componentDefinitionAttribute.name
					);
					if (!fieldAttribute) {
						field.dataAttributes?.push({ ...componentDefinitionAttribute });
					}
				});
			}
		}
	}

	public static moveFieldToNewRow(tabID: string, field: Field, newRowAtIndex: number) {
		this.deleteField(tabID, field);

		const definitions = get(mainDefinition);
		for (const definition of definitions) {
			if (definition.tab?.id == tabID) {
				definition.rows.splice(newRowAtIndex, 0, {
					rowID: definition.rows.length + 1,
					fields: [field]
				});
			}
		}

		mainDefinition.update(() => definitions);
	}

	public static moveFieldToExistingRow(
		tabID: string,
		field: Field,
		rowIndex: number,
		fieldIndex: number | undefined
	) {
		const copiedField: Field = JSON.parse(JSON.stringify(field));
		const rowDeletedIndex = this.deleteField(tabID, field);

		//If the delete resulted in the whole row being deleted, and the source row was greater than the target row, reduce the incoming index by 1
		if (rowDeletedIndex != undefined && rowIndex > rowDeletedIndex) {
			rowIndex--;
			if (rowIndex < 0) {
				rowIndex = 0;
			}
		}

		const definitions = get(mainDefinition);

		for (const definition of definitions) {
			if (definition.tab?.id == tabID) {
				const targetRows = definition.rows[rowIndex];
				if (targetRows.fields) {
					if (fieldIndex != undefined) {
						targetRows.fields.splice(fieldIndex, 0, copiedField);
					} else {
						targetRows.fields.push(field);
					}
				}
			}
		}

		mainDefinition.update(() => definitions);
	}

	static copyField(tabID: string, field: Field) {
		const copiedField: Field = merge({} as Field, field);
		copiedField.htmlAttributes.id = undefined;
		copiedField.htmlAttributes.name = undefined;

		DefinitionManager.addFieldToTab(tabID, copiedField);
	}

	public static async addFieldToTab(
		tabID: string,
		field: Field,
		rowIndex: number | undefined = undefined,
		fieldIndex: number | undefined = undefined
	) {
		//Dynamically Import the Component if necessary
		await get(optionsProcessorStore).ImportComponent(field.componentName);

		const definitions = get(mainDefinition);

		if (definitions) {
			for (const definition of definitions) {
				if (definition.tab?.id == tabID) {
					this.processField(field);

					if (rowIndex != undefined) {
						if (fieldIndex != undefined) {
							//Add to a specific column of a specific row
							const targetRows = definition.rows[rowIndex];
							targetRows.fields.splice(fieldIndex, 0, field);
						} else {
							//Add to new row specified at index
							definition.rows.splice(rowIndex, 0, {
								rowID: definition.rows.length + 1,
								fields: [field]
							});
						}
					} else {
						//Add to bottom
						definition.rows.push({ rowID: definition.rows.length, fields: [field] });
					}
				}
			}
		}

		mainDefinition.update(() => definitions);

		if (get(opts).builderAPIEvents?.onComponentAdded) {
			get(opts).builderAPIEvents?.onComponentAdded?.call(this, field);
		}

		return field;
	}

	public static async addFieldGroupToTab(tabID: string, fieldGroup: FieldGroup[]) {
		if (fieldGroup) {
			for (const group of fieldGroup) {
				let firstFieldInfo: FieldInfo | undefined;

				for (const [i, field] of group.fields.entries()) {
					const fieldToAdd = merge({}, field);
					if (i == 0) {
						const addedField = await this.addFieldToTab(tabID, fieldToAdd);
						firstFieldInfo = this.getFieldInfo(addedField.htmlAttributes.id as string);
					} else {
						await this.addFieldToTab(tabID, fieldToAdd, firstFieldInfo?.row, i);
					}
				}
			}
		}
	}

	public static deleteField(tabID: string, field: Field, confirmDelete = false) {
		if (confirmDelete) {
			if (!confirm('Are you sure you want to delete this field?')) {
				return;
			}
		}

		const definitions = get(mainDefinition);
		let rowDeletedIndex;

		let removeRowIndex: number | undefined;
		let removeDefinitionIndex: number | undefined;

		for (const [index, definition] of definitions.entries()) {
			if (definition.tab?.id == tabID) {
				definition.rows.forEach((row, rowIndex) => {
					//Find which row has the field
					if (row.fields.filter((x) => x.htmlAttributes.id == field.htmlAttributes.id)) {
						row.fields = row.fields.filter((x) => x.htmlAttributes.id != field.htmlAttributes.id);

						//If no fields left, mark the entire row for removal
						if (row.fields.length == 0) {
							removeRowIndex = rowIndex;
							removeDefinitionIndex = index;
						}
					}
				});
			}
		}

		//Remove empty row if flagged
		if (removeRowIndex != undefined) {
			DefinitionManager.removeRow(removeDefinitionIndex, removeRowIndex, definitions);
			rowDeletedIndex = removeRowIndex;
		}

		mainDefinition.update(() => definitions);

		if (get(opts).builderAPIEvents?.onComponentDeleted) {
			get(opts).builderAPIEvents?.onComponentDeleted?.call(this, field);
		}

		return rowDeletedIndex;
	}

	private static removeRow(
		definitionIndex: number | undefined,
		rowIndex: number | undefined,
		definitions: FormDefinition[]
	) {
		if (definitionIndex != undefined && rowIndex != undefined) {
			definitions[definitionIndex].rows.splice(rowIndex, 1);

			if (get(opts).builderAPIEvents?.onRowDeleted) {
				get(opts).builderAPIEvents?.onRowDeleted?.call(this, rowIndex);
			}
		}
	}

	public getFieldsForRow(rowID: number, definition: FormDefinition) {
		return definition.rows.find((x) => x.rowID == rowID)?.fields;
	}

	public static getFieldInfo(id: string): FieldInfo | undefined {
		const definitions = get(mainDefinition);
		const result = {} as FieldInfo;

		for (const [_index, definition] of definitions.entries()) {
			if (result.field) {
				break;
			}

			definition.rows.forEach((row, rowIndex) => {
				if (result.field) {
					return;
				}

				row.fields.forEach((field, fieldIndex) => {
					if (field.htmlAttributes.id == id) {
						result.field = field;
						result.row = rowIndex;
						result.fieldIndex = fieldIndex;
						result.tab = definition.tab as FormTab;
						result.componentImport = this.getFieldComponent(result.field);
						return;
					}
				});
			});
		}

		return result;
	}

	//Clear all the data or for a single tab
	public static clearData(tab?: FormTab) {
		const definitions = get(mainDefinition);
		if (tab) {
			const tabDefinition = definitions.filter((x) => x.tab == tab)[0];
			if (tabDefinition) {
				tabDefinition.rows = [];
			}

			mainDefinition.update(() => definitions);
		} else {
			mainDefinition.set([]);
			TabManager.addTab();
		}
	}

	public static visitAllFields(callback: (field: Field) => void) {
		const definitions = get(mainDefinition);
		if (definitions) {
			for (const definition of definitions) {
				definition.rows.forEach((row) => {
					row.fields.forEach((field) => {
						callback(field);
					});
				});
			}
		}
	}

	public static visitAllFieldInstances(
		callback: (fieldInfo: FieldInfo, instance: SvelteFBComponent) => void
	) {
		const instances = get(componentInstances);
		if (instances) {
			for (const id in instances) {
				const componentInstance = instances[id];
				if (!componentInstance) {
					continue;
				}

				const fieldInfo = DefinitionManager.getFieldInfo(id);
				if (fieldInfo) {
					callback(fieldInfo, componentInstance);
				}
			}
		}
	}

	public static getFieldInstance(field: Field): SvelteFBComponent {
		const instances = get(componentInstances);
		return instances[field.htmlAttributes.id as string];
	}
}
