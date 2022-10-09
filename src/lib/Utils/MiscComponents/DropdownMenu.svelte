<script lang="ts">
	import Icon, { type IconType } from '$lib/Utils/MiscComponents/Icon.svelte';

	export let title = '';
	export let icon: IconType = 'VerticalMenu';
	export let menuOpen = false;
</script>

<section class="dropdown" {title} on:pointerleave={() => (menuOpen = false)}>
	<div style="display:contents" on:click={() => (menuOpen = !menuOpen)}>
		<Icon type={icon} />
	</div>

	<div class:show={menuOpen} class="dropdown-content">
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
		position: fixed;
		background-color: #f6f6f6;
		border: 1px solid #ddd;
		z-index: 2;
	}

	.show {
		display: block;
	}
</style>
