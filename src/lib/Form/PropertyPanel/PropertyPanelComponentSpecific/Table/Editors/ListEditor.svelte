<script lang="ts">
	import Checkbox from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Checkbox.svelte';
	import { nanoid } from 'nanoid';
	import type { ListEditorParams } from 'tabulator-tables';
	import PropertyPanelChoices from '$lib/Form/PropertyPanel/PropertyPanelChoices.svelte';
	import type { Field } from '$lib/Utils/types';

	export let field: Field;
	export let editorParams: ListEditorParams;

	if (field.choiceConfiguration) {
		field.choiceConfiguration.enableOther = editorParams.freetext;
	}

	$: {
		if (field.choiceConfiguration && field.choiceConfiguration.choices) {
			editorParams.values = [];

			for (const choice of field.choiceConfiguration.choices) {
				editorParams.values.push({ label: choice.label, value: choice.value });
			}
		} else {
			editorParams.values = [];
		}
	}

	$: {
		editorParams.autocomplete = true;
		if (editorParams.multiselect) {
			editorParams.autocomplete = false;
		}
	}

	$: {
		if (field.choiceConfiguration?.enableOther) {
			editorParams.freetext = true;
		} else {
			editorParams.freetext = false;
		}
	}
</script>

<Checkbox
	bind:value={editorParams.multiselect}
	id={nanoid(8)}
	label={'Multiple'}
	marginTop="10px"
/>

<br />

<PropertyPanelChoices bind:field bind:choiceConfiguration={field.choiceConfiguration} />
