import type { CustomDataAttribute } from '$lib/Utils/types';

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
