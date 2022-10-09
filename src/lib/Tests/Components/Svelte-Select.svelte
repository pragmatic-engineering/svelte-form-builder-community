<!-- https://github.com/rob-balfre/svelte-select -->
<script context="module" lang="ts">
	//export const componentName = "Select";
	export const categories = ['Choice'];
	export const keywords = ['select', 'dropdown', 'group'];
	export const disabledHtmlAttributes = ['value'];

	export const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
</svg>`;
</script>

<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import { getErrorMessage_Required } from '$lib/lib/Validation';
	import Select from 'svelte-select';

	import type { ValidationResult } from '$lib/Utils/types';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	//Setup with any desired default attributes
	const defaultAttributes: Partial<Field> = {};
	field = { ...defaultAttributes, ...field };

	let items = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'pizza', label: 'Pizza' },
		{ value: 'cake', label: 'Cake' },
		{ value: 'chips', label: 'Chips' },
		{ value: 'ice-cream', label: 'Ice Cream' }
	];

	function handleSelect(event: CustomEvent) {
		console.log('selected item', event.detail);
	}

	export function validateUserInput(): ValidationResult {
		if (
			field.htmlAttributes?.required &&
			(!field.htmlAttributes.value || !field.htmlAttributes.value.length)
		) {
			return { field: field, errors: [getErrorMessage_Required({ field })] };
		}
	}

	export function customUserInputSerialization() {
		return JSON.stringify(field.htmlAttributes.value);
	}
</script>

<GroupSlot>
	<ComponentLabel {field} />

	<Select
		isMulti={field.htmlAttributes.multiple}
		{items}
		on:select={handleSelect}
		bind:value={field.htmlAttributes.value}
	/>
</GroupSlot>
