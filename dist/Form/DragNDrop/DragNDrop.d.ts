import type { DefinitionRows, Field } from '$lib/Utils/types';
export declare class DragNDrop {
	dragSourceField: Field | null;
	dragSourceFieldIndex: number | undefined;
	dragSourceRowIndex: number | undefined;
	constructor();
	componentDragStart(
		event: DragEvent,
		dragField: Field,
		rowIndex: number,
		fieldIndex: number
	): void;
	componentDragEnd(event: DragEvent, dragField: Field): void;
	componentDragEnter(event: DragEvent, dropField: Field, rowIndex: number): void;
	componentDragOver(event: DragEvent, dropField: Field): void;
	dropToExistingRow(event: DragEvent, rowIndex: number, fieldIndex: number): void;
	dropToNewRow(event: DragEvent, rowIndex: number): void;
	static dragOff(event: DragEvent): void;
	static validDnDStyleElement(event: DragEvent): true | undefined;
	static onComponentSelectionDragStart(event: DragEvent, componentName: string): void;
	static onComponentSelectionDragEnd(event: DragEvent, componentName: string): void;
	showTopBottomDropzone(
		isDragging: boolean,
		dropTargetRowIndex: number,
		rowIndex: number,
		isComponentSelectionDragging: boolean
	): boolean;
	showLeftDropzone(
		isDragging: boolean,
		dropTargetRowIndex: number,
		rowIndex: number,
		row: DefinitionRows,
		fieldIndex: number,
		isComponentSelectionDragging: boolean
	): boolean | undefined;
	showRightDropzone(
		isDragging: boolean,
		dropTargetRowIndex: number,
		rowIndex: number,
		row: DefinitionRows,
		fieldIndex: number,
		isComponentSelectionDragging: boolean
	): boolean | undefined;
}
