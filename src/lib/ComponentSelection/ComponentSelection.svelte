<script lang="ts">
	import { DefinitionManager } from '$lib/lib/DefinitionManager';
	import { componentSelectionStyle, componentSelectionPoppedOut, opts } from '$lib/Utils/store';
	import {
		FormComponents,
		SponsoredComponents,
		type ComponentOptions,
		type Field,
		type FormComponentsType
	} from '$lib/Utils/types';
	import { onMount } from 'svelte';
	import { DragNDrop } from '$lib/Form/DragNDrop/DragNDrop';
	import { TabManager } from '$lib/Tabs/TabManager';
	import { dragElement } from '$lib/ComponentSelection/DragNDropComponentSelection';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import { QuickMenuUtils } from '$lib/Form/QuickMenu/QuickMenuUtils';

	import { GetComponentSelectionMetaData } from '$lib/lib/DefaultAttributeMap';
	import { blur, fade, fly, scale, slide } from 'svelte/transition';
	import DropdownMenu from '$lib/Utils/MiscComponents/DropdownMenu.svelte';
	import { flavor } from '$lib/Utils/Misc/flavor';
	import { scrollTo } from '$lib/Utils/Utils';

	let main: HTMLDivElement = {} as HTMLDivElement;
	let dragHandle: HTMLDivElement = {} as HTMLDivElement;
	const storage_lastSelectedCategory = 'lastSelectedCategory';
	const storage_starredComponents: string = 'starredComponents';
	const storage_componentSelectionMinimized = 'componentSelectionMinimuzed';

	let isMinimized = JSON.parse(localStorage.getItem(storage_componentSelectionMinimized) as string);

	async function insertComponent(componentOptions: ComponentOptions) {
		if (componentOptions.fieldGroup) {
			const fields = await DefinitionManager.addFieldGroupToTab(
				TabManager.getActiveTabDefinition().tab?.id as string,
				componentOptions.fieldGroup
			);
			scrollTo(fields[0]);
		} else {
			const field = await DefinitionManager.addFieldToTab(
				TabManager.getActiveTabDefinition().tab?.id as string,
				{ componentName: componentOptions.componentName } as Field
			);
			if ($opts.editOnAdd) {
				QuickMenuUtils.editField(field);
			}
			scrollTo(field);
		}
	}

	//Get list of all categories
	let componentCategories: string[] = [];
	let starredComponentNames = getStarredComponents();

	function appendCategories(categories: string[] | undefined) {
		if (categories) {
			categories.forEach((category) => {
				if (
					category &&
					!componentCategories.includes(category) &&
					!$opts.disableCategories?.includes(category)
				) {
					componentCategories.push(category);
				}
			});
		}
	}

	function filterCategories(category: string) {
		return allComponentList.filter((x) => x.categories && x.categories.includes(category));
	}

	function filterByKeyword(keyword: string) {
		keyword = keyword.toLowerCase();

		return allComponentList.filter(
			(x) =>
				(x.keywords && x.keywords.some((y) => y.toLowerCase().includes(keyword))) ||
				x.componentName.toLowerCase().includes(keyword.toLowerCase())
		);
	}

	let allComponentList: ComponentOptions[] = [];
	onMount(() => {
		dragElement(main, dragHandle, $componentSelectionStyle);

		if ($componentSelectionPoppedOut || $opts.componentSelectionOptions?.defaultPoppedOut) {
			main.style.position = 'fixed';
			main.style.top = $componentSelectionStyle.top;
			setLeftBoundary();

			if ($opts.componentSelectionOptions?.defaultPoppedOutStyle) {
				Object.assign(main.style, $opts.componentSelectionOptions?.defaultPoppedOutStyle);
			}
		} else {
			restorePosition();
		}

		//Get Component data (filter out disabled ones)
		for (const componentName of GetInitialComponentList()) {
			const metaData = GetComponentSelectionMetaData(componentName);
			appendCategories(metaData.categories);

			allComponentList = [...allComponentList, { componentName: componentName, ...metaData }];
		}

		//User defined components or overrides
		if ($opts.componentOptions) {
			for (const item of $opts.componentOptions.filter(
				(x) => x.importPath && !allComponentList.some((y) => y.componentName == x.componentName)
			)) {
				const metaData = GetComponentSelectionMetaData(item.componentName as FormComponentsType);
				appendCategories(metaData.categories);

				allComponentList = [...allComponentList, { ...item, ...metaData }];
			}
		}

		//Restore last used category
		selectedComponentFilter = localStorage.getItem(storage_lastSelectedCategory) ?? 'all';
		onFilterComponents();
	});

	function GetInitialComponentList() {
		let components = FormComponents.filter((x) => !$opts.disableComponents?.includes(x));

		//If using standard, make sure the sponsored components don't show up (there won't be a matching file to import)
		//This will allow the component name to be used if user is implementing a custom component with the same name
		if (flavor == 'community') {
			components = components.filter((x) => !SponsoredComponents.includes(x));
		}

		return components;
	}

	function restorePosition() {
		//Store initial pinned position
		$componentSelectionStyle.top = main.getBoundingClientRect().top + 'px';
		$componentSelectionStyle.left =
			window.innerWidth - 10 - parseInt(getComputedStyle(main).width, 10) + 'px';
		$componentSelectionStyle.width = getComputedStyle(main).width;
	}

	function getStarredComponents(): string[] {
		return JSON.parse(localStorage.getItem(storage_starredComponents) as string) ?? [];
	}

	function addStarredComonent() {
		if (!starredComponentName) {
			return;
		}

		const current = getStarredComponents();
		if (!current.includes(starredComponentName)) {
			current.push(starredComponentName);
			localStorage.setItem(storage_starredComponents, JSON.stringify(current));
			onFilterComponents();
			starredComponentName = '';
			updateStarredList();
		}
	}

	function removeStarredComonent() {
		if (!starredComponentName) {
			return;
		}

		const current = getStarredComponents();
		if (current.includes(starredComponentName)) {
			localStorage.setItem(
				storage_starredComponents,
				JSON.stringify(current.filter((x) => x != starredComponentName))
			);
			onFilterComponents();
			starredComponentName = '';
			updateStarredList();
		}
	}

	function updateStarredList() {
		starredComponentNames = getStarredComponents();
	}

	function setLeftBoundary() {
		main.style.left = window.innerWidth - parseInt(getComputedStyle(main).width, 10) - 40 + 'px';
	}

	let filteredComponents = allComponentList;

	let selectedComponentFilter: string;
	function onFilterComponents() {
		if (selectedComponentFilter == 'all') {
			filteredComponents = allComponentList;
			sortFilteredComponents();
		} else if (selectedComponentFilter == 'starred') {
			filteredComponents = [];
			for (const name of getStarredComponents()) {
				filteredComponents = [
					...filteredComponents,
					allComponentList.filter((x) => x.componentName == name)[0]
				];
			}
		} else {
			filteredComponents = filterCategories(selectedComponentFilter);
			sortFilteredComponents();
		}

		localStorage.setItem(storage_lastSelectedCategory, selectedComponentFilter);
	}

	function sortFilteredComponents() {
		filteredComponents = filteredComponents.sort((a, b) => {
			if (a.componentName > b.componentName) {
				return 1;
			} else if (b.componentName > a.componentName) {
				return -1;
			}

			return 0;
		});
	}

	let toggleKeywordSearch: boolean;
	let keywordSearchTerm: string;
	function onKeywordSearch() {
		if (!keywordSearchTerm) {
			onFilterComponents();
		} else {
			filteredComponents = filterByKeyword(keywordSearchTerm);
		}
	}

	let starredComponentName: string;

	$: nonStarredComponents = allComponentList
		.map((x) => x.componentName)
		.filter((x) => !getStarredComponents().includes(x))
		.sort();

	let menuOpen = false;
	let isShrunk = false;

	let specialCategories = ['starred', 'Common'];
	let menuItemSize = '20';
</script>

<div
	class="main"
	bind:this={main}
	style:border={isMinimized ? '2px solid red' : $opts.styling?.componentSelection?.css?.border}
	style:max-height={$opts.styling?.componentSelection?.css?.maxHeight}
	style:background={$opts.styling?.componentSelection?.css?.background}
>
	<div class="header-controls">
		{#if !isShrunk}
			<select
				bind:value={selectedComponentFilter}
				on:change={onFilterComponents}
				title="Categories"
				style="width:100%"
				style:display={isMinimized ? 'none' : 'block'}
			>
				<option value="Common"> 🏚️ Common</option>
				<option value="starred">⭐ Starred</option>
				<option selected value="all">📖 All </option>

				{#each componentCategories.sort() as category}
					{#if !specialCategories.includes(category)}
						<option value={category}>{category}</option>
					{/if}
				{/each}
			</select>
		{/if}

		<div class="menuContainer">
			<DropdownMenu bind:menuOpen showRight={$componentSelectionPoppedOut ? '' : '0px'}>
				<div class="menuItems">
					{#if !isMinimized}
						{#if !$componentSelectionPoppedOut}
							<div title="Popout">
								<Icon
									type="Popout"
									size={menuItemSize}
									enableAlternate={true}
									alternateFill={$opts.styling?.componentSelection?.utilityMenuHoverColor}
									on:click={(e) => {
										$componentSelectionPoppedOut = !$componentSelectionPoppedOut;
									}}
								/>
							</div>
						{:else}
							<div title="Pin">
								<Icon
									type="Popin"
									size={menuItemSize}
									enableAlternate={true}
									alternateFill={$opts.styling?.componentSelection?.utilityMenuHoverColor}
									on:click={(e) => {
										$componentSelectionPoppedOut = !$componentSelectionPoppedOut;
									}}
								/>
							</div>
						{/if}
					{/if}

					{#if !isMinimized}
						<div title="Minimize">
							<Icon
								type="Minimize"
								size={menuItemSize}
								enableAlternate={true}
								alternateFill={$opts.styling?.componentSelection?.utilityMenuHoverColor}
								on:click={(e) => {
									$componentSelectionPoppedOut = true;
									isMinimized = true;
									localStorage.setItem(
										storage_componentSelectionMinimized,
										JSON.stringify(isMinimized)
									);
									menuOpen = false;
								}}
							/>
						</div>
					{:else}
						<div title="Maximize">
							<Icon
								type="Maximize"
								size={menuItemSize}
								enableAlternate={true}
								alternateFill={$opts.styling?.componentSelection?.utilityMenuHoverColor}
								on:click={(e) => {
									isMinimized = false;
									localStorage.setItem(
										storage_componentSelectionMinimized,
										JSON.stringify(isMinimized)
									);
								}}
							/>
						</div>
					{/if}

					{#if !isMinimized}
						{#if !isShrunk}
							<div title="Shrink">
								<Icon
									type="ArrowLeft"
									size={menuItemSize}
									enableAlternate={true}
									alternateFill={$opts.styling?.componentSelection?.utilityMenuHoverColor}
									on:click={(e) => {
										isShrunk = true;
										menuOpen = false;
									}}
								/>
							</div>
						{:else}
							<div title="Unshrink">
								<Icon
									type="ArrowRight"
									size={menuItemSize}
									enableAlternate={true}
									alternateFill={$opts.styling?.componentSelection?.utilityMenuHoverColor}
									on:click={(e) => {
										isShrunk = false;
										menuOpen = false;
									}}
								/>
							</div>
						{/if}
					{/if}
				</div>
			</DropdownMenu>
		</div>

		{#if $componentSelectionPoppedOut}
			<div class="drag-handle" bind:this={dragHandle}>
				<Icon type="VerticalGrip" size="20" />
			</div>
		{/if}
	</div>

	{#if !isMinimized}
		{#if !isShrunk}
			<div class="header-controls">
				{#if toggleKeywordSearch || true}
					<input
						bind:value={keywordSearchTerm}
						on:input={onKeywordSearch}
						class="keywordsearch"
						type="search"
						title="Filter by Name or Keyword"
						placeholder="Filter ..."
					/>
				{/if}
			</div>
		{/if}

		{#if selectedComponentFilter == 'starred' && !isShrunk}
			<div class="starred-controls">
				<select
					bind:value={starredComponentName}
					on:change={addStarredComonent}
					title="Star Components"
					style:width={`${parseInt($componentSelectionStyle.width) / 2}px`}
				>
					<option value="">★</option>

					{#each nonStarredComponents as item}
						<option value={item}>
							{item}
						</option>
					{/each}
				</select>

				<select
					bind:value={starredComponentName}
					on:change={removeStarredComonent}
					title="UnStar Components"
					style:width={`${parseInt($componentSelectionStyle.width) / 2}px`}
				>
					<option value="">☆</option>

					{#each starredComponentNames as item}
						<option value={item}>
							{item}
						</option>
					{/each}
				</select>
			</div>
		{/if}

		<div>
			<div class="component-spacer" />

			{#each filteredComponents as item}
				<div
					in:slide={{ duration: 400 }}
					out:slide|local={{ duration: 400 }}
					class="component-selection"
					on:dragstart={(e) => DragNDrop.onComponentSelectionDragStart(e, item.componentName)}
					on:dragend={(e) => DragNDrop.onComponentSelectionDragEnd(e, item.componentName)}
					draggable={!$opts.disableDragNDropComponentSelection}
					on:click={() => insertComponent(item)}
					title={item.componentName}
				>
					<span title={item.componentName}>
						{#if !$opts.disableDragNDropComponentSelection}
							<Icon type="VerticalGrip" />
						{:else}
							<Icon type="Empty" size="1px" />
						{/if}
					</span>

					{@html item.icon ?? ''}

					{#if !isShrunk}
						{item.componentName}
					{/if}
				</div>
				<div class="component-spacer" />
			{/each}
		</div>
	{/if}
</div>

<style>
	.main {
		position: sticky;
		top: 0px;
		display: flex;
		flex-direction: column;
		border: 1px solid black;
		z-index: 9;
		background-color: white;
		overflow-y: scroll;
	}

	.drag-handle {
		cursor: move;
	}

	.header-controls {
		display: flex;
		gap: 7px;
		/* margin: 1px; */
	}

	.starred-controls {
		display: flex;
	}

	.component-selection {
		cursor: pointer;
		padding-top: 7px;
		padding-bottom: 7px;
		padding-left: 3px;
	}

	.component-selection:hover {
		background-color: var(--svelte-fb-component-selection-hover-background-color);
	}

	.component-spacer {
		border-bottom: 1px solid #c6cdce;
	}

	.menuContainer {
		margin-top: 1px;
		margin-right: 4px;
	}
	.menuItems {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
</style>
