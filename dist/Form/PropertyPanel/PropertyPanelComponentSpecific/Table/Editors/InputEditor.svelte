<script lang="ts">
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import type { InputParams } from 'tabulator-tables';

	export let editorParams: InputParams;
</script>

<TextSlot>
	<Label forName="" label={'Mask'} />
	<input
		type="text"
		title="Apply an input mask. A = Letter, 9 = Number, * = Any character. Any other character must match exactly. For example 'FY-23' matches a mask of AA-99"
		bind:value={editorParams.mask}
	/>
</TextSlot>
