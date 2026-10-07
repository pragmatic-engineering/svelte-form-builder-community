import { nanoid } from 'nanoid';
import {
	componentInstances,
	conditionManager,
	importedComponents,
	mainDefinition,
	optionsProcessorStore,
	opts
} from '$lib/Utils/store';
import { get } from 'svelte/store';
import merge from 'lodash.merge';
import { TabManager } from '$lib/Tabs/TabManager';
export class DefinitionManager {
	static getFieldComponent(field) {
		return get(importedComponents).find(
			(x) => x.componentOptions.componentName == field.componentName
		);
	}
	static getData(space = 2) {
		const result = {};
		const customFieldMap = new Map();
		DefinitionManager.visitAllFields((field) => {
			const instance = this.getFieldInstance(field);
			if (instance && instance.customFormDefinitionSerialization) {
				customFieldMap.set(field.htmlAttributes.id, instance.customFormDefinitionSerialization());
			}
		});
		//If any fields had custom serialization needs then return definition using that replacing the field
		if (customFieldMap.size) {
			const definitionsJSON = JSON.stringify(get(mainDefinition));
			const tmp = JSON.parse(definitionsJSON);
			if (tmp) {
				for (const definition of tmp) {
					definition.rows.forEach((row) => {
						row.fields.forEach((field, i) => {
							if (customFieldMap.has(field.htmlAttributes.id)) {
								row.fields[i] = customFieldMap.get(field.htmlAttributes.id);
							}
						});
					});
				}
			}
			result.formDefinition = tmp;
		} else {
			//Normal return
			result.formDefinition = get(mainDefinition);
		}
		//Wipe out the field property before returning conditions
		const tmpConditons = get(conditionManager).conditions;
		for (const condition of tmpConditons) {
			for (const term of condition.terms) {
				for (const key in term) {
					if (Object.prototype.hasOwnProperty.call(term, key)) {
						if (key == 'field') {
							delete term[key];
						}
					}
				}
			}
		}
		result.conditions = tmpConditons;
		return JSON.stringify(result, undefined, space);
	}
	static processField(field) {
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
	static GenerateFieldIdentifier(field) {
		//Replace all non-alpha numeric
		return `${field.componentName.replace(/[\W_]+/g, '')}-${nanoid(8)}`;
	}
	static SetupAttributes(field, componentImport) {
		this.SetupHtmlAttributes(field, componentImport);
		this.SetupDataAttributes(field, componentImport);
	}
	static SetupHtmlAttributes(field, componentImport) {
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
	static SetupDataAttributes(field, componentImport) {
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
	static moveFieldToNewRow(tabID, field, newRowAtIndex) {
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
	static moveFieldToExistingRow(tabID, field, rowIndex, fieldIndex) {
		const copiedField = JSON.parse(JSON.stringify(field));
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
	static copyField(tabID, field) {
		const copiedField = merge({}, field);
		copiedField.htmlAttributes.id = undefined;
		copiedField.htmlAttributes.name = undefined;
		return DefinitionManager.addFieldToTab(tabID, copiedField);
	}
	static async addFieldToTab(tabID, field, rowIndex = undefined, fieldIndex = undefined) {
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
	static async addFieldGroupToTab(tabID, fieldGroup) {
		const fields = [];
		if (fieldGroup) {
			for (const group of fieldGroup) {
				let firstFieldInfo;
				for (const [i, field] of group.fields.entries()) {
					const fieldToAdd = merge({}, field);
					if (i == 0) {
						//First field from the group will give back tab/row data for the subsequent fields
						const addedField = await this.addFieldToTab(tabID, fieldToAdd);
						firstFieldInfo = this.getFieldInfo({ id: addedField.htmlAttributes.id });
						fields.push(addedField);
					} else {
						const addedField = await this.addFieldToTab(tabID, fieldToAdd, firstFieldInfo?.row, i);
						fields.push(addedField);
					}
				}
			}
		}
		return fields;
	}
	static deleteField(tabID, field, confirmDelete = false) {
		if (confirmDelete) {
			if (!confirm('Are you sure you want to delete this field?')) {
				return;
			}
		}
		const definitions = get(mainDefinition);
		let rowDeletedIndex;
		let removeRowIndex;
		let removeDefinitionIndex;
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
	static removeRow(definitionIndex, rowIndex, definitions) {
		if (definitionIndex != undefined && rowIndex != undefined) {
			definitions[definitionIndex].rows.splice(rowIndex, 1);
			if (get(opts).builderAPIEvents?.onRowDeleted) {
				get(opts).builderAPIEvents?.onRowDeleted?.call(this, rowIndex);
			}
		}
	}
	getFieldsForRow(rowID, definition) {
		return definition.rows.find((x) => x.rowID == rowID)?.fields;
	}
	static getFieldInfo(queryHtmlAttributes) {
		const definitions = get(mainDefinition);
		const result = {};
		for (const [_index, definition] of definitions.entries()) {
			if (result.field) {
				break;
			}
			definition.rows.forEach((row, rowIndex) => {
				if (result.field) {
					return;
				}
				row.fields.forEach((field, fieldIndex) => {
					if (queryHtmlAttributes.id || queryHtmlAttributes.name) {
						if (
							field.htmlAttributes.id == queryHtmlAttributes.id ||
							field.htmlAttributes.name == queryHtmlAttributes.name
						) {
							result.field = field;
							result.row = rowIndex;
							result.fieldIndex = fieldIndex;
							result.tab = definition.tab;
							result.componentImport = this.getFieldComponent(result.field);
							return;
						}
					}
				});
			});
		}
		return result;
	}
	//Clear all the data or for a single tab
	static clearData(tab) {
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
	static visitAllFields(callback) {
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
	static visitAllFieldInstances(callback) {
		const instances = get(componentInstances);
		if (instances) {
			for (const id in instances) {
				const componentInstance = instances[id];
				if (!componentInstance) {
					continue;
				}
				const fieldInfo = DefinitionManager.getFieldInfo({ id: id });
				if (fieldInfo) {
					callback(fieldInfo, componentInstance);
				}
			}
		}
	}
	static getFieldInstance(field) {
		const instances = get(componentInstances);
		return instances[field.htmlAttributes.id];
	}
	static getDefinitionByField(field) {
		const definitions = get(mainDefinition);
		for (const definition of definitions) {
			for (const rows of definition.rows) {
				if (rows.fields.includes(field)) {
					return definition;
				}
			}
		}
	}
}
