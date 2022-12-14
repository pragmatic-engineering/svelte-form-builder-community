<script lang="ts">
	import type { Field, FormTab, ComponentOptions } from '$lib/Utils/types';
	import { convertDataAttributes } from '$lib/Utils/Utils';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;
</script>

<GroupSlot bind:field>
	<ComponentLabel {field} />

	<a
		{...field.htmlAttributes}
		{...convertDataAttributes(field.dataAttributes)}
		href={field.htmlAttributes.href}
		target={field.dataAttributes?.find((x) => x.name == 'target')?.value}
		on:pointerleave
		on:pointerenter
		on:click={componentOptions?.events?.onclick}
		>{field.htmlAttributes.name}
	</a>
</GroupSlot>
