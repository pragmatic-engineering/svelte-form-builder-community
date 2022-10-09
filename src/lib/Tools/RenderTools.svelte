<script lang="ts">
	import { RenderAPI } from '$lib/lib/API/RenderAPI';
	import { RenderManager } from '$lib/lib/RenderManager';
	import { mainDefinition, opts } from '$lib/Utils/store';
	import { validateUserInputs } from '$lib/lib/Validation';

	export let contentData: string;
	export let customContentData: any;

	function validate() {
		let validationErrors = JSON.stringify(
			validateUserInputs().flatMap((x) => x.errors),
			undefined,
			2
		);

		if (validationErrors == '[]') {
			validationErrors = 'No errors ✔️';
		}

		contentData = validationErrors;
		console.log(contentData);
	}

	async function getData() {
		contentData = JSON.stringify(JSON.parse(await RenderManager.serialize()), undefined, 2);
		console.log(contentData);
	}
</script>

{#if !$opts.disabledRenderTools?.serialize}
	<button class="tool-button" on:click={getData}>Serialize</button>
{/if}

{#if !$opts.disabledRenderTools?.validateForm}
	<button class="tool-button" on:click={validate}>Validate</button>
{/if}

{#if !$opts.disabledRenderTools?.resetForm}
	<button
		class="tool-button"
		on:click={() => {
			RenderAPI.resetForm();
			$mainDefinition = $mainDefinition; //Force redraw/sync
		}}>Reset</button
	>
{/if}

{#if $opts.customRenderTools}
	{#each $opts.customRenderTools as tool}
		<button
			class="tool-button"
			on:click={() => {
				contentData = '';
				customContentData = tool.onClick.call(undefined, {});
			}}>{tool.buttonText}</button
		>
	{/each}
{/if}
