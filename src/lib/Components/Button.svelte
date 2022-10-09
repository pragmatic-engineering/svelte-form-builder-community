<script lang="ts">
	import type { Field, ComponentOptions } from '$lib/Utils/types';
	export let field: Field;
	export let componentOptions: ComponentOptions;
</script>

<button
	type={field.htmlAttributes.type}
	on:click={componentOptions?.events?.onclick}
	on:pointerleave
	on:pointerenter
	>{field.labelAttributes?.label}
</button>

<style>
	button {
		font-size: 16px;
	}
</style>
