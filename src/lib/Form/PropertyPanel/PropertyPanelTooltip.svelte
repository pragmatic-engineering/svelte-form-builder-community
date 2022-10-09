<script lang="ts">
	import { nanoid } from 'nanoid';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import { TooltipPosition, TooltipSize, type Field } from '$lib/Utils/types';
	import { LibraryPrefix } from '$lib/Utils/Utils';
	import { onDestroy, onMount } from 'svelte';
	import SelectSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/SelectSlot.svelte';

	export let field: Field;
	let tooltipTextID = `${LibraryPrefix}-tooltip-${nanoid(10)}`;
	let tooltipPositionID = `${LibraryPrefix}-tooltip-${nanoid(10)}`;
	let tooltipSizeID = `${LibraryPrefix}-tooltip-${nanoid(10)}`;

	onMount(() => {
		if (!field.tooltipAttributes) {
			field.tooltipAttributes = {};
		}
	});

	onDestroy(() => {
		//Remove the attribute if not needed
		if (!field.tooltipAttributes?.text) {
			delete field.tooltipAttributes;
		}
	});
</script>

{#if field.tooltipAttributes}
	<TextSlot>
		<Label forName={tooltipTextID} label="Help & Informational Text" />
		<div
			contenteditable="true"
			type="text"
			id={tooltipTextID}
			bind:textContent={field.tooltipAttributes.text}
		/>
	</TextSlot>

	<SelectSlot>
		<Label forName={tooltipPositionID} label="Position" />

		<select id={tooltipPositionID} bind:value={field.tooltipAttributes.position}>
			{#each TooltipPosition as position}
				<option value={position}>{position}</option>
			{/each}
		</select>
	</SelectSlot>

	<SelectSlot>
		<Label forName={tooltipSizeID} label="Size" />

		<select id={tooltipSizeID} bind:value={field.tooltipAttributes.size}>
			{#each TooltipSize as size}
				<option value={size}>{size}</option>
			{/each}
		</select>
	</SelectSlot>
{/if}
