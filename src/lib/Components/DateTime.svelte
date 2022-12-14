<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import { conditionManager } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
</script>

<GroupSlot>
	<ComponentLabel {field} />

	<input
		{...field.htmlAttributes}
		{...convertDataAttributes(field.dataAttributes)}
		type="datetime-local"
		bind:value={field.htmlAttributes.value}
		on:pointerleave
		on:pointerenter
		on:invalid
		on:change={componentOptions?.events?.onchange}
		on:input={componentOptions?.events?.oninput}
		on:blur={(e) => $conditionManager.EvaluateFieldValue(e, field)}
		on:blur={componentOptions?.events?.onblur}
		on:focus={componentOptions?.events?.onfocus}
		on:keyup={componentOptions?.events?.onkeyup}
		on:keydown={componentOptions?.events?.onkeydown}
		on:invalid={componentOptions?.events?.oninvalid}
	/>
</GroupSlot>
