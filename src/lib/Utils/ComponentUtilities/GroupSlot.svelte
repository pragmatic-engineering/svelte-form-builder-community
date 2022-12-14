<script lang="ts">
	import type { Field } from '$lib/Utils/types';
	export let field: Field;
	let hidden = field.hidden;

	function fadePlus(node: HTMLElement, { delay = 0, duration = 400, color = 'yellow' }) {
		const o = +getComputedStyle(node).opacity;

		return {
			delay,
			duration,
			color,
			css: (t) => `
        opacity: ${t * o};
        background-color: ${color};        
        `
		};
	}
</script>

{#if !field || !field.hidden}
	<!-- <div in:fadePlus={{}}> -->
	<div>
		<div class="group">
			<slot />
		</div>
	</div>
{/if}

<style>
	.group {
		display: flex;
		flex-direction: column;
	}
</style>
