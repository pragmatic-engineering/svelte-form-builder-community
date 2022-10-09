<script lang="ts">
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import { view } from '$lib/Utils/store';
	import BuildTools from '$lib/Tools/BuildTools.svelte';
	import RenderTools from '$lib/Tools/RenderTools.svelte';

	let contentData: string = '';
	let playAnimation: boolean;
	let copyBlink = false;
	let customContentData: any = '';

	//Watch $view in order to clear the data when switching views
	$: {
		$view;
		contentData = '';
		customContentData = '';
	}

	//Don't allow both customContentData and contentData to show at the same time
	$: {
		if (contentData) {
			customContentData = '';
		}
		if (customContentData) {
			contentData = '';
		}
	}
</script>

<div class="wrapper">
	<div class="sidebar">
		{#if $view == 'build'}
			<BuildTools bind:contentData bind:customContentData />
		{:else if $view == 'preview'}
			<RenderTools bind:contentData bind:customContentData />
		{/if}
	</div>

	<div class="content" style:border-left={contentData ? '1px solid black' : ''}>
		<div>
			{#if contentData}
				<button on:click={() => (contentData = '')} title="Clear">
					<Icon type="Close" />
				</button>

				<button
					title="Copy to Clipboard"
					on:click={async () => {
						navigator.clipboard.writeText(contentData);

						copyBlink = true;
						setTimeout(() => {
							copyBlink = false;
						}, 800);
					}}
				>
					<Icon type="Copy" />
				</button>
				<span class="copyText">{copyBlink ? 'Copied to Clipboard' : ''}</span>
			{/if}
		</div>
		<div>
			{#key contentData}
				<pre class:blink={playAnimation}>
{contentData}
</pre>
			{/key}

			{#key customContentData}
				<span class:blink={playAnimation}>
					{@html customContentData}
				</span>
			{/key}
		</div>
	</div>
</div>

<style>
	.copyText {
		font-weight: bold;
		color: green;
	}
	.wrapper {
		display: grid;
		flex-direction: column;
		grid-template-columns: 1fr 11fr;
		border-bottom: 1px solid black;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
	}
</style>
