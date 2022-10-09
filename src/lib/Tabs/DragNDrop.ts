import { isTabDragging } from '$lib/Utils/store';
import type { FormTab } from '$lib/Utils/types';
import { CScope } from '$lib/Utils/Utils';

export class DragNDropTabs {
	dragSource_Tab: FormTab | null = null;
	dragSource_Element: HTMLElement | null = null;

	constructor() {}

	tabDragStart(event: DragEvent, tab: FormTab | undefined) {
		this.dragSource_Tab = tab as FormTab;
		this.dragSource_Element = event.target as HTMLElement;

		this.dragSource_Element.classList.add('isDraggingTab');
		event.dataTransfer?.setDragImage(
			document.getElementById(CScope('tabdragimage')) as HTMLElement,
			16,
			16
		);

		isTabDragging.set(true);
	}

	tabDragOver(event: DragEvent, tab: FormTab | undefined) {
		//Ignore same tab
		if (this.dragSource_Element == (event.currentTarget as HTMLElement)) {
			return;
		}

		event.preventDefault();

		if (event.target) {
			const targetShape = (event.target as HTMLElement).getBoundingClientRect();
			const isOverHalfwayAcrossXAxis = event.clientX > targetShape.x + targetShape.width / 2;

			if (isOverHalfwayAcrossXAxis && this.dragSource_Element) {
				swap(this.dragSource_Element, event.currentTarget as HTMLElement);
			}
		}
	}

	tabDragEnd(event: DragEvent, tab: FormTab | undefined) {
		if (this.dragSource_Element) {
			this.dragSource_Element.classList.remove('isDraggingTab');
		}

		isTabDragging.set(false);
	}
}

const swap = function (nodeA: HTMLElement, nodeB: HTMLElement) {
	const parentA = nodeA.parentNode;
	const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

	// Move `nodeA` to before the `nodeB`
	nodeB.parentNode && nodeB.parentNode.insertBefore(nodeA, nodeB);

	// Move `nodeB` to before the sibling of `nodeA`
	parentA && parentA.insertBefore(nodeB, siblingA);
};
