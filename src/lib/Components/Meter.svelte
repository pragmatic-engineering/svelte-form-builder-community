<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '#lib/Utils/types';
	import { convertDataAttributes } from '#lib/Utils/Utils';
	import ComponentLabel from '#lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '#lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import { conditionManager } from '#lib/Utils/store';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
	void field;
	void componentOptions;
	void tab;

	$: meterValue = Number(field?.htmlAttributes?.value);
	$: meterMin = Number(field?.htmlAttributes?.min);
	$: meterMax = Number(field?.htmlAttributes?.max);
	$: meterLow = Number(field?.htmlAttributes?.low);
	$: meterHigh = Number(field?.htmlAttributes?.high);
	$: meterOptimum = Number(field?.htmlAttributes?.optimum);
	$: meterAttributes = (() => {
		const {
			value: _value,
			min: _min,
			max: _max,
			low: _low,
			high: _high,
			optimum: _optimum,
			...attrs
		} = {
			...(field?.htmlAttributes ?? {})
		};
		return attrs;
	})();
</script>

<GroupSlot bind:field>
	<ComponentLabel {field} />

	<meter
		{...meterAttributes}
		value={Number.isFinite(meterValue) ? meterValue : undefined}
		min={Number.isFinite(meterMin) ? meterMin : undefined}
		max={Number.isFinite(meterMax) ? meterMax : undefined}
		low={Number.isFinite(meterLow) ? meterLow : undefined}
		high={Number.isFinite(meterHigh) ? meterHigh : undefined}
		optimum={Number.isFinite(meterOptimum) ? meterOptimum : undefined}
		{...convertDataAttributes(field.dataAttributes)}
		on:invalid
		on:pointerleave
		on:pointerenter
		on:change={componentOptions?.events?.onchange}
		on:input={componentOptions?.events?.oninput}
		on:blur={(e) => $conditionManager.EvaluateFieldValue(e, field)}
		on:blur={componentOptions?.events?.onblur}
		on:focus={componentOptions?.events?.onfocus}
	></meter>
</GroupSlot>
