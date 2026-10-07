import { isTabDragging } from '$lib/Utils/store';
import { CScope } from '$lib/Utils/Utils';
export class DragNDropTabs {
	dragSource_Tab = null;
	dragSource_Element = null;
	constructor() {}
	tabDragStart(event, tab) {
		this.dragSource_Tab = tab;
		this.dragSource_Element = event.target;
		this.dragSource_Element.classList.add('isDraggingTab');
		event.dataTransfer?.setDragImage(document.getElementById(CScope('tabdragimage')), 16, 16);
		isTabDragging.set(true);
	}
	tabDragOver(event, tab) {
		//Ignore same tab
		if (this.dragSource_Element == event.currentTarget) {
			return;
		}
		event.preventDefault();
		if (event.target) {
			const targetShape = event.target.getBoundingClientRect();
			const isOverHalfwayAcrossXAxis = event.clientX > targetShape.x + targetShape.width / 2;
			if (isOverHalfwayAcrossXAxis && this.dragSource_Element) {
				swap(this.dragSource_Element, event.currentTarget);
			}
		}
	}
	tabDragEnd(event, tab) {
		if (this.dragSource_Element) {
			this.dragSource_Element.classList.remove('isDraggingTab');
		}
		isTabDragging.set(false);
	}
}
const swap = function (nodeA, nodeB) {
	const parentA = nodeA.parentNode;
	const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
	// Move `nodeA` to before the `nodeB`
	nodeB.parentNode && nodeB.parentNode.insertBefore(nodeA, nodeB);
	// Move `nodeB` to before the sibling of `nodeA`
	parentA && parentA.insertBefore(nodeB, siblingA);
};
