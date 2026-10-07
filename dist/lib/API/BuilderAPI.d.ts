import type { Field, FormTab } from '$lib/Utils/types';
import type { FieldGroup } from '$lib/Utils/types';
export declare class BuilderAPI {
	/**
	 * Get the form definition
	 * @param space
	 * @returns JSON
	 */
	static getDefinitionData(space?: number | string | undefined): string;
	/**
	 * Return the Component Information for a field
	 * @param field
	 * @returns
	 */
	static getFieldComponent(field: Field): import('$lib/Utils/types').ComponentImport;
	/**
	 * Moves an existing field to a new row inside the same tab
	 * @param tabID Tab ID
	 * @param field
	 * @param newRowAtIndex Index of the new Row
	 * @returns
	 */
	static moveFieldToNewRow(tabID: string, field: Field, newRowAtIndex: number): void;
	/**
	 * Moves a field to an existing row inside the same tab
	 * @param tabID Tab ID
	 * @param field
	 * @param newRowAtIndex Index of the new Row
	 * @param fieldIndex  Optionally, specify the location of where inside the row the new field should go(if multiple fields in the row)
	 * @returns
	 */
	static moveFieldToExistingRow(
		tabID: string,
		field: Field,
		rowIndex: number,
		fieldIndex: number | undefined
	): void;
	/**
	 * Duplicate a field
	 * @param tabID
	 * @param field
	 * @returns
	 */
	static copyField(tabID: string, field: Field): Promise<Field>;
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
		rowIndex?: number | undefined,
		fieldIndex?: number | undefined
	): Promise<Field>;
	/**
	 * Add a group of fields
	 * @param tabID
	 * @param fieldGroup
	 * @returns
	 */
	static addFieldGroupToTab(tabID: string, fieldGroup: FieldGroup[]): Promise<Field[]>;
	/**
	 * Delete a field
	 * @param tabID
	 * @param field
	 * @param confirmDelete
	 * @returns
	 */
	static deleteField(tabID: string, field: Field, confirmDelete?: boolean): number | undefined;
	/**
	 * Add a new Tab
	 * @returns
	 */
	static addTab(): void;
	/**
	 * Delete a Tab
	 * @param tab
	 * @param confirmDelete
	 * @returns
	 */
	static deleteTab(tab: FormTab, confirmDelete?: boolean): void;
	/**
	 *
	 * @returns The definition for the active Tab
	 */
	static getActiveTabDefinition(): import('$lib/Utils/types').FormDefinition;
	/**
	 * Check the Form Definition for any validation issues
	 * @returns
	 */
	static validate(): import('$lib/Utils/types').ValidationError[];
	/**
	 * Clears all the data or data for a given tab
	 * @param tab
	 * @returns
	 */
	static clearData(tab?: FormTab): void;
	static setComponentSelectionCategory(category: string): void;
}
