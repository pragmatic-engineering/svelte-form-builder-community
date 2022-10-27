<script lang="ts">
	import { nanoid } from 'nanoid';
	import Checkbox from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Checkbox.svelte';
	import { opts } from '$lib/Utils/store';
	import { LibraryPrefix } from '$lib/Utils/Utils';
	import SelectSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/SelectSlot.svelte';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import { Theme, ThemeMap, type ThemeType } from '$lib/Utils/Misc/Theme';
	let fontSize = '22px';

	let selectedTheme: ThemeType | undefined = $opts.theme;
</script>

<div>
	<Checkbox
		bind:value={$opts.enableTabs}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Enable Tabs"
	/>
	<Checkbox
		bind:value={$opts.confirmRemoveField}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Confirm Delete Field"
	/>
	<Checkbox
		bind:value={$opts.confirmRemoveTab}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Confirm Delete Tab"
	/>
	<Checkbox
		bind:value={$opts.editOnAdd}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Edit On Add "
	/>
	<Checkbox
		bind:value={$opts.allowHtmlLabels}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Allow HTML Labels"
	/>
	<Checkbox
		bind:value={$opts.showLabelStyle}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Show label Style"
	/>
	<Checkbox
		bind:value={$opts.showLabelMaxWidth}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Show Label Max Width"
	/>
	<Checkbox
		bind:value={$opts.disableDragNDropComponents}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label=" Disable Drag & Drop Components from the Stage"
	/>
	<Checkbox
		bind:value={$opts.disableDragNDropComponentSelection}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Disable Drag & Drop Components from Component Selection"
	/>
	<Checkbox
		bind:value={$opts.disableDragNDropTabs}
		id={`${LibraryPrefix}-settings-${nanoid(10)}`}
		{fontSize}
		label="Disable Drag & Drop Tabs"
	/>

	<SelectSlot>
		{@const selectID = `${LibraryPrefix}-theme-${nanoid(10)}`}
		<Label forName={selectID} label="Theme" />
		<select
			style:width={'200px'}
			id={selectID}
			bind:value={selectedTheme}
			on:change={() => ($opts.styling = ThemeMap[selectedTheme])}
		>
			{#each Theme as theme}
				<option value={theme}>{theme}</option>
			{/each}
		</select>
	</SelectSlot>
</div>

<style>
	div {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		color: black;
	}
</style>
