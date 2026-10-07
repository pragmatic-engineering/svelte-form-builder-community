import { DefinitionManager } from '$lib/lib/DefinitionManager';
import { TabManager } from '$lib/Tabs/TabManager';
import {
	isDraggingStore,
	dropTargetRowIndexStore,
	isTabDragging,
	isComponentSelectionDragging,
	opts,
	isComponentDragging
} from '$lib/Utils/store';
import { get } from 'svelte/store';
import { CScope } from '$lib/Utils/Utils';
export class DragNDrop {
	dragSourceField = null;
	dragSourceFieldIndex;
	dragSourceRowIndex;
	constructor() {}
	componentDragStart(event, dragField, rowIndex, fieldIndex) {
		this.dragSourceField = dragField;
		this.dragSourceFieldIndex = fieldIndex;
		this.dragSourceRowIndex = rowIndex;
		//Set source field style
		if (DragNDrop.validDnDStyleElement(event)) {
			event.target.style.backgroundColor = '#c5c5c5';
			event.target.style.opacity = '.3';
		}
		event.dataTransfer?.setDragImage(document.getElementById(CScope('dragimage')), 16, 16);
		isComponentDragging.set(true);
	}
	componentDragEnd(event, dragField) {
		DragNDrop.dragOff(event);
		isComponentDragging.set(false);
	}
	componentDragEnter(event, dropField, rowIndex) {
		//Don't allow tabs to activate in the form area
		if (get(isTabDragging)) {
			return;
		}
		//If dragging a component and the DnD option is disabled, return early
		if (get(isComponentDragging) && get(opts).disableDragNDropComponents) {
			return;
		}
		event.preventDefault();
		isDraggingStore.set(true);
		dropTargetRowIndexStore.set(rowIndex);
	}
	componentDragOver(event, dropField) {
		event.preventDefault();
	}
	dropToExistingRow(event, rowIndex, fieldIndex) {
		const activeTabDefinition = TabManager.getActiveTabDefinition();
		const droppedFromComponentSelectionComponentName =
			event.dataTransfer?.getData('componentSelectionDrag');
		if (droppedFromComponentSelectionComponentName && activeTabDefinition.tab) {
			DefinitionManager.addFieldToTab(
				activeTabDefinition.tab.id,
				{ componentName: droppedFromComponentSelectionComponentName },
				rowIndex,
				fieldIndex
			);
			DragNDrop.dragOff(event);
			return;
		}
		if (this.dragSourceField && activeTabDefinition.tab) {
			DefinitionManager.moveFieldToExistingRow(
				activeTabDefinition.tab.id,
				this.dragSourceField,
				rowIndex,
				fieldIndex
			);
			DragNDrop.dragOff(event);
			return;
		}
	}
	dropToNewRow(event, rowIndex) {
		const activeTabDefinition = TabManager.getActiveTabDefinition();
		const droppedFromComponentSelectionComponentName =
			event.dataTransfer?.getData('componentSelectionDrag');
		if (droppedFromComponentSelectionComponentName && activeTabDefinition.tab) {
			DefinitionManager.addFieldToTab(
				activeTabDefinition.tab.id,
				{ componentName: droppedFromComponentSelectionComponentName },
				rowIndex
			);
			isDraggingStore.set(false);
			return;
		}
		if (this.dragSourceField && activeTabDefinition.tab) {
			DefinitionManager.moveFieldToNewRow(
				activeTabDefinition.tab.id,
				this.dragSourceField,
				rowIndex
			);
			isDraggingStore.set(false);
			return;
		}
	}
	static dragOff(event) {
		isDraggingStore.set(false);
		//Clear field style when drag terminates
		if (this.validDnDStyleElement(event)) {
			event.target.style.backgroundColor = 'unset';
			event.target.style.opacity = 'unset';
		}
	}
	static validDnDStyleElement(event) {
		if (event.target && event.target.style) {
			return true;
		}
	}
	static onComponentSelectionDragStart(event, componentName) {
		if (!componentName) {
			event.preventDefault();
			return;
		}
		isComponentSelectionDragging.set(true);
		event.dataTransfer?.setData('componentSelectionDrag', componentName);
	}
	static onComponentSelectionDragEnd(event, componentName) {
		isComponentSelectionDragging.set(false);
		isDraggingStore.set(false);
	}
	showTopBottomDropzone(isDragging, dropTargetRowIndex, rowIndex, isComponentSelectionDragging) {
		return (isDragging || isComponentSelectionDragging) && dropTargetRowIndex == rowIndex;
	}
	showLeftDropzone(
		isDragging,
		dropTargetRowIndex,
		rowIndex,
		row,
		fieldIndex,
		isComponentSelectionDragging
	) {
		if (
			!this.showTopBottomDropzone(
				isDragging,
				dropTargetRowIndex,
				rowIndex,
				isComponentSelectionDragging
			)
		) {
			return;
		}
		//Only show when over a single row
		if (dropTargetRowIndex != rowIndex) {
			return;
		}
		if (isComponentSelectionDragging) {
			return true;
		}
		//Reordering within the same row
		if (this.dragSourceRowIndex == rowIndex) {
			//Don't generate anything around myself
			if (fieldIndex == this.dragSourceFieldIndex) {
				return;
			}
			//Don't show for the field next to the source field in the row (when there are multiple fields)
			if (fieldIndex == this.dragSourceFieldIndex + 1) {
				return;
			}
		}
		return dropTargetRowIndex == rowIndex;
	}
	showRightDropzone(
		isDragging,
		dropTargetRowIndex,
		rowIndex,
		row,
		fieldIndex,
		isComponentSelectionDragging
	) {
		if (
			!this.showTopBottomDropzone(
				isDragging,
				dropTargetRowIndex,
				rowIndex,
				isComponentSelectionDragging
			)
		) {
			return;
		}
		//Don't show for field at the end of the row (when there are multiple fields)
		if (fieldIndex != row.fields.length - 1) {
			return;
		}
		//Only show when over a single row
		if (dropTargetRowIndex != rowIndex) {
			return;
		}
		if (isComponentSelectionDragging) {
			return true;
		}
		//Reordering within the same row
		if (this.dragSourceRowIndex == rowIndex) {
			//Don't generate anything around myself
			if (fieldIndex == this.dragSourceFieldIndex) {
				return;
			}
		}
		return dropTargetRowIndex == rowIndex;
	}
}
