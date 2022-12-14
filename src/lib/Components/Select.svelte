<script lang="ts">
	import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
	import { getErrorMessage_Required } from '$lib/lib/Validation';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';

	import { convertDataAttributes } from '$lib/Utils/Utils';
	import SelectOptions from '$lib/Utils/ComponentUtilities/SelectOptions.svelte';
	import { conditionManager } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	//Setup with any desired default attributes
	const defaultAttributes: Partial<Field> = {};
	field = { ...defaultAttributes, ...field };

	export function triggerConditionChange() {
		$conditionManager.EvaluateFieldValue(undefined, field);
	}

	export function validateUserInput(): ValidationResult {
		if (
			field.htmlAttributes?.required &&
			(!field.htmlAttributes.value || !field.htmlAttributes.value.length)
		) {
			return { field: field, errors: [getErrorMessage_Required({ field })] };
		}
	}
</script>

<GroupSlot bind:field>
	<ComponentLabel {field} />

	{#if field.htmlAttributes.multiple}
		<select
			{...field.htmlAttributes}
			{...convertDataAttributes(field.dataAttributes)}
			bind:value={field.htmlAttributes.value}
			multiple
			on:pointerleave
			on:pointerenter
			on:change={triggerConditionChange}
			on:change={componentOptions?.events?.onchange}
			on:input={componentOptions?.events?.oninput}
			on:blur={componentOptions?.events?.onblur}
			on:focus={componentOptions?.events?.onfocus}
			on:keyup={componentOptions?.events?.onkeyup}
			on:keydown={componentOptions?.events?.onkeydown}
			on:invalid={componentOptions?.events?.oninvalid}
		>
			<SelectOptions bind:field />
		</select>
	{:else}
		<select
			{...field.htmlAttributes}
			{...convertDataAttributes(field.dataAttributes)}
			bind:value={field.htmlAttributes.value}
			on:pointerleave
			on:pointerenter
			on:change={triggerConditionChange}
			on:change={componentOptions?.events?.onchange}
			on:input={componentOptions?.events?.oninput}
			on:blur={componentOptions?.events?.onblur}
			on:focus={componentOptions?.events?.onfocus}
			on:keyup={componentOptions?.events?.onkeyup}
			on:keydown={componentOptions?.events?.onkeydown}
			on:invalid={componentOptions?.events?.oninvalid}
		>
			<SelectOptions bind:field />
		</select>
	{/if}
</GroupSlot>

<style>
	select {
		padding: 8px;
	}
</style>
