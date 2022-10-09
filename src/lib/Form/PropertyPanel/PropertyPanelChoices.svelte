<script lang="ts">
	import { nanoid } from 'nanoid';
	import Checkbox from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Checkbox.svelte';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import { opts } from '$lib/Utils/store';
	import type { ChoiceConfiguration, ChoiceElement, Field } from '$lib/Utils/types';
	import { LibraryPrefix } from '$lib/Utils/Utils';
	import { onMount } from 'svelte';

	export let field: Field;
	export let choiceConfiguration: ChoiceConfiguration | undefined;
	export let customAttribute: any = undefined;

	let showBulkAdd = false;
	// let valueElements = [];
	// let labelElements = [];
	$: valueElements =
		choiceConfiguration?.choices && choiceConfiguration.choices.map((i) => i.valueElement);
	$: labelElements =
		choiceConfiguration?.choices && choiceConfiguration.choices.map((i) => i.labelElement);

	// $: {
	//   console.log(valueElements, labelElements);
	// }

	function addChoice(choice?: ChoiceElement) {
		if (!choiceConfiguration?.choices && choiceConfiguration) {
			choiceConfiguration.choices = [];
		}
		if (choiceConfiguration?.choices) {
			choiceConfiguration.choices = [...choiceConfiguration?.choices, choice ?? getNewChoice()];
		}
	}

	function getNewChoice(): ChoiceElement {
		let choice: ChoiceElement = {};

		if ($opts.builderAPIEvents?.onAddChoice) {
			$opts.builderAPIEvents?.onAddChoice?.call(
				undefined,
				{ choice, choiceConfiguration, customAttribute },
				field
			);
		}

		return choice;
	}

	function deleteChoice(choice: ChoiceElement) {
		if (choiceConfiguration) {
			choiceConfiguration.choices = choiceConfiguration.choices?.filter((x) => x != choice);
		}
	}

	//Don't allow tabbing when label is empty
	function onKeyDownLabel(e: KeyboardEvent) {
		if (e.key != 'Tab') {
			return;
		}

		if (e.currentTarget && !(e.currentTarget as HTMLInputElement).value) {
			e.preventDefault();
		}
	}

	//If the value input has a value and the user is hitting tab in the last value input, go ahead and create a new choice
	function onKeyDownValue(e: KeyboardEvent) {
		if (e.key != 'Tab') {
			return;
		}

		const lastValueElement = valueElements[valueElements.length - 1];
		if (lastValueElement && !lastValueElement.value) {
			e.preventDefault();
		}

		if (
			lastValueElement &&
			lastValueElement.value &&
			valueElements[valueElements.length - 1] == e.currentTarget
		) {
			addChoice();
			setTimeout(() => {
				labelElements[labelElements.length - 1].focus();
			}, 0);
		}
	}

	let bulkAddTextArea: HTMLTextAreaElement;
	function doBulkAdd() {
		var lines = bulkAddTextArea.value.split('\n');
		for (var i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line) {
				const split = line.split('|');
				const choice: ChoiceElement = {};
				if (split[0]) {
					choice.label = split[0];
					choice.value = split[0];
				}
				if (split[1]) {
					choice.value = split[1];
				}
				addChoice(choice);
			}
		}

		bulkAddTextArea.value = '';
		showBulkAdd = false;
	}

	onMount(() => {
		if (!choiceConfiguration) {
			choiceConfiguration = { choices: [] };
		}
	});
</script>

{#if choiceConfiguration && field.componentName == 'Select'}
	<Checkbox
		bind:value={choiceConfiguration.initialBlankChoice}
		id={`${LibraryPrefix}-${nanoid(10)}`}
		label="Initial Blank Value"
	/>
{/if}

{#if choiceConfiguration && (field.componentName == 'Checkbox Group' || field.componentName == 'Radio Group')}
	<Checkbox
		bind:value={choiceConfiguration.enableOther}
		id={`${LibraryPrefix}-${nanoid(10)}`}
		label="Enable 'Other'"
	/>
{/if}

{#if choiceConfiguration && (field.componentName == 'AutoComplete' || field.componentName == 'Table')}
	<Checkbox
		bind:value={choiceConfiguration.enableOther}
		id={`${LibraryPrefix}-${nanoid(10)}`}
		label="Allow Other Choices"
	/>
{/if}

<div class="choices-content">
	<span />
	<b>Label</b>
	<b>Value</b>

	{#if choiceConfiguration && choiceConfiguration.choices}
		{#each choiceConfiguration.choices as choice, i}
			<span class="delete" on:click={() => deleteChoice(choice)}
				><Icon type="Delete" fill="red" size="18" /></span
			>
			<input
				type="text"
				bind:this={choice.labelElement}
				bind:value={choice.label}
				on:keydown={(e) => onKeyDownLabel(e)}
			/>
			<input
				type="text"
				bind:this={choice.valueElement}
				bind:value={choice.value}
				on:keydown={(e) => onKeyDownValue(e)}
			/>
		{/each}
	{/if}

	<span />
	<b>
		<div class="button-container" on:click={() => addChoice()}>
			<span class="button-wrap tool-button">
				<span>Add</span>
				<Icon size="20px" type="CirclePlus" />
			</span>
		</div>
	</b>
	<span />
</div>

<hr />

<div class="choice-tools">
	<button class="tool-button" on:click={() => (showBulkAdd = true)}>Bulk Add</button>
	<button
		class="tool-button"
		on:click={() => {
			if (choiceConfiguration) {
				choiceConfiguration.choices = undefined;
			}
			// https://github.com/sveltejs/svelte/issues/7850
			// setTimeout(() => {
			//   valueElements = [];
			//   labelElements = [];
			// }, 0);
		}}>Clear All</button
	>
</div>

{#if showBulkAdd}
	<ul>
		<li>Paste a list of items</li>
		<li>Optionally use | to split Label|Value</li>
	</ul>

	<div>
		<textarea bind:this={bulkAddTextArea} class="bulk-add-textarea" rows="20" />
		<button on:click={doBulkAdd}>Save</button>
	</div>
{/if}

<style>
	.bulk-add-textarea {
		width: 98%;
	}
	.delete {
		justify-self: center;
	}

	.choice-tools {
		display: flex;
		justify-content: space-evenly;
	}

	.choices-content {
		display: grid;
		grid-template-columns: 4% 50% 42%;
		gap: 7px;
	}

	.button-container {
		display: flex;
		padding: 4px;
	}
	.button-wrap {
		display: flex;
		gap: 4px;
	}

	.tool-button {
		border: 1px solid rgb(165, 163, 163) !important;
	}
</style>
