<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/Utils/Utils';
	import Checkbox from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Checkbox.svelte';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';

	export let guid: string;

	export let name: string;
	export let label: string = capitalizeFirstLetter(name);
	export let value: any;

	let id = `${guid}.${name}`;
</script>

{#if typeof value === 'boolean'}
	<Checkbox bind:value {id} {label} />
{/if}

{#if typeof value === 'string'}
	<TextSlot>
		<Label forName={id} {label} />
		<div contenteditable="true" type="text" {id} bind:textContent={value} />
	</TextSlot>
{/if}

<!-- Allow null in case value is wiped out -->
{#if typeof value === 'number' || value == null}
	<TextSlot>
		<Label forName={id} {label} />
		<input type="number" {id} bind:value />
	</TextSlot>
{/if}
