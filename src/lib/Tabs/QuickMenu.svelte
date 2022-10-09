<script lang="ts">
	import { TabManager } from '$lib/Tabs/TabManager';
	import type { FormTab } from '$lib/Utils/types';
	import { opts, tabPropertiesOpen } from '$lib/Utils/store';
	import TabProperties from '$lib/Tabs/TabPropertyPanel.svelte';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import DropdownMenu from '$lib/Utils/MiscComponents/DropdownMenu.svelte';
	export let tab: FormTab;
</script>

<DropdownMenu>
	<Icon
		type="Settings"
		on:click={() => {
			$tabPropertiesOpen = !$tabPropertiesOpen;
		}}
		enableAlternate={true}
		size="20px"
	/>
	<Icon
		type="Delete"
		on:click={() => {
			TabManager.deleteTab(tab, $opts.confirmRemoveTab);
		}}
		enableAlternate={true}
		size="20px"
		alternateFill="red"
		marginLeft={'10px'}
	/>
</DropdownMenu>

{#if $tabPropertiesOpen}
	<TabProperties bind:tab />
{/if}
