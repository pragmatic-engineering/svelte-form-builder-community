<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import { view } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
</script>

<GroupSlot>
	<ComponentLabel {field} />

	{#if $view == 'build'}
		<div
			class:edit={true}
			class:border={true}
			contenteditable="true"
			bind:innerHTML={field.htmlAttributes.value}
			on:pointerleave
			on:pointerenter
		/>
	{:else}
		<div contenteditable="false" bind:innerHTML={field.htmlAttributes.value} />
	{/if}
</GroupSlot>

<style>
	.edit {
		min-height: 100px;
		border-radius: 4px;
		cursor: text;
	}
</style>
