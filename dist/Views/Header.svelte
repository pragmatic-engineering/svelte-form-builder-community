<script lang="ts" context="module">
	export interface HeaderLinks {
		text: string;
		value: string;
		onClick?: () => any;
		hidden?: boolean;
	}
</script>

<script lang="ts">
	import { opts } from '$lib/Utils/store';

	export let links: HeaderLinks[];
	export let selectedValue: string;
	export let height: string = '35px';
	export let gap: string = '40px';
	export let fontSize: string = '';
</script>

<div
	class="header"
	style:height
	style:gap
	style:font-size={fontSize}
	style:background={$opts.styling?.header?.css?.background ?? 'unset'}
	style:border={$opts.styling?.header?.css?.border ?? 'unset'}
>
	<div class="menu">
		<slot />
	</div>

	{#each links as item}
		<div
			on:click={() => (selectedValue = item.value)}
			on:click={item.onClick}
			class="header-inactive"
			class:header-active={selectedValue == item.value}
			style:display={item.hidden ? 'none' : ''}
		>
			{item.text}
		</div>
	{/each}
	<div style="flex-grow:1" />
</div>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		font-weight: 500;
		flex-grow: 1;

		/* Disable accidentally selecting the text */
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.header > div {
		cursor: pointer;
	}

	.header-inactive {
		opacity: 0.3;
	}

	.header-inactive:hover {
		opacity: 0.6;
	}

	.header-active {
		opacity: 1;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.menu {
		padding-left: 5px;
		flex-grow: 1;
		line-height: 0;
		background: unset;
		background-color: unset;
	}
</style>
