<script lang="ts">
	import { opts } from '$lib/Utils/store';
	import { get } from 'svelte/store';
	import { scale } from 'svelte/transition';

	let dropzone: HTMLDivElement;

	let isOver = false;
	$: {
		if (!isOver) {
			//Doing this work around due to bug in Chromium where setting flex basis directly caused the rendering to lock up and not work
			setTimeout(() => {
				if (dropzone) {
					const style = get(opts).styling?.form?.cssDragNDropLeftRight;
					dropzone.style.border = style?.border as string;
					dropzone.style.backgroundColor = style?.backgroundColor as string;
					dropzone.style.borderRadius = style?.borderRadius as string;
					dropzone.style.height = style?.height as string;
					dropzone.style.margin = style?.margin as string;
					dropzone.style.marginBottom = style?.marginBottom as string;
				}
			}, 0);
		}
	}

	function dragEnter(event: DragEvent) {
		event.preventDefault();
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();

		isOver = true;
		dropzone.style.backgroundColor = get(opts).styling?.form
			?.dragNDropHoverBackgroundColor as string;
	}

	function dragLeave(event: DragEvent) {
		isOver = false;
	}
</script>

<div
	bind:this={dropzone}
	in:scale|global={{ duration: 850 }}
	draggable={false}
	on:dragleave={(e) => dragLeave(e)}
	on:dragenter={(e) => dragEnter(e)}
	on:dragover={(e) => dragOver(e)}
	on:drop
/>

<style>
	div {
		height: 32px;
		flex: 1 0 0%;
		min-width: 32px;
		min-height: 32px;
	}
</style>
