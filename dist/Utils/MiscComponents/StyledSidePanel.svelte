<script lang="ts">
	import { opts } from '$lib/Utils/store';
	import { onMount } from 'svelte';

	let top: string;
	onMount(() => {
		const mainHeaderCoords = (
			document.querySelector('.svelte-fb-main-header') as HTMLElement
		).getBoundingClientRect();

		top = `${mainHeaderCoords.y + mainHeaderCoords.height}px`;
	});
</script>

<div
	class="propertyPanel"
	style:top={$opts.styling?.propertyPanel?.propertyPanelTop ?? top}
	style:background={$opts.styling?.propertyPanel?.propertyPanelBackground}
>
	<slot />
</div>

<style>
	.propertyPanel {
		height: 100%;
		width: 33%;
		position: fixed;
		z-index: 99;
		right: 0;
		border-left: 3px solid black;
		border-top: 1px solid black;
	}

	.propertyPanel :global(.propertyPanelHeader) {
		display: flex;
		justify-content: space-between;
		padding: 7px;
		border-bottom: 1px dotted black;
		user-select: none;
	}

	.propertyPanel :global(.properties) {
		padding: 4px;
		height: 100%;
	}

	.propertyPanel :global(.generalProperties) {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.propertyPanel :global(* [contenteditable]) {
		/* color: red; */
		cursor: text;
		color: black;
		background-color: white;
		border: 1px solid black;
	}

	.propertyPanel :global(* input:hover) {
		border: 2px solid black;
	}

	.propertyPanel :global(* [contenteditable]:hover) {
		border: 2px solid black;
	}
</style>
