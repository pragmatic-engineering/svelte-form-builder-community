<script lang="ts">
	import { nanoid } from 'nanoid';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import { LibraryPrefix } from '$lib/Utils/Utils';
	import SelectSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/SelectSlot.svelte';
	import type { Field } from '$lib/Utils/types';

	export let field: Field;
	let id = `${LibraryPrefix}-tooltip-${nanoid(10)}`;
</script>

<SelectSlot>
	<Label forName={id} label="Type" />
	<select {id} bind:value={field.htmlAttributes.type}>
		<option value="button">button</option>
		<option value="submit">submit</option>
		<option value="reset">reset</option>
	</select>
</SelectSlot>
