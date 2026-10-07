<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	import { convertDataAttributes } from '$lib/Utils/Utils';
	import { conditionManager } from '$lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	$: progressAttributes = (() => {
		const value = Number(field?.htmlAttributes?.value);
		const attrs = { ...(field?.htmlAttributes ?? {}) };
		if (!Number.isFinite(value)) {
			delete attrs.value;
		}
		return attrs;
	})();
</script>

<GroupSlot bind:field>
	<ComponentLabel {field} />

	<progress
		{...progressAttributes}
		{...convertDataAttributes(field.dataAttributes)}
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
	/>
</GroupSlot>
