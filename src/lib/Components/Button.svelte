<script lang="ts">
	import ComponentLabel from '#lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '#lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import type { Field, ComponentOptions } from '#lib/Utils/types';
	import { convertDataAttributes } from '#lib/Utils/Utils';
	export let field: Field;
	export let componentOptions: ComponentOptions;
	void field;
	void componentOptions;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
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
