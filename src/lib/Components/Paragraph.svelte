<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '#lib/Utils/types';
	import GroupSlot from '#lib/Utils/ComponentUtilities/GroupSlot.svelte';

	import ComponentLabel from '#lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import { view } from '#lib/Utils/store';
	import { convertDataAttributes } from '#lib/Utils/Utils';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
	void field;
	void componentOptions;
	void tab;
</script>

<GroupSlot bind:field>
	<ComponentLabel {field} />

	{#if $view == 'build'}
		<div
			{...field.htmlAttributes}
			{...convertDataAttributes(field.dataAttributes)}
			class:edit={true}
			class:border={true}
			contenteditable="true"
			bind:innerHTML={field.htmlAttributes.value}
			on:pointerleave
			on:pointerenter
		></div>
	{:else}
		<div
			{...field.htmlAttributes}
			{...convertDataAttributes(field.dataAttributes)}
			contenteditable="false"
			bind:innerHTML={field.htmlAttributes.value}
		></div>
	{/if}
</GroupSlot>

<style>
	.edit {
		min-height: 100px;
		border-radius: 4px;
		cursor: text;
	}
</style>
