import type { FieldInfo } from '$lib/Utils/types';
import type { Field, FormDefinition, FormTab } from '$lib/Utils/types';
import type { ComponentImport, FieldGroup, SvelteFBComponent } from '$lib/Utils/types';
import type { HTMLAttributes } from '$lib/Utils/other-types/svelte-types';
export declare class DefinitionManager {
	static getFieldComponent(field: Field): ComponentImport;
	static getData(space?: number | string | undefined): string;
	static processField(field: Field): void;
	private static GenerateFieldIdentifier;
	private static SetupAttributes;
	private static SetupHtmlAttributes;
	private static SetupDataAttributes;
	static moveFieldToNewRow(tabID: string, field: Field, newRowAtIndex: number): void;
	static moveFieldToExistingRow(
		tabID: string,
		field: Field,
		rowIndex: number,
		fieldIndex: number | undefined
	): void;
	static copyField(tabID: string, field: Field): Promise<Field>;
	static addFieldToTab(
		tabID: string,
		field: Field,
		rowIndex?: number | undefined,
		fieldIndex?: number | undefined
	): Promise<Field>;
	static addFieldGroupToTab(tabID: string, fieldGroup: FieldGroup[]): Promise<Field[]>;
	static deleteField(tabID: string, field: Field, confirmDelete?: boolean): number | undefined;
	private static removeRow;
	getFieldsForRow(rowID: number, definition: FormDefinition): Field[] | undefined;
	static getFieldInfo(queryHtmlAttributes: HTMLAttributes<HTMLElement>): FieldInfo | undefined;
	static clearData(tab?: FormTab): void;
	static visitAllFields(callback: (field: Field) => void): void;
	static visitAllFieldInstances(
		callback: (fieldInfo: FieldInfo, instance: SvelteFBComponent) => void
	): void;
	static getFieldInstance(field: Field): SvelteFBComponent;
	static getDefinitionByField(field: Field): FormDefinition | undefined;
}
