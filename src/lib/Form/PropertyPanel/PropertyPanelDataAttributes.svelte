<script lang="ts">
	import type { CustomDataAttribute } from '$lib/Utils/types';
	import Checkbox from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Checkbox.svelte';
	import SelectSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/SelectSlot.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';

	export let dataAttribute: CustomDataAttribute;
	export let guid: string;
	let id = `${guid}.${dataAttribute.name}`;
</script>

{#if dataAttribute && dataAttribute.label}
	{#if dataAttribute.isButton}
		<button
			on:click={(e) => dataAttribute.buttonHandler && dataAttribute.buttonHandler(e, dataAttribute)}
			>{dataAttribute.label}</button
		>
	{/if}

	{#if dataAttribute.options}
		<SelectSlot>
			<Label forName={id} label={dataAttribute.label} />

			{#if !dataAttribute.value && !Array.isArray(dataAttribute.value)}
				{(dataAttribute.value = [])}
			{/if}

			{#if dataAttribute.multiple}
				<select id="{guid}.{dataAttribute.name}" bind:value={dataAttribute.value} multiple>
					{#each dataAttribute.options as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			{:else}
				<select id="{guid}.{dataAttribute.name}" bind:value={dataAttribute.value}>
					{#each dataAttribute.options as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			{/if}
		</SelectSlot>
	{:else if dataAttribute.valueType == 'boolean' || typeof dataAttribute.value === 'boolean'}
		<Checkbox bind:value={dataAttribute.value} {id} label={dataAttribute.label} />
	{:else if dataAttribute.valueType == 'string' || typeof dataAttribute.value === 'string'}
		<TextSlot>
			<Label forName={id} label={dataAttribute.label} />
			<div contenteditable="true" type="text" {id} bind:textContent={dataAttribute.value} />
		</TextSlot>
	{:else if dataAttribute.valueType == 'number' || typeof dataAttribute.value === 'number'}
		<TextSlot>
			<Label forName={id} label={dataAttribute.label} />
			<input type="number" {id} bind:value={dataAttribute.value} />
		</TextSlot>
	{/if}
{/if}
