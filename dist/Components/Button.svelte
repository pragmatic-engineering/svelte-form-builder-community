<script lang="ts">
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import type { Field, ComponentOptions } from '$lib/Utils/types';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	export let field: Field;
	export let componentOptions: ComponentOptions;
</script>

<button
	type={field.htmlAttributes.type}
	{...field.htmlAttributes}
	{...convertDataAttributes(field.dataAttributes)}
	on:click={componentOptions?.events?.onclick}
	on:pointerleave
	on:pointerenter
	>{field.labelAttributes?.label}
</button>

<style>
	button {
		font-size: 16px;
		border: 1px solid black;
		border-radius: 0px;
		cursor: pointer;
	}
</style>
