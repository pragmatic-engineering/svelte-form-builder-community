<script lang="ts">
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import type { StarRatingParams } from 'tabulator-tables';

	export let formatterParams: StarRatingParams;
</script>

<TextSlot>
	<Label forName="" label={'Stars'} />
	<input
		type="text"
		title="Maximum number of stars (default 5)"
		bind:value={formatterParams.stars}
	/>
</TextSlot>
