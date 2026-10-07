import { DefinitionManager } from '$lib/lib/DefinitionManager';
import { validateDefinitions } from '$lib/lib/Validation';
import { TabManager } from '$lib/Tabs/TabManager';
import { setComponentSelectionCategory } from '$lib/Utils/store';
export class BuilderAPI {
	/**
	 * Get the form definition
	 * @param space
	 * @returns JSON
	 */
	static getDefinitionData(space = 2) {
		return DefinitionManager.getData(space);
	}
	/**
	 * Return the Component Information for a field
	 * @param field
	 * @returns
	 */
	static getFieldComponent(field) {
		return DefinitionManager.getFieldComponent(field);
	}
	/**
	 * Moves an existing field to a new row inside the same tab
	 * @param tabID Tab ID
	 * @param field
	 * @param newRowAtIndex Index of the new Row
	 * @returns
	 */
	static moveFieldToNewRow(tabID, field, newRowAtIndex) {
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
	static moveFieldToExistingRow(tabID, field, rowIndex, fieldIndex) {
		return DefinitionManager.moveFieldToExistingRow(tabID, field, rowIndex, fieldIndex);
	}
	/**
	 * Duplicate a field
	 * @param tabID
	 * @param field
	 * @returns
	 */
	static copyField(tabID, field) {
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
	static addFieldToTab(tabID, field, rowIndex = undefined, fieldIndex = undefined) {
		return DefinitionManager.addFieldToTab(tabID, field, rowIndex, fieldIndex);
	}
	/**
	 * Add a group of fields
	 * @param tabID
	 * @param fieldGroup
	 * @returns
	 */
	static addFieldGroupToTab(tabID, fieldGroup) {
		return DefinitionManager.addFieldGroupToTab(tabID, fieldGroup);
	}
	/**
	 * Delete a field
	 * @param tabID
	 * @param field
	 * @param confirmDelete
	 * @returns
	 */
	static deleteField(tabID, field, confirmDelete = false) {
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
	static deleteTab(tab, confirmDelete = false) {
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
	static clearData(tab) {
		return DefinitionManager.clearData(tab);
	}
	static setComponentSelectionCategory(category) {
		if (category) {
			setComponentSelectionCategory.set(category);
		}
	}
}
