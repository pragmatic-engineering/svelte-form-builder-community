<script lang="ts">
	import { onMount } from 'svelte';
	import { convertDataAttributes, LibraryPrefix } from '$lib/Utils/Utils';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	import { getErrorMessage_Required } from '$lib/lib/Validation';
	import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
	import CheckboxRadioCommon from '$lib/Utils/ComponentUtilities/CheckboxRadioCommon.svelte';
	import { conditionManager } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	export function validateUserInput(): ValidationResult {
		const value = customGetUserData();
		if (field.htmlAttributes?.required && (!value || !value.length)) {
			return { field: field, errors: [getErrorMessage_Required({ field })] };
		}
	}

	export function customGetUserData() {
		if (field.htmlAttributes.value == otherValValue) {
			return otherValue;
		}

		return field.htmlAttributes.value;
	}

	onMount(() => {
		if (!field.choiceConfiguration) {
			field.choiceConfiguration = {};
		}

		//Set default styling if brand new
		if (field.choiceConfiguration && !field.choiceConfiguration?.solidColor) {
			field.choiceConfiguration.solidColor = undefined;
			field.choiceConfiguration.svg = false;
			field.choiceConfiguration.checkIcon = false;
			field.choiceConfiguration.animation = 'smooth';
			field.choiceConfiguration.shape = 'round';
		}

		//Check if "Other" needs to be shown & populated
		if (field.choiceConfiguration.enableOther) {
			const currentValue = customGetUserData();
			if (currentValue) {
				//First one found that there is no choice-value match for, assume that is the "Other" choice
				if (!field.choiceConfiguration?.choices?.find((x) => x.value == currentValue)) {
					field.htmlAttributes.value = otherValValue;
					otherValue = currentValue;
				}
			}
		}
	});

	export function triggerConditionChange() {
		$conditionManager.EvaluateFieldValue(undefined, field);
	}

	let otherValValue = `${LibraryPrefix}-Other`;
	let otherValue: string | null;
	$: {
		if (field.htmlAttributes.value != otherValValue) {
			otherValue = null;
		}
	}
</script>

<GroupSlot bind:field>
	<ComponentLabel {field} />

	<span
		style:display={field.choiceConfiguration?.inline ? '' : 'contents'}
		on:pointerleave
		on:pointerenter
	>
		{#if field.choiceConfiguration && field.choiceConfiguration.choices}
			{#each field.choiceConfiguration.choices as choice}
				{@const id = `${field.htmlAttributes.id}-${choice.value}`}

				<CheckboxRadioCommon bind:field label={choice.label} {id}>
					<input
						{...field.htmlAttributes}
						{id}
						{...convertDataAttributes(field.dataAttributes)}
						type="radio"
						bind:group={field.htmlAttributes.value}
						value={choice.value}
						on:invalid
						on:change={triggerConditionChange}
						on:change={componentOptions?.events?.onchange}
						on:input={componentOptions?.events?.oninput}
						on:blur={componentOptions?.events?.onblur}
						on:focus={componentOptions?.events?.onfocus}
						on:keyup={componentOptions?.events?.onkeyup}
						on:keydown={componentOptions?.events?.onkeydown}
						on:invalid={componentOptions?.events?.oninvalid}
					/>
				</CheckboxRadioCommon>
			{/each}

			{#if field.choiceConfiguration.enableOther}
				{@const id = `${field.htmlAttributes.id}-other`}

				<CheckboxRadioCommon bind:field label="Other" {id}>
					<input
						{...field.htmlAttributes}
						{id}
						{...convertDataAttributes(field.dataAttributes)}
						type="radio"
						bind:group={field.htmlAttributes.value}
						value={otherValValue}
						on:invalid
						on:change={triggerConditionChange}
						on:change={componentOptions?.events?.onchange}
						on:input={componentOptions?.events?.oninput}
						on:blur={componentOptions?.events?.onblur}
						on:focus={componentOptions?.events?.onfocus}
						on:invalid={componentOptions?.events?.oninvalid}
					/>
				</CheckboxRadioCommon>

				{#if field.htmlAttributes.value == otherValValue}
					<input
						class="other-val"
						type="text"
						bind:value={otherValue}
						on:change={triggerConditionChange}
						on:change={componentOptions?.events?.onchange}
						on:input={componentOptions?.events?.oninput}
						on:blur={componentOptions?.events?.onblur}
						on:focus={componentOptions?.events?.onfocus}
						on:keyup={componentOptions?.events?.onkeyup}
						on:keydown={componentOptions?.events?.onkeydown}
						on:invalid={componentOptions?.events?.oninvalid}
					/>
				{/if}
			{/if}
		{/if}
	</span>
</GroupSlot>

<style>
	.other-val {
		width: 100%;
	}
</style>
