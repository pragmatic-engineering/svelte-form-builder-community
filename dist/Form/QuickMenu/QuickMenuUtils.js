import {
	isPointerOverFieldStore,
	focusedField,
	propertyField,
	showPropertyPanel,
	opts
} from '$lib/Utils/store';
import { get } from 'svelte/store';
import { CScope } from '$lib/Utils/Utils';
export class QuickMenuUtils {
	definition;
	constructor(definition) {
		this.definition = definition;
	}
	static editField(field) {
		const isShown = get(showPropertyPanel);
		const existingField = get(propertyField);
		if (existingField != field) {
			propertyField.set(field);
			showPropertyPanel.set(true);
		} else {
			showPropertyPanel.set(!isShown);
		}
	}
	static pointerOver(e, field) {
		isPointerOverFieldStore.set(true);
		const paths = e.composedPath();
		paths.forEach((path) => {
			if (path.classList) {
				if (path.classList.contains(CScope('control'))) {
					// (path as HTMLDivElement).classList.add('pointerOverField');
					path.style.border = get(opts).styling?.form?.pointerOverComponentBorder;
				}
			}
		});
		focusedField.set(field);
	}
	static pointerLeave(e, field) {
		// (e.target as HTMLDivElement).classList.remove('pointerOverField');
		e.target.style.border = 'unset';
		isPointerOverFieldStore.set(false);
	}
}
