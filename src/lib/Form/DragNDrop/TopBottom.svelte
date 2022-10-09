<script lang="ts">
	import { opts } from '$lib/Utils/store';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';

	let dropzone: HTMLDivElement;
	// let normalBackgroundColor = '#eaeff0';
	// let hoverBackgroundColor = 'yellow';
	export let height = '16px';
	export let text = '';

	let isOver = false;
	$: {
		if (!isOver) {
			//Doing this work around due to bug in Chromium where setting flex basis directly caused the rendering to lock up and not work
			setTimeout(() => {
				if (dropzone) {
					// dropzone.style.flexBasis = "1000px";
					// dropzone.style.border = '1px dashed #0d99f2';
					// dropzone.style.backgroundColor = normalBackgroundColor;
					// dropzone.style.borderRadius = '5px';
					// dropzone.style.height = height;
					// dropzone.style.margin = '10px';

					const style = get(opts).styling?.dragNDropTopBottomStyle;
					dropzone.style.border = style?.border as string;
					dropzone.style.backgroundColor = style?.backgroundColor as string;
					dropzone.style.borderRadius = style?.borderRadius as string;
					dropzone.style.height = style?.height as string;
					dropzone.style.margin = style?.margin as string;

					//If height specified, override
					if (height) {
						dropzone.style.height = height;
					}
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
		dropzone.style.backgroundColor = get(opts).styling?.dragNDropHoverBackgroundColor as string;
	}

	function dragLeave(event: DragEvent) {
		isOver = false;
		//dropzone.style.backgroundColor = normalBackgroundColor;
	}
</script>

<div
	bind:this={dropzone}
	in:fade={{ duration: 900 }}
	draggable={false}
	on:dragleave={(e) => dragLeave(e)}
	on:dragenter={(e) => dragEnter(e)}
	on:dragover={(e) => dragOver(e)}
	on:drop
>
	{text}
</div>
