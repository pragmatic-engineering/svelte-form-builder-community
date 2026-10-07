<script context="module" lang="ts">
	export const requiredColumn = '<i class="required"></i>';
	export function cleanColumnTitle(column: ColumnDefinition) {
		return column.title.split(requiredColumn)[0].trim();
	}
</script>

<script lang="ts">
	import { nanoid } from 'nanoid';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import SelectSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/SelectSlot.svelte';
	import type { TableFBComponent } from '$lib/Utils/types';
	import type { Field } from '$lib/Utils/types';
	import { DefinitionManager } from '$lib/lib/DefinitionManager';
	import type {
		ColumnComponent,
		ColumnDefinition,
		Editor,
		Formatter,
		StandardValidatorType
	} from 'tabulator-tables';
	import { onMount } from 'svelte';
	import DisplayContentsWrapper from '$lib/Utils/MiscComponents/DisplayContentsWrapper.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import Checkbox from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Checkbox.svelte';
	import MoneyFormatter from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/Table/Formatters/MoneyFormatter.svelte';
	import ImageFormatter from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/Table/Formatters/ImageFormatter.svelte';
	import StarFormatter from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/Table/Formatters/StarFormatter.svelte';
	import InputEditor from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/Table/Editors/InputEditor.svelte';
	import ListEditor from '$lib/Form/PropertyPanel/PropertyPanelComponentSpecific/Table/Editors/ListEditor.svelte';
	import { RemoveAlphaNumeric } from '$lib/Utils/Utils';

	export let field: Field;

	// let table: TabulatorFull;
	let column: ColumnComponent;
	let title: string;
	let fieldName: string | undefined;
	let editor: Editor | undefined;
	let formatter: Formatter | undefined;
	let isRequired: boolean;
	let isReadOnly: boolean;
	let cssClass: string | undefined;

	let columnDefinition: ColumnDefinition;
	let validator: StandardValidatorType[] = [];
	let fieldInstance: TableFBComponent;
	let formatterParams = {};
	let editorParams = {};

	onMount(() => {
		fieldInstance = DefinitionManager.getFieldInstance(field) as TableFBComponent;
		// table = fieldInstance.getTable();
		column = fieldInstance.getSelectedColumn();

		if (column) {
			columnDefinition = column.getDefinition();

			editor = columnDefinition.editor;
			editorParams = columnDefinition.editorParams ?? {};
			formatter = columnDefinition.formatter;
			formatterParams = columnDefinition.formatterParams ?? {};

			title = cleanColumnTitle(columnDefinition);
			fieldName = columnDefinition.field;
			cssClass = columnDefinition.cssClass;

			if (columnDefinition.validator) {
				isRequired = (columnDefinition.validator as StandardValidatorType[]).includes('required');
			}

			if (columnDefinition.editable) {
				isReadOnly = false;
			}
		}
	});

	$: requiredTitle = `${title} ${requiredColumn}`;

	$: {
		if (
			title ||
			fieldName ||
			editor ||
			formatter ||
			// editorParams ||
			// formatterParams ||
			isRequired != undefined ||
			isReadOnly != undefined ||
			cssClass
		) {
			updateDefinition();
		}
	}

	async function updateDefinition() {
		if (!column) {
			return;
		}

		if (isRequired) {
			if (!validator.includes('required')) {
				validator.push('required');
			}
		} else {
			validator = validator.filter((x) => x != 'required');
		}

		column = await column.updateDefinition({
			title: title,
			field: RemoveAlphaNumeric(fieldName),
			editor: editor,
			formatter: formatter,
			formatterParams: formatterParams,
			editorParams: editorParams,
			validator: validator,
			editable: !isReadOnly,
			cssClass: cssClass
		});

		if (isRequired) {
			column = await column.updateDefinition({
				title: requiredTitle
			});
		}
	}

	$: {
		//Keep the instance updated with the latest column object every time it changes
		fieldInstance && fieldInstance.setSelectedColumn(column);
	}

	$: {
		//Clear out previous formatter settings when editor changes
		if (editor) {
			formatterParams = {};
			editorParams = {};
			formatter = undefined;
		}

		if (editor == 'tickCross') {
			formatter = 'tickCross';
		} else if (editor == 'star') {
			formatter = 'star';
		}
	}

	let titleID = nanoid(8);
	let fieldNameID = nanoid(8);
	let editorID = nanoid(8);
	let formatterID = nanoid(8);
	let cssClassID = nanoid(8);
</script>

<TextSlot>
	<Label forName={titleID} label={'Column Title'} />
	<input type="text" id={titleID} bind:value={title} />
</TextSlot>

<TextSlot>
	<Label forName={fieldNameID} label={'Name'} />
	<input type="text" id={fieldNameID} bind:value={fieldName} />
</TextSlot>

<div class="checkboxes">
	<Checkbox
		bind:value={isRequired}
		id={nanoid(8)}
		label={'Required'}
		marginTop="10px"
		marginLeft="4px"
	/>

	<Checkbox
		bind:value={isReadOnly}
		id={nanoid(8)}
		label={'Read Only'}
		marginTop="10px"
		marginLeft="4px"
	/>
</div>

<TextSlot>
	<Label forName={cssClassID} label={'Class'} />
	<input type="text" id={cssClassID} bind:value={cssClass} />
</TextSlot>

<!-- Editor Dropdown -->
<SelectSlot>
	<Label forName={editorID} label="Editor" />
	<select id={editorID} bind:value={editor}>
		<option value="input">Input</option>
		<!-- https://github.com/olifolkerd/tabulator/issues/3956 <option value="textarea">Text Area</option> -->
		<option value="number">Number</option>
		<option value="tickCross">Checkbox</option>
		<option value="star">Star Rating</option>
		<option value="date">Date</option>
		<option value="list">List</option>
	</select>
</SelectSlot>

<!-- Additional Specific Editor Params -->
{#if editor == 'input' && formatter == 'plaintext'}
	<InputEditor bind:editorParams />
{/if}

<!-- Input Formatters-->
<DisplayContentsWrapper showIf={editor == 'input'}>
	<SelectSlot>
		<Label forName={formatterID} label="Formatter" />
		<select id={formatterID} bind:value={formatter}>
			<option value="plaintext">Plain Text</option>
			<option value="html">HTML</option>
			<option value="money">Money</option>
			<option value="link">Link</option>
			<option value="image">Image</option>
			<option value="color">Color</option>
			<option value="rownum">Row Number</option>
		</select>
	</SelectSlot>
</DisplayContentsWrapper>

<!-- Additional Specific Formatter Params -->
{#if formatter == 'money'}
	<MoneyFormatter bind:formatterParams />
{:else if formatter == 'image'}
	<ImageFormatter bind:formatterParams />
{:else if formatter == 'star'}
	<StarFormatter bind:formatterParams />
{/if}

{#if editor == 'list'}
	<ListEditor bind:editorParams bind:field />
{/if}

<style>
	.checkboxes {
		display: flex;
		flex-direction: column;
	}
</style>
