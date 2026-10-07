<script lang="ts">
	import Icon, { type IconType } from '#lib/Utils/MiscComponents/Icon.svelte';

	export let title = '';
	export let icon: IconType = 'VerticalMenu';
	export let menuOpen = false;
	export let showRight = '';
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section class="dropdown" {title} on:pointerleave={() => (menuOpen = false)}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
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
