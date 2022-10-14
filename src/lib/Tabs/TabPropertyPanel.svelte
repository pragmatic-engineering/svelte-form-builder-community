<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { nanoid } from 'nanoid';

	import Header, { type HeaderLinks } from '$lib/Views/Header.svelte';
	import { opts, tabPropertiesOpen } from '$lib/Utils/store';
	import type { FormTab } from '$lib/Utils/types';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import PropertyPanelDataAttributes from '$lib/Form/PropertyPanel/PropertyPanelDataAttributes.svelte';
	import StyledSidePanel from '$lib/Utils/MiscComponents/StyledSidePanel.svelte';

	export let tab: FormTab;
	let tabNames: string[] = [];
	let propertyTabs: HeaderLinks[] = [];

	GatherDataAttributeTabs();

	function GatherDataAttributeTabs() {
		tabNames = ['General'];

		if (tab.dataAttributes) {
			tab.dataAttributes.forEach((attribute) => {
				if (attribute.tab && !tabNames.includes(attribute.tab)) {
					tabNames.push(attribute.tab);
				}
			});
		}

		tabNames.forEach((name) => {
			propertyTabs.push({ text: name, value: name });
		});
	}

	const guid = nanoid(8);

	let selectedLink = 'General';
</script>

<StyledSidePanel>
	<div in:fly={{ x: 200, duration: 700 }} out:fade={{ duration: 300 }}>
		<div
			class="propertyPanelHeader"
			style:background={$opts.styling?.propertyPanel?.propertyPanelHeaderBackground}
		>
			<span>Tab Properties</span>
			<span on:click={() => ($tabPropertiesOpen = false)}>
				<Icon type="Close" />
			</span>
		</div>

		<Header bind:selectedValue={selectedLink} gap="18px" fontSize="13px" links={propertyTabs} />

		<div class="properties background">
			{#if selectedLink == 'General'}
				<div class="generalProperties">
					<TextSlot>
						<Label forName={`${guid}.label`} label={'Label'} />
						<input type="text" id={`${guid}.label`} bind:value={tab.label} />
					</TextSlot>
				</div>
			{/if}

			{#if tab.dataAttributes}
				{#each tab.dataAttributes as item}
					{#if !item.tab && selectedLink == 'General'}
						<PropertyPanelDataAttributes {guid} bind:dataAttribute={item} />
					{:else if item.tab == selectedLink}
						<PropertyPanelDataAttributes {guid} bind:dataAttribute={item} />
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</StyledSidePanel>
