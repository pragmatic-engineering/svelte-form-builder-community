<script lang="ts">
	import type { Field, FormDefinition, FormTab } from '$lib/Utils/types';
	import {
		isDraggingStore,
		dropTargetRowIndexStore,
		isPointerOverFieldStore,
		focusedField,
		isComponentSelectionDragging,
		opts,
		view,
		componentInstances,
		isComponentDragging,
		rendering,
		formMounted
	} from '$lib/Utils/store';
	import LeftRightDropTarget from '$lib/Form/DragNDrop/LeftRight.svelte';
	import TopBottomDropTarget from '$lib/Form/DragNDrop/TopBottom.svelte';
	import { fade } from 'svelte/transition';
	import { DragNDrop } from '$lib/Form/DragNDrop/DragNDrop';
	import FieldQuickMenu from '$lib/Form/QuickMenu/QuickMenu.svelte';
	import { QuickMenuUtils } from '$lib/Form/QuickMenu/QuickMenuUtils';
	import { DefinitionManager } from '$lib/lib/DefinitionManager';
	import { CScope } from '$lib/Utils/Utils';
	import { onMount } from 'svelte';
	onMount(() => {
		if ($opts.builderAPIEvents?.onFormMounted) {
			$opts.builderAPIEvents?.onFormMounted.call(undefined, definition);
		}
		$formMounted = true;
	});

	export let definition: FormDefinition;
	$: tab = definition.tab as FormTab;
	$: rows = definition.rows;

	let DnD = new DragNDrop();
	$: isDragging = $isDraggingStore && $isComponentDragging;
	$: dropTargetRowIndex = $dropTargetRowIndexStore;

	$: isPointerOver = $isPointerOverFieldStore;
	$: pointerOverField = $focusedField;
	$: justifyContent = isDragging ? 'space-around' : '';

	//Make it so that during build, sync any value set as the default value.
	function syncDefaultValue(field: Field) {
		if ($view == 'build') {
			field.defaultValue = field.htmlAttributes.value;
		}
	}

	//Pair of functions to allow the user to highlight text inside the build controls without the annoyance of underlying DnD trying to take over and move it
	let pointerInsideComponent = false;
	function onPointerLeaveComponent(e: MouseEvent) {
		const container = (e.target as HTMLDivElement).getBoundingClientRect();
		//console.log(container);
		if (
			e.clientX > container.x &&
			e.clientX < container.width &&
			e.clientY > container.y &&
			e.clientY < container.height
		) {
			//Pointer is technically still in the component area
			return;
		}

		pointerInsideComponent = false;
	}

	function onPointerEnterComponent() {
		pointerInsideComponent = true;
	}
</script>

{#if $view == 'build' || $rendering}
	<div in:fade style="flex-grow: 2;">
		{#if rows.length > 0}
			{#each [...rows] as row, rowIndex}
				<!-- Top Dropzone -->
				{#if DnD.showTopBottomDropzone(isDragging, dropTargetRowIndex, rowIndex, $isComponentSelectionDragging)}
					<TopBottomDropTarget on:drop={(e) => DnD.dropToNewRow(e, rowIndex)} />
				{/if}

				<div class={CScope('container')}>
					<div
						class={CScope('row')}
						id={row.rowID.toString()}
						in:fade|local
						style:justify-content={justifyContent}
					>
						{#each row.fields as field, fieldIndex (field.htmlAttributes.id)}
							{@const componentImport = DefinitionManager.getFieldComponent(field)}
							{@const dummyConst = syncDefaultValue(field)}
							{#if componentImport}
								<!-- Left Dropzone -->
								{#if DnD.showLeftDropzone(isDragging, dropTargetRowIndex, rowIndex, row, fieldIndex, $isComponentSelectionDragging)}
									<LeftRightDropTarget
										on:drop={(e) => DnD.dropToExistingRow(e, rowIndex, fieldIndex)}
									/>
								{/if}

								<!-- Component Wrapper -->
								<div
									in:fade|local
									class="{CScope('control')} col"
									style:justify-content={justifyContent}
									draggable={$view == 'build' &&
										!$opts.disableDragNDropComponents &&
										!pointerInsideComponent}
									on:pointerover={(e) =>
										$view == 'build' && !$isDraggingStore && QuickMenuUtils.pointerOver(e, field)}
									on:pointerleave={(e) =>
										!pointerInsideComponent && QuickMenuUtils.pointerLeave(e, field)}
									on:dragstart={(e) =>
										$view == 'build' && DnD.componentDragStart(e, field, rowIndex, fieldIndex)}
									on:dragenter={(e) =>
										$view == 'build' && DnD.componentDragEnter(e, field, rowIndex)}
									on:dragover={(e) => $view == 'build' && DnD.componentDragOver(e, field)}
									on:dragend={(e) => $view == 'build' && DnD.componentDragEnd(e, field)}
								>
									<span class={CScope('component-wrap')}>
										<!-- Quick Menu -->
										<div class="quick-menu">
											{#if isPointerOver && pointerOverField == field}
												<FieldQuickMenu
													{field}
													{tab}
													componentOptions={componentImport.componentOptions}
												/>
											{/if}
										</div>

										<!-- Dynamic Component -->
										<svelte:component
											this={componentImport.component}
											componentOptions={componentImport.componentOptions}
											{tab}
											bind:field
											bind:this={$componentInstances[field.htmlAttributes.id]}
											on:pointerleave={onPointerLeaveComponent}
											on:pointerenter={onPointerEnterComponent}
										/>
									</span>
								</div>

								<!-- Right Dropzone -->
								{#if DnD.showRightDropzone(isDragging, dropTargetRowIndex, rowIndex, row, fieldIndex, $isComponentSelectionDragging)}
									<LeftRightDropTarget
										on:drop={(e) => DnD.dropToExistingRow(e, rowIndex, fieldIndex + 1)}
									/>
								{/if}
							{:else}
								<p>
									A Component with name <b>{field.componentName}</b> was not provided -- Check the
									imports provided in the <b>componentOptions</b> prop & case sensitivity of componentName
								</p>
							{/if}
						{/each}
					</div>
				</div>

				<!-- Bottom Dropzone -->
				{#if DnD.showTopBottomDropzone(isDragging, dropTargetRowIndex, rowIndex, $isComponentSelectionDragging)}
					<TopBottomDropTarget on:drop={(e) => DnD.dropToNewRow(e, rowIndex + 1)} />
				{/if}
			{/each}
		{:else if $view == 'build'}
			<TopBottomDropTarget
				on:drop={(e) => DnD.dropToNewRow(e, 0)}
				height="90%"
				text="Click or Drag a field to this area"
			/>
		{/if}
	</div>
{/if}

<style>
	.svelte-fb-row,
	.svelte-fb-control {
		display: flex;
		align-items: flex-end;
		flex-grow: 1;
		margin-bottom: 2px;
		padding: 2px;
		border-radius: 5px;

		/* flex-shrink: 0;
    flex-basis: 0%; */
	}

	.quick-menu {
		min-height: 0px;
		cursor: pointer;
		-moz-box-shadow: 0 0 3px #ccc;
		-webkit-box-shadow: 0 0 3px #ccc;
		box-shadow: 0 0 3px #ccc;
	}

	.svelte-fb-component-wrap {
		flex-grow: 1; /* Grow each wrapper to fit it's available space */
		line-height: 20px;
	}

	.svelte-fb-component-wrap :global(input) {
		font-size: 16px;
		line-height: 2rem;
	}
	@media only screen and (max-width: 500px) {
		.svelte-fb-row {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
