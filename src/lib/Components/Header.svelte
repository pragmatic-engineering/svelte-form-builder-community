<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import { convertDataAttributes } from '$lib/Utils/Utils';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	$: flavor = field.dataAttributes?.find((x) => x.name == 'flavor')?.value;
</script>

<GroupSlot>
	{@const elementType = typeof flavor === 'string' ? flavor : 'h1'}
	<div on:pointerleave on:pointerenter>
		<svelte:element
			this={elementType}
			{...field.htmlAttributes}
			{...convertDataAttributes(field.dataAttributes)}
			>{field.labelAttributes?.label}</svelte:element
		>
	</div>
</GroupSlot>
