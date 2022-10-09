<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
</script>

<GroupSlot>
	<ComponentLabel {field} />

	<div class="wrapper" on:pointerleave on:pointerenter>
		<canvas {...field.htmlAttributes} {...convertDataAttributes(field.dataAttributes)} />
	</div>
</GroupSlot>

<style>
	.canvas {
		width: 100%;
	}
</style>
