<script lang="ts">
	import { nanoid } from 'nanoid';
	import CheckboxRadioCommon from '$lib/Utils/ComponentUtilities/CheckboxRadioCommon.svelte';
	import { LibraryPrefix } from '$lib/Utils/Utils';
	import { ChoiceColorStyle, ChoiceSwitchStyle, type Field } from '$lib/Utils/types';
	import SelectSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/SelectSlot.svelte';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import Checkbox from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Checkbox.svelte';

	export let field: Field;
	let styleID = `${LibraryPrefix}-${nanoid(10)}`;
	let animationID = `${LibraryPrefix}-${nanoid(10)}`;
	let switchStyleID = `${LibraryPrefix}-${nanoid(10)}`;
	let solidColorID = `${LibraryPrefix}-${nanoid(10)}`;

	$: {
		if (field.choiceConfiguration) {
			if (field.choiceConfiguration?.isSwitch) {
				field.choiceConfiguration.checkIcon = false;
			} else {
				field.choiceConfiguration.switchStyle = undefined;
			}

			if (field.choiceConfiguration) {
				if (field.choiceConfiguration?.checkIcon) {
					field.choiceConfiguration.svg = true;
					field.choiceConfiguration.isSwitch = false;

					if (field.choiceConfiguration.fillStyle == 'thick') {
						field.choiceConfiguration.fillStyle = undefined;
					}
				} else {
					field.choiceConfiguration.svg = false;
				}
			}
		}
	}

	let exampleID = `${LibraryPrefix}-${nanoid(10)}`;
</script>

{#if field.choiceConfiguration}
	<div class="center">
		{#key field.choiceConfiguration}
			<CheckboxRadioCommon {field} label={'Styled Example'} id={exampleID}>
				<input type="checkbox" checked id={exampleID} />
			</CheckboxRadioCommon>
		{/key}
	</div>

	{#if field.componentName == 'Checkbox Group' && !field.choiceConfiguration?.isSwitch}
		<div>
			<Checkbox
				bind:value={field.choiceConfiguration.checkIcon}
				id={`${LibraryPrefix}-${nanoid(10)}`}
				label="Check Icon"
			/>
		</div>
	{/if}

	{#if !field.choiceConfiguration?.checkIcon}
		<div>
			<Checkbox
				bind:value={field.choiceConfiguration.isSwitch}
				id={`${LibraryPrefix}-${nanoid(10)}`}
				label="Toggle"
			/>
		</div>
	{/if}

	{#if field.componentName != 'Matrix'}
		<div>
			<Checkbox
				bind:value={field.choiceConfiguration.inline}
				id={`${LibraryPrefix}-${nanoid(10)}`}
				label="Inline"
			/>
		</div>
	{/if}

	{#if field.choiceConfiguration.isSwitch && !field.choiceConfiguration?.checkIcon}
		<SelectSlot>
			<Label forName={switchStyleID} label="Switch Style" />
			<select id={switchStyleID} bind:value={field.choiceConfiguration.switchStyle}>
				<option value="" />

				{#each ChoiceSwitchStyle as x}
					<option value={x}>{x}</option>
				{/each}
			</select>
		</SelectSlot>
	{/if}

	<SelectSlot>
		<Label forName={solidColorID} label="Solid Color" />
		<select id={solidColorID} bind:value={field.choiceConfiguration.solidColor}>
			<option value="">default</option>

			{#each ChoiceColorStyle as x}
				<option value={x}>{x} </option>
			{/each}
		</select>
	</SelectSlot>

	<SelectSlot>
		<Label forName={styleID} label="Fill Style" />

		<select id={styleID} bind:value={field.choiceConfiguration.fillStyle}>
			<option value="" />

			<option value="fill">fill</option>

			<!-- Thick doesn't look good with checkIcon -->
			{#if !field.choiceConfiguration.checkIcon}
				<option value="thick">thick</option>
			{/if}
		</select>
	</SelectSlot>

	<SelectSlot>
		<Label forName={animationID} label="Animation" />
		<select id={animationID} bind:value={field.choiceConfiguration.animation}>
			<option value="" />

			<option value="smooth">smooth</option>
			<option value="pulse">pulse</option>

			{#if field.choiceConfiguration.svg || field.choiceConfiguration.isSwitch}
				<option value="tada">tada</option>
				<option value="jelly">jelly</option>
				<option value="rotate">rotate</option>
			{/if}
		</select>
	</SelectSlot>
{/if}

<style>
	.center {
		margin: auto;
		width: 50%;
		padding: 10px;
		background-color: var(--svelte-fb-root-dropdown-background-color);
		color: var(--svelte-fb-root-color);
		border-radius: 4px;
		margin-bottom: 10px;
	}
</style>
