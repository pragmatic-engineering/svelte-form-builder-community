<script context="module" lang="ts">
	let dynamicTab: string;

	export function addAndSelectExternalTab(tab: string) {
		dynamicTab = tab;
	}
</script>

<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { nanoid } from 'nanoid';

	import Header, { type HeaderLinks } from '$lib/Views/Header.svelte';
	import { DefinitionManager } from '$lib/lib/DefinitionManager';
	import { mainDefinition, opts, propertyField, showPropertyPanel } from '$lib/Utils/store';
	import type { Field, ComponentImport } from '$lib/Utils/types';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import PropertyPanelLabel from '$lib/Form/PropertyPanel/PropertyPanelLabel.svelte';
	import PropertyPanelDataAttributes from '$lib/Form/PropertyPanel/PropertyPanelDataAttributes.svelte';
	import PropertyPanelHtmlAttribute from '$lib/Form/PropertyPanel/PropertyPanelHtmlAttributes.svelte';
	import { onDestroy, afterUpdate } from 'svelte';
	import DisplayContentsWrapper from '$lib/Utils/MiscComponents/DisplayContentsWrapper.svelte';
	import StyledSidePanel from '$lib/Utils/MiscComponents/StyledSidePanel.svelte';
	import PropertyPanelChoices from '$lib/Form/PropertyPanel/PropertyPanelChoices.svelte';
	import PropertyPanelTooltip from '$lib/Form/PropertyPanel/PropertyPanelTooltip.svelte';
	import ButtonSpecific from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/ButtonSpecific.svelte';
	import PropertyPanelChoiceCheckboxRadioSpecific from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/PropertyPanelChoiceCheckboxRadioSpecific.svelte';
	import TableSpecific from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/Table/TableSpecific.svelte';
	import TableColumnSpecific from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/Table/TableColumnSpecific.svelte';
	import PropertyPanelMatrixSpecific from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/PropertyPanelMatrixSpecific.svelte';

	let field: Field = $propertyField;
	let fieldComponent: ComponentImport;

	let tabNames: string[] = [];
	let propertyTabs: HeaderLinks[] = [];

	fieldComponent = DefinitionManager.getFieldComponent(field);

	let hasChoices = fieldComponent.componentOptions.hasChoices;
	let noTooltipProperties = fieldComponent.componentOptions.noTooltipProperties;
	let selectedLink = 'General';

	GatherDataAttributeTabs();

	function GatherDataAttributeTabs() {
		tabNames = ['General'];

		if (!noTooltipProperties) {
			tabNames.push('Help');
		}

		if (hasChoices) {
			tabNames.push('Choices');
		}

		if (field.componentName == 'Matrix') {
			tabNames.push('Matrix');
		}

		if (
			field.componentName == 'Checkbox Group' ||
			field.componentName == 'Radio Group' ||
			field.componentName == 'Matrix'
		) {
			tabNames.push('Style');
		}

		if (field.componentName == 'Table') {
			tabNames.push('Table');
		}

		if (field.dataAttributes) {
			field.dataAttributes.forEach((attribute) => {
				if (attribute.tab && !tabNames.includes(attribute.tab)) {
					tabNames.push(attribute.tab);
				}
			});
		}

		if (dynamicTab) {
			tabNames.push(dynamicTab);
			selectedLink = dynamicTab;
			dynamicTab = ''; //Clear out after using for the next instance
		}

		tabNames.forEach((name) => {
			propertyTabs.push({ text: name, value: name });
		});
	}

	const guid = nanoid(8);

	if ($opts.builderAPIEvents?.onComponentPropertiesOpened) {
		$opts.builderAPIEvents?.onComponentPropertiesOpened?.call(undefined, field);
	}

	onDestroy(() => {
		if ($opts.builderAPIEvents?.onComponentPropertiesClosed) {
			$opts.builderAPIEvents?.onComponentPropertiesClosed?.call(undefined, field);
		}
	});

	afterUpdate(() => {
		$mainDefinition = $mainDefinition;
	});
</script>

{#if $showPropertyPanel}
	<StyledSidePanel>
		<div class="propertyPanel" in:fly={{ x: 200, duration: 700 }} out:fade={{ duration: 300 }}>
			<div
				class="propertyPanelHeader"
				style:background={$opts.styling?.propertyPanelHeaderBackground}
			>
				<span
					>{@html fieldComponent.componentOptions.icon ?? ''}
					{fieldComponent && fieldComponent.componentOptions.componentName} Properties</span
				>
				<span on:click={() => ($showPropertyPanel = false)}>
					<Icon type="Close" />
				</span>
			</div>

			<Header bind:selectedValue={selectedLink} gap="18px" fontSize="13px" links={propertyTabs} />

			<div class="properties background">
				<DisplayContentsWrapper showIf={selectedLink == 'General'}>
					<div class="generalProperties">
						<PropertyPanelLabel bind:field {guid} />
					</div>

					{#if field.componentName == 'Button'}
						<ButtonSpecific bind:field />
					{/if}
				</DisplayContentsWrapper>

				<!-- Html Attributes -->
				{#if field.htmlAttributes}
					{#each Object.entries(field.htmlAttributes) as [name, value]}
						{#if selectedLink == 'General' && !$opts.disabledHtmlAttributes?.includes(name) && !fieldComponent.componentOptions.disabledHtmlAttributes?.includes(name)}
							<PropertyPanelHtmlAttribute {guid} {name} bind:value={field.htmlAttributes[name]} />
						{/if}
					{/each}
				{/if}

				<DisplayContentsWrapper showIf={selectedLink == 'Choices'}>
					{#if hasChoices}
						<PropertyPanelChoices bind:field bind:choiceConfiguration={field.choiceConfiguration} />
					{/if}
				</DisplayContentsWrapper>

				<DisplayContentsWrapper showIf={selectedLink == 'Help'}>
					<PropertyPanelTooltip bind:field />
				</DisplayContentsWrapper>

				<DisplayContentsWrapper showIf={selectedLink == 'Style'}>
					{#if field.componentName == 'Checkbox Group' || field.componentName == 'Radio Group' || field.componentName == 'Matrix'}
						<PropertyPanelChoiceCheckboxRadioSpecific bind:field />
					{/if}
				</DisplayContentsWrapper>

				{#if field.componentName == 'Table'}
					<DisplayContentsWrapper showIf={selectedLink == 'Table'}>
						<TableSpecific bind:field />
					</DisplayContentsWrapper>

					<DisplayContentsWrapper showIf={selectedLink == 'Column'}>
						<TableColumnSpecific bind:field />
					</DisplayContentsWrapper>
				{/if}

				{#if field.componentName == 'Matrix'}
					<DisplayContentsWrapper showIf={selectedLink == 'Matrix'}>
						<PropertyPanelMatrixSpecific bind:field />
					</DisplayContentsWrapper>
				{/if}

				<hr />

				<!-- Custom Data Attributes -->
				{#if field.dataAttributes}
					{#each field.dataAttributes as item}
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
{/if}
