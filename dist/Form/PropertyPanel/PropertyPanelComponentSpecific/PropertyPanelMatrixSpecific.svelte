<script lang="ts">
	import PropertyPanelChoices from '$lib/Form/PropertyPanel/PropertyPanelChoices.svelte';
	import type { Field } from '$lib/Utils/types';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';

	export let field: Field;
</script>

<TextSlot>
	<span>Rows</span>
	<PropertyPanelChoices
		bind:field
		bind:choiceConfiguration={field.customAttribute.rows}
		customAttribute="rows"
	/>
</TextSlot>

<TextSlot>
	<span>Columns</span>
	<PropertyPanelChoices
		bind:field
		bind:choiceConfiguration={field.customAttribute.columns}
		customAttribute="columns"
	/>
</TextSlot>

<style>
	span {
		text-decoration: underline;
		margin-bottom: 7px;
		font-weight: bold;
	}
</style>
