<script lang="ts">
	import { DragNDropTabs } from '$lib/Tabs/DragNDrop';
	import { mainDefinition, opts, tabPropertiesOpen, view } from '$lib/Utils/store';
	import type { FormTab } from '$lib/Utils/types';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import TabProperties from '$lib/Tabs/TabPropertyPanel.svelte';
	import TabQuickMenu from '$lib/Tabs/QuickMenu.svelte';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import { TabManager } from '$lib/Tabs/TabManager';

	function handleTabClick(tabOrder: number | undefined) {
		if ($opts.activeTabOrderValue == tabOrder) {
			return;
		}

		$opts.activeTabOrderValue = tabOrder;

		if ($opts.builderAPIEvents?.onTabChanged) {
			$opts.builderAPIEvents?.onTabChanged?.call(undefined, TabManager.getActiveTabDefinition());
		}
	}

	let DnD = new DragNDropTabs();

	let isPointerOverTabHeader = false;
	let pointerOverTab: FormTab | undefined;
</script>

{#if $view != 'settings'}
	<ul>
		{#each $mainDefinition as formDefinition}
			{#if formDefinition.tab}
				<li
					{...convertDataAttributes(formDefinition.tab.dataAttributes)}
					on:dragstart={(e) => $view == 'build' && DnD.tabDragStart(e, formDefinition.tab)}
					on:dragover={(e) => $view == 'build' && DnD.tabDragOver(e, formDefinition.tab)}
					on:dragend={(e) => $view == 'build' && DnD.tabDragEnd(e, formDefinition.tab)}
					draggable={$view == 'build' && !$opts.disableDragNDropTabs}
					class={$opts.activeTabOrderValue === formDefinition.tab.tabOrder ? 'active' : ''}
				>
					<span
						on:click={() => handleTabClick(formDefinition.tab && formDefinition.tab.tabOrder)}
						on:pointerover={() => {
							isPointerOverTabHeader = true;
							pointerOverTab = formDefinition.tab;
						}}
						on:pointerleave={() => (isPointerOverTabHeader = false)}
					>
						{formDefinition.tab.label}

						{#if $view == 'build'}
							{#if isPointerOverTabHeader && formDefinition.tab == pointerOverTab && $opts.activeTabOrderValue === formDefinition.tab.tabOrder}
								<TabQuickMenu bind:tab={formDefinition.tab} />
							{/if}

							{#if $tabPropertiesOpen && $opts.activeTabOrderValue === formDefinition.tab.tabOrder}
								<TabProperties bind:tab={formDefinition.tab} />
							{/if}
						{/if}
					</span>
				</li>
			{/if}
		{/each}

		<!-- Add New Tab -->
		{#if $view == 'build'}
			<li>
				<span on:click={() => TabManager.addTab()}>
					<Icon type="SquarePlus" />
				</span>
			</li>
		{/if}
	</ul>
{/if}

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		margin-bottom: 0;
		list-style: none;
		border-bottom: 1px solid #dee2e6;
		margin-top: 10px;
	}
	li {
		margin: 0;
		margin-bottom: -1px;
		color: black;
	}

	span {
		border: 1px solid transparent;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		display: block;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	span:hover {
		border-color: #e9ecef #e9ecef #dee2e6;
	}

	li.active > span {
		color: var(--svelte-fb-active-tab-color);
		background-color: var(--svelte-fb-active-tab-background-color);
		border-color: #dee2e6 #dee2e6 #fff;
	}
</style>
