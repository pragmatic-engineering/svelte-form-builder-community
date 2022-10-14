<script lang="ts">
	import { DefinitionManager } from '$lib/lib/DefinitionManager';
	import { optionsProcessorStore, opts } from '$lib/Utils/store';
	import type { FormDefinition } from '$lib/Utils/types';
	import { CScope } from '$lib/Utils/Utils';
	import { validateDefinitions } from '$lib/lib/Validation';
	import { TabManager } from '$lib/Tabs/TabManager';

	export let contentData: string;
	export let customContentData: any;

	function validate() {
		let validationErrors = JSON.stringify(
			validateDefinitions().flatMap((x) => x.errors),
			undefined,
			2
		);

		if (validationErrors == '[]') {
			validationErrors = 'No errors ✔️';
		}

		contentData = validationErrors;
		console.log(contentData);
	}

	function getData() {
		contentData = DefinitionManager.getData(undefined);
		console.log(contentData);
	}

	function downloadDefinition() {
		var toDownload = new Blob([DefinitionManager.getData(undefined)], {
			type: 'data:application/octet-stream'
		});
		var link = window.URL.createObjectURL(toDownload);
		var el = document.createElement('a');
		el.href = link;
		el.download = `FormDefinition.${new Date().toLocaleString()}.json`;
		el.click();
		window.URL.revokeObjectURL(link);
	}

	let files: FileList;
	$: {
		if (files) {
			readFiles();
		}
	}

	async function readFiles() {
		for (let index = 0; index < files.length; index++) {
			const file = files[index];
			const definition: FormDefinition[] = JSON.parse(await file.text());
			await $optionsProcessorStore.ReLoadDefinition(definition);
			files = [] as unknown as FileList;
		}
	}
</script>

{#if !$opts.disabledBuildTools?.getData}
	<button class="tool-button" on:click={getData}>Show Definition</button>
{/if}

{#if !$opts.disabledBuildTools?.validateDefinition}
	<button class="tool-button" on:click={validate}>Validate Definition</button>
{/if}

{#if !$opts.disabledBuildTools?.exportDefinition}
	<button
		class="tool-button"
		on:click={() => {
			downloadDefinition();
		}}>Export Definition</button
	>
{/if}

{#if !$opts.disabledBuildTools?.importDefinition}
	{#key files}
		<div class="file-input">
			<input type="file" id={CScope('file-import')} class="file" bind:files />
			<label for={CScope('file-import')} class="tool-button">
				Import Definition
				<p class="file-name" />
			</label>
		</div>
	{/key}
{/if}

{#if !$opts.disabledBuildTools?.clearCurrentTab}
	<button
		class="tool-button"
		on:click={() => {
			DefinitionManager.clearData(TabManager.getActiveTabDefinition().tab);
		}}>Clear Current Tab</button
	>
{/if}

{#if !$opts.disabledBuildTools?.clearData}
	<button
		class="tool-button"
		on:click={() => {
			DefinitionManager.clearData();
		}}>Clear All Tabs</button
	>
{/if}

{#if $opts.customBuildTools}
	{#each $opts.customBuildTools as tool}
		<button
			class="tool-button"
			on:click={() => {
				contentData = '';
				customContentData = tool.onClick.call(undefined, {});
			}}>{tool.buttonText}</button
		>
	{/each}
{/if}

<style>
	.file {
		opacity: 0;
		width: 0.1px;
		height: 0.1px;
		position: absolute;
	}

	.file-input label {
		padding: 3px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
</style>
