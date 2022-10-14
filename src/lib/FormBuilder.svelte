<script lang="ts">
	import type { BuilderOptions } from '$lib/Utils/types';
	import {
		opts,
		componentSelectionPoppedOut,
		view,
		showPropertyPanel,
		propertyField,
		optionsProcessorStore,
		mainDefinition
	} from '$lib/Utils/store';
	import ComponentSelection from '$lib/ComponentSelection/ComponentSelection.svelte';
	import DragImage from '$lib/Utils/MiscComponents/DragImage.svelte';
	import Settings from '$lib/Views/Settings.svelte';
	import Header from '$lib/Views/Header.svelte';
	import TabHeader from '$lib/Tabs/TabHeader.svelte';
	import { OptionsProcessor } from '$lib/lib/OptionsProcessor';
	import { BuilderAPI } from '$lib/lib/API/BuilderAPI';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import Tools from '$lib/Tools/Tools.svelte';
	import ComponentPropertyPanel from '$lib/Form/PropertyPanel/PropertyPanel.svelte';
	import Loader from '$lib/Utils/MiscComponents/Loader.svelte';
	import { RenderManager } from '$lib/lib/RenderManager';
	import { CScope } from '$lib/Utils/Utils';
	import 'balloon-css/balloon.min.css';
	import 'pretty-checkbox/dist/pretty-checkbox.min.css';
	import { RenderAPI } from '$lib/lib/API/RenderAPI';
	import DisplayContentsWrapper from '$lib/Utils/MiscComponents/DisplayContentsWrapper.svelte';
	import Form from '$lib/Views/Form.svelte';
	import PinnedComponentSelection from '$lib/ComponentSelection/PinnedComponentSelection.svelte';

	export let options: Partial<BuilderOptions>;
	OptionsProcessor.loadDefaults(options as BuilderOptions);

	export const builderAPI = BuilderAPI;
	export const renderAPI = RenderAPI;

	$optionsProcessorStore = new OptionsProcessor($opts);

	$: {
		if ($opts.builderAPIEvents?.onViewChanged) {
			$opts.builderAPIEvents?.onViewChanged?.call(undefined, $view);
		}
	}

	let showTools = false;
	$: showToolsIcon = !$opts.disabledViews?.tools && ($view == 'build' || $view == 'preview');
</script>

<div
	class={CScope('root')}
	style="
	--svelte-fb-root-color:{$opts.styling?.root?.css?.color ?? 'unset'};
	--svelte-fb-root-background-color: {$opts.styling?.root?.css?.backgroundColor ?? 'unset'};

	--svelte-fb-root-tool-button-background-color: {$opts.styling?.root?.toolButtonBackgroundColor ??
		'#fafbfc'};
	--svelte-fb-root-tool-button-color: {$opts.styling?.root?.toolButtonColor ?? '#24292e'};
	--svelte-fb-root-tool-button-hover-background-color: {$opts.styling?.root
		?.toolButtonHoverBackgroundColor ?? '#f3f4f6'};


	--svelte-fb-root-dropdown-background-color: {$opts.styling?.root?.cssDropDownMenu
		?.backgroundColor ?? '#f6f6f6'};
	
	--svelte-fb-active-tab-color:{$opts.styling?.tab?.activeTabColor ?? '#fff'};
	--svelte-fb-active-tab-background-color:{$opts.styling?.tab?.activeTabBackgroundColor ?? '#eaeff0'};

	--svelte-fb-component-selection-hover-background-color:{$opts.styling?.componentSelection
		?.componentItemHoverBackgroundColor ?? 'unset'};
	"
	style:color={$opts.styling?.root?.css?.color ?? 'unset'}
	style:background={$opts.styling?.root?.css?.background ?? 'unset'}
	style:background-color1={$opts.styling?.root?.css?.backgroundColor ?? 'unset'}
>
	{#if $view == 'build' || $view == 'preview' || $view == 'settings'}
		<Header
			selectedValue={$view}
			links={[
				{
					text: 'Build',
					value: 'build',
					onClick: () => {
						$view = 'build';
						RenderManager.applyDefaultValues();
					}
				},
				{
					text: 'Settings',
					value: 'settings',
					onClick: () => {
						$view = 'settings';
						$showPropertyPanel = false;
					},
					hidden: $opts.disabledViews?.settings
				},
				{
					text: 'Preview',
					value: 'preview',
					onClick: () => {
						$view = 'preview';
						$showPropertyPanel = false;
						RenderManager.applyDefaultValues();
					},
					hidden: $opts.disabledViews?.render
				}
			]}
		>
			<span title="Tools" style:display={!showToolsIcon ? 'none' : ''}>
				<Icon type="Tools" on:click={() => (showTools = !showTools)} size="20px" />
			</span>
		</Header>

		{#if showTools}
			<Tools />
		{/if}
	{/if}

	{#await $optionsProcessorStore.init()}
		<Loader />
	{:then}
		{#if $opts.enableTabs == true}
			<TabHeader />
		{/if}

		<!-- Tab Content/Form Content Wrapper -->
		<DisplayContentsWrapper showIf={$view != 'settings'}>
			<div class:svelte-fb-build-layout={$view == 'build'}>
				{#each $mainDefinition as formDefinition}
					<DisplayContentsWrapper showIf={$opts.activeTabOrderValue == formDefinition.tab.tabOrder}>
						<Form definition={formDefinition} />
					</DisplayContentsWrapper>
				{/each}

				{#if $view == 'build'}
					<PinnedComponentSelection />
				{/if}
			</div>
		</DisplayContentsWrapper>

		{#if $view == 'build'}
			{#if $componentSelectionPoppedOut}
				<ComponentSelection />
			{/if}

			{#if $showPropertyPanel}
				{#key $propertyField}
					<ComponentPropertyPanel />
				{/key}
			{/if}

			<!-- Miscellaneous Hidden -->
			<div>
				<DragImage />
			</div>
		{/if}
	{/await}

	<DisplayContentsWrapper showIf={$view == 'settings'}>
		<Settings />
	</DisplayContentsWrapper>
</div>

<style>
	.svelte-fb-root :global(*) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
	.svelte-fb-root :global(.isDraggingTab) {
		border: 1px dashed #0d99f2 !important;
		border-radius: 4px !important;
		padding-left: 25px !important;
		padding-right: 25px !important;
	}
	.svelte-fb-root :global(.isDraggingTab > span) {
		border: none !important;
	}

	.svelte-fb-root :global(.required::after) {
		content: ' *';
		color: red;
	}

	.svelte-fb-root :global(.tool-button) {
		border-radius: 0px;
		border: 1px solid rgba(27, 31, 35, 0.15);
		color: var(--svelte-fb-root-tool-button-color);
		background-color: var(--svelte-fb-root-tool-button-background-color);
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		padding: 6px 16px;
		white-space: nowrap;
		user-select: none;
		cursor: pointer;
	}

	.svelte-fb-root :global(.border) {
		border: 1px solid black;
	}

	.svelte-fb-root :global(.tool-button:hover) {
		background-color: var(--svelte-fb-root-tool-button-hover-background-color);
		border: 1px solid black;
	}

	.svelte-fb-build-layout {
		display: flex;
		/* justify-content: center; */
		justify-content: space-between;
	}

	.svelte-fb-root :global(*) {
		color-scheme: normal;
	}
</style>
