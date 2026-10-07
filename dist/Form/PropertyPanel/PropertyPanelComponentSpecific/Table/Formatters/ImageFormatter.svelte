<script lang="ts">
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import type { ImageParams } from 'tabulator-tables';

	export let formatterParams: ImageParams;
</script>

<TextSlot>
	<Label forName="" label={'Height'} />
	<input
		type="text"
		title="A CSS value for the height of the image"
		bind:value={formatterParams.height}
	/>
</TextSlot>

<TextSlot>
	<Label forName="" label={'Width'} />
	<input
		type="text"
		title="A CSS value for the width of the image"
		bind:value={formatterParams.width}
	/>
</TextSlot>

<TextSlot>
	<Label forName="" label={'URL Prefix'} />
	<input
		type="text"
		title="Prepend string to the start of the cell value when generating the image src url"
		bind:value={formatterParams.urlPrefix}
	/>
</TextSlot>

<TextSlot>
	<Label forName="" label={'URL Suffix'} />
	<input
		type="text"
		title="Append string to the end of the cell value when generating the image src url"
		bind:value={formatterParams.urlSuffix}
	/>
</TextSlot>
