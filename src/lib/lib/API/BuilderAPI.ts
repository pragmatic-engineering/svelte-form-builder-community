import { DefinitionManager } from '$lib/lib/DefinitionManager';
import type { Field, FormTab } from '$lib/Utils/types';
import type { FieldGroup } from '$lib/Utils/types';
import { validateDefinitions } from '$lib/lib/Validation';
import { TabManager } from '$lib/Tabs/TabManager';
import { setComponentSelectionCategory } from '$lib/Utils/store';

export class BuilderAPI {
	/**
	 * Get the form definition
	 * @param space
	 * @returns JSON
	 */
	static getDefinitionData(space: number | string | undefined = 2) {
		return DefinitionManager.getData(space);
	}

	/**
	 * Return the Component Information for a field
	 * @param field
	 * @returns
	 */
	static getFieldComponent(field: Field) {
		return DefinitionManager.getFieldComponent(field);
	}

	/**
	 * Moves an existing field to a new row inside the same tab
	 * @param tabID Tab ID
	 * @param field
	 * @param newRowAtIndex Index of the new Row
	 * @returns
	 */
	static moveFieldToNewRow(tabID: string, field: Field, newRowAtIndex: number) {
		return DefinitionManager.moveFieldToNewRow(tabID, field, newRowAtIndex);
	}

	/**
	 * Moves a field to an existing row inside the same tab
	 * @param tabID Tab ID
	 * @param field
	 * @param newRowAtIndex Index of the new Row
	 * @param fieldIndex  Optionally, specify the location of where inside the row the new field should go(if multiple fields in the row)
	 * @returns
	 */
	public static moveFieldToExistingRow(
		tabID: string,
		field: Field,
		rowIndex: number,
		fieldIndex: number | undefined
	) {
		return DefinitionManager.moveFieldToExistingRow(tabID, field, rowIndex, fieldIndex);
	}

	/**
	 * Duplicate a field
	 * @param tabID
	 * @param field
	 * @returns
	 */
	static copyField(tabID: string, field: Field) {
		return DefinitionManager.copyField(tabID, field);
	}

	/**
	 * Add a field to a Tab
	 * @param tabID
	 * @param field
	 * @param rowIndex
	 * @param fieldIndex Add to a specific column of a specific row
	 * @returns
	 */
	static addFieldToTab(
		tabID: string,
		field: Field,
		rowIndex: number | undefined = undefined,
		fieldIndex: number | undefined = undefined
	) {
		return DefinitionManager.addFieldToTab(tabID, field, rowIndex, fieldIndex);
	}

	/**
	 * Add a group of fields
	 * @param tabID
	 * @param fieldGroup
	 * @returns
	 */
	static addFieldGroupToTab(tabID: string, fieldGroup: FieldGroup[]) {
		return DefinitionManager.addFieldGroupToTab(tabID, fieldGroup);
	}

	/**
	 * Delete a field
	 * @param tabID
	 * @param field
	 * @param confirmDelete
	 * @returns
	 */
	static deleteField(tabID: string, field: Field, confirmDelete = false) {
		return DefinitionManager.deleteField(tabID, field, confirmDelete);
	}

	/**
	 * Add a new Tab
	 * @returns
	 */
	static addTab() {
		return TabManager.addTab();
	}

	/**
	 * Delete a Tab
	 * @param tab
	 * @param confirmDelete
	 * @returns
	 */
	static deleteTab(tab: FormTab, confirmDelete = false) {
		return TabManager.deleteTab(tab, confirmDelete);
	}

	/**
	 *
	 * @returns The definition for the active Tab
	 */
	static getActiveTabDefinition() {
		return TabManager.getActiveTabDefinition();
	}

	/**
	 * Check the Form Definition for any validation issues
	 * @returns
	 */
	static validate() {
		return validateDefinitions();
	}

	/**
	 * Clears all the data or data for a given tab
	 * @param tab
	 * @returns
	 */
	static clearData(tab?: FormTab) {
		return DefinitionManager.clearData(tab);
	}

	static setComponentSelectionCategory(category: string) {
		if (category) {
			setComponentSelectionCategory.set(category);
		}
	}
}
