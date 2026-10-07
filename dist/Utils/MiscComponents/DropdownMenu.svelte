<script lang="ts">
	import Icon, { type IconType } from '$lib/Utils/MiscComponents/Icon.svelte';

	export let title = '';
	export let icon: IconType = 'VerticalMenu';
	export let menuOpen = false;
	export let showRight = '';
</script>

<section class="dropdown" {title} on:pointerleave={() => (menuOpen = false)}>
	<div style="display:contents" on:click={() => (menuOpen = !menuOpen)}>
		<Icon type={icon} />
	</div>

	<div class:show={menuOpen} class="dropdown-content" style:right={menuOpen ? showRight : ''}>
		<slot />
	</div>
</section>

<style>
	.dropdown {
		display: inline-block;
		cursor: pointer;
	}

	.dropdown-content {
		padding: 7px;
		display: none;
		position: absolute;
		background-color: var(--svelte-fb-root-dropdown-background-color);
		color: var(--svelte-fb-root-color);
		border: 1px solid #ddd;
		z-index: 2;
	}

	.show {
		display: block;
	}
</style>
