<script lang="ts">
	import type { ComponentOptions, Field } from '$lib/Utils/types';
	import { convertDataAttributes, CScope } from '$lib/Utils/Utils';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';

	import { conditionManager, view } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;

	//Completely hide the parent container as well
	function init(e: HTMLElement) {
		const parentContainer = e.closest(CScope('container')) as HTMLDivElement;
		if (parentContainer) {
			parentContainer.style.display = 'none';
		}
	}
</script>

<GroupSlot bind:field>
	{#if $view == 'build'}
		<ComponentLabel {field} />

		<input
			{...field.htmlAttributes}
			{...convertDataAttributes(field.dataAttributes)}
			type="text"
			on:pointerleave
			on:pointerenter
			bind:value={field.htmlAttributes.value}
			on:change={(e) => $conditionManager.EvaluateFieldValue(e, field)}
			on:change={componentOptions?.events?.onchange}
			on:input={componentOptions?.events?.oninput}
			on:blur={componentOptions?.events?.onblur}
			on:focus={componentOptions?.events?.onfocus}
			on:keyup={componentOptions?.events?.onkeyup}
			on:keydown={componentOptions?.events?.onkeydown}
			on:invalid={componentOptions?.events?.oninvalid}
		/>
	{:else}
		<input
			{...field.htmlAttributes}
			{...convertDataAttributes(field.dataAttributes)}
			type="hidden"
			use:init
			bind:value={field.htmlAttributes.value}
			on:change={(e) => $conditionManager.EvaluateFieldValue(e, field)}
			on:change={componentOptions?.events?.onchange}
			on:input={componentOptions?.events?.oninput}
			on:blur={componentOptions?.events?.onblur}
			on:focus={componentOptions?.events?.onfocus}
			on:keyup={componentOptions?.events?.onkeyup}
			on:keydown={componentOptions?.events?.onkeydown}
			on:invalid={componentOptions?.events?.oninvalid}
		/>
	{/if}
</GroupSlot>
