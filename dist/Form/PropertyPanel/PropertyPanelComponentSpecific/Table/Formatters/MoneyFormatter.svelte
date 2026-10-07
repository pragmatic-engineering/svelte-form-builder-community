<script lang="ts">
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import type { MoneyParams } from 'tabulator-tables';

	export let formatterParams: MoneyParams;
</script>

<TextSlot>
	<Label forName="" label={'Decimal'} />
	<input
		type="text"
		title="Symbol to represent the decimal point (default '.')"
		placeholder=" Symbol to represent the decimal point (default '.')"
		bind:value={formatterParams.decimal}
	/>
</TextSlot>

<TextSlot>
	<Label forName="" label={'Thousand'} />
	<input
		type="text"
		title="Symbol to represent the thousands separator (default ',')"
		placeholder=" Symbol to represent the thousands separator (default ',')"
		bind:value={formatterParams.thousand}
	/>
</TextSlot>

<TextSlot>
	<Label forName="" label={'Symbol'} />
	<input
		type="text"
		title="Currency Symbol (no default)"
		placeholder=" Currency Symbol (no default)"
		bind:value={formatterParams.symbol}
	/>
</TextSlot>

<TextSlot>
	<Label forName="" label={'Precision'} />
	<input
		type="text"
		title="The number of decimals to display (default is 2)"
		placeholder="The number of decimals to display (default is 2)"
		bind:value={formatterParams.precision}
	/>
</TextSlot>
