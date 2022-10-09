<script context="module" lang="ts">
	export const categories = ['Text'];

	export const icon = `✒️`;

	export let dataAttributes = [
		{ label: 'Data Attribute 1', name: 'one', value: false },
		{ label: 'Data Attribute 1', name: 'two', value: '' }
	];

	export let htmlAttributes: HTMLAttributes<HTMLElement> = {
		required: false,
		spellcheck: true,
		class: ''
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import type { HTMLAttributes } from '$lib/Utils/other-types/svelte-types';

	import type { ValidationResult } from '$lib/Utils/types';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	export let componentOptions: ComponentOptions;
	export let field: Field;
	export let tab: FormTab;

	export let logger = () => console.log('Default Input Logger');

	onMount(async () => {
		logger();
	});

	// //Setup with any desired default attributes
	const defaultAttributes: Partial<Field> = {};
	field = { ...defaultAttributes, ...field };

	const dispatch = createEventDispatcher();
	function onInputChanged(event: InputEvent | Event) {
		// console.log((event as InputEvent).data);
		// dispatch("changeValue", {
		//   name: field.name,
		// });
	}

	function onKeyUp(event: KeyboardEvent) {}

	export function validateDefinition(): ValidationResult {
		if (!field.htmlAttributes.class?.includes('form-group')) {
			return {
				field,
				errors: [
					`(Tab ${tab?.label}) ${field.labelAttributes?.label} must contain a 'form-group' Class`
				]
			};
		}
	}
</script>

<GroupSlot>
	<ComponentLabel {field} />

	<input
		{...field.htmlAttributes}
		{...convertDataAttributes(field.dataAttributes)}
		type="text"
		bind:value={field.htmlAttributes.value}
		on:input
		on:input={componentOptions?.events?.oninput}
		on:mouseover={componentOptions?.events?.onmouseover}
		on:blur
		on:blur={(e) => {
			componentOptions?.events?.onblur?.call(undefined, e);
		}}
		on:keyup={onKeyUp}
		on:invalid
	/>
</GroupSlot>
