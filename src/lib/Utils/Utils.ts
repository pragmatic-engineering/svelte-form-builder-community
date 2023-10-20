import { animateScroll } from '$lib/Utils/MiscComponents/ScrollToElementFork/service';
import type { CustomDataAttribute, Field } from '$lib/Utils/types';

export function capitalizeFirstLetter(string: string) {
	return string[0].toUpperCase() + string.slice(1);
}

//Convert CustomDataAttribute[] to dynamic object array with the data-* attributes
export function convertDataAttributes(attributes: CustomDataAttribute[] | undefined) {
	const results: any = {};

	if (!attributes) {
		return results;
	}

	if (!Array.isArray(attributes)) {
		return attributes;
	}

	attributes.forEach((attribute) => {
		const name = `data-${attribute.name}`;

		if (
			typeof attribute.value === 'boolean' ||
			typeof attribute.value === 'number' ||
			typeof attribute.value === 'string'
		) {
			results[name] = attribute.value;
		}

		if (typeof attribute.value === 'object') {
			results[name] = JSON.stringify(attribute.value);
		}
	});

	return results;
}

//Scroll to element and offset by half the viewport height
export function scrollTo(field: Field) {
	const offset = (-1 * window.innerHeight) / 2;
	const id = field.htmlAttributes.id;
	const standardElement = document.getElementById(id);

	//First try finding an element that got a standard id
	if (standardElement) {
		animateScroll.scrollTo({ element: `#${id}`, offset: offset });
		return;
	}

	//Some elements don't have a standard id (like checkbox group), so next try to scroll to its label element
	const labelEl = document.querySelector(`[for="${id}"]`);
	if (labelEl) {
		animateScroll.scrollTo({ element: labelEl, offset: offset });
		return;
	}
}

export function CScope(suffix: string) {
	return `${LibraryPrefix}-${suffix}`;
}
export function RemoveAlphaNumeric(value: string | undefined) {
	if (!value) {
		return '';
	}

	return value.replace(/[\W_]+/g, ' ').trim();
}

export const LibraryPrefix = 'svelte-fb';
