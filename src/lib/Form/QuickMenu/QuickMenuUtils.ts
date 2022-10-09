import type { Field, FormDefinition } from '$lib/Utils/types';
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
	constructor(public definition: FormDefinition) {}

	static editField(field: Field) {
		const isShown = get(showPropertyPanel);

		const existingField = get(propertyField);
		if (existingField != field) {
			propertyField.set(field);
			showPropertyPanel.set(true);
		} else {
			showPropertyPanel.set(!isShown);
		}
	}
	static pointerOver(e: PointerEvent, field: Field) {
		isPointerOverFieldStore.set(true);

		const paths = e.composedPath();
		paths.forEach((path) => {
			if ((path as HTMLDivElement).classList) {
				if ((path as HTMLDivElement).classList.contains(CScope('control'))) {
					// (path as HTMLDivElement).classList.add('pointerOverField');
					(path as HTMLDivElement).style.border = get(opts).styling
						?.pointerOverComponentBorder as string;
				}
			}
		});

		focusedField.set(field);
	}
	static pointerLeave(e: PointerEvent, field: Field) {
		// (e.target as HTMLDivElement).classList.remove('pointerOverField');
		(e.target as HTMLDivElement).style.border = 'unset';
		isPointerOverFieldStore.set(false);
	}
}
