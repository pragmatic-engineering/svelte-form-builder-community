<script lang="ts">
	import { onMount } from 'svelte';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
	import { getErrorMessage_Required } from '$lib/lib/Validation';
	import CheckboxRadioCommon from '$lib/Utils/ComponentUtilities/CheckboxRadioCommon.svelte';
	import { conditionManager } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	export function validateUserInput(): ValidationResult {
		const values = customGetUserData();
		if (field.htmlAttributes?.required && (!values || !values.length)) {
			return { field: field, errors: [getErrorMessage_Required({ field })] };
		}
	}

	export function customGetUserData() {
		let values: string[] = [];

		//Get distinct standard values
		if (field.htmlAttributes.value) {
			field.htmlAttributes.value.forEach((value: string) => {
				if (!values.includes(value)) {
					values.push(value);
				}
			});
		}

		//Add in Other value if applicable
		if (otherValue) {
			if (!values.includes(otherValue)) {
				values.push(otherValue);
			}
		}

		return values;
	}

	export function customReset() {
		//When resetting the form, always kill the 'Other' choice
		isOtherChecked = false;
	}

	onMount(() => {
		if (!field.htmlAttributes.value) {
			field.htmlAttributes.value = [];
		}

		if (!field.choiceConfiguration) {
			field.choiceConfiguration = {};
		}

		//Set default styling if brand new
		if (field.choiceConfiguration && !field.choiceConfiguration?.solidColor) {
			field.choiceConfiguration.solidColor = undefined;
			field.choiceConfiguration.svg = true;
			field.choiceConfiguration.checkIcon = true;
			field.choiceConfiguration.animation = 'smooth';
		}

		//Check if "Other" needs to be shown & populated
		if (customGetUserData().length) {
			customGetUserData().forEach((value) => {
				//First one found that there is no choice-value match for, assume that is the "Other" choice
				if (!field.choiceConfiguration?.choices?.find((x) => x.value == value)) {
					otherValue = value;
					if (field.choiceConfiguration) {
						field.choiceConfiguration.enableOther = true;
						isOtherChecked = true;

						//Remove the "Other" value from the standard list for now
						field.htmlAttributes.value = field.htmlAttributes.value.filter((x) => x != otherValue);
					}
				}
			});
		}
	});

	export function triggerConditionChange() {
		$conditionManager.EvaluateFieldValue(undefined, field);
	}

	let otherValue: string | null;
	let isOtherChecked: boolean;
	$: {
		if (!isOtherChecked) {
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
		{#if field.htmlAttributes.value && field.choiceConfiguration && field.choiceConfiguration.choices}
			{#each field.choiceConfiguration.choices as choice}
				{@const id = `${field.htmlAttributes.id}-${choice.value}`}

				<CheckboxRadioCommon bind:field label={choice.label} {id}>
					<input
						{...field.htmlAttributes}
						{id}
						{...convertDataAttributes(field.dataAttributes)}
						type="checkbox"
						bind:group={field.htmlAttributes.value}
						value={choice.value}
						on:invalid
						on:change={componentOptions?.events?.onchange}
						on:input={componentOptions?.events?.oninput}
						on:change={triggerConditionChange}
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
						{id}
						{...convertDataAttributes(field.dataAttributes)}
						type="checkbox"
						bind:checked={isOtherChecked}
						bind:value={otherValue}
						on:invalid
						on:change={componentOptions?.events?.onchange}
						on:input={componentOptions?.events?.oninput}
						on:change={triggerConditionChange}
						on:blur={componentOptions?.events?.onblur}
						on:focus={componentOptions?.events?.onfocus}
						on:invalid={componentOptions?.events?.oninvalid}
					/>
				</CheckboxRadioCommon>

				{#if isOtherChecked}
					<input
						class="other-val"
						type="text"
						bind:value={otherValue}
						on:change={componentOptions?.events?.onchange}
						on:input={componentOptions?.events?.oninput}
						on:change={triggerConditionChange}
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
