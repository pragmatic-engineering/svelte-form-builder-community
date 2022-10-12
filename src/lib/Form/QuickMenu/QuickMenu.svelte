<script lang="ts">
	import { DefinitionManager } from '$lib/lib/DefinitionManager';
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import { animateScroll } from 'svelte-scrollto-element';
	import { opts } from '$lib/Utils/store';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import { QuickMenuUtils } from '$lib/Form/QuickMenu/QuickMenuUtils';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
	// export let row: DefinitionRows;

	let fill = '#c5c5c5';
	let size = '20px';
	const enableAlternate = true;
</script>

<div class="menu">
	{#if !$opts.disableDragNDropComponents}
		<div title="Drag and Drop">
			<Icon type="VerticalGrip" bind:size />
		</div>
	{:else}
		<Icon type="Empty" size="1px" />
	{/if}

	{#if !componentOptions.disabledQuickMenu?.edit}
		<div title="Settings">
			<Icon
				type="Settings"
				on:click={() => QuickMenuUtils.editField(field)}
				enableAlternate
				bind:size
				bind:fill
			/>
		</div>
	{/if}

	{#if !componentOptions.disabledQuickMenu?.copy}
		<div title="Copy">
			<Icon
				type="Copy"
				on:click={async () => {
					const newField = await DefinitionManager.copyField(tab.id, field);
					animateScroll.scrollTo({ element: `#${newField.htmlAttributes.id}` });
				}}
				enableAlternate
				bind:fill
				bind:size
			/>
		</div>
	{/if}

	{#if !componentOptions.disabledQuickMenu?.delete}
		<div title="Delete">
			<Icon
				type="Delete"
				on:click={() => DefinitionManager.deleteField(tab.id, field, $opts.confirmRemoveField)}
				enableAlternate
				bind:fill
				alternateFill="red"
				marginLeft={'10px'}
				bind:size
			/>
		</div>
	{/if}
</div>

<style>
	.menu {
		display: flex;
		flex-direction: row;
		gap: 3px;
	}
	.menu > * {
		box-sizing: content-box;
		padding: 3px;
		width: 16px;
		cursor: pointer;
	}
</style>
