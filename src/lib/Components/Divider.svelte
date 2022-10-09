<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	import { convertDataAttributes } from '$lib/Utils/Utils';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	let height: string;
	$: {
		if (field.dataAttributes?.find((x) => x.name == 'customSize')?.value) {
			height = `${field.dataAttributes?.find((x) => x.name == 'customSize')?.value}px`;
		} else {
			height = `${field.dataAttributes?.find((x) => x.name == 'size')?.value}px`;
		}
	}
</script>

<GroupSlot>
	<div
		style:height
		{...field.htmlAttributes}
		{...convertDataAttributes(field.dataAttributes)}
		on:pointerleave
		on:pointerenter
	/>
</GroupSlot>
