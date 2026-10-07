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

	<picture
		{...field.htmlAttributes}
		{...convertDataAttributes(field.dataAttributes)}
		on:pointerleave
		on:pointerenter
	>
		<source srcset={field.htmlAttributes.srcset} media={field.htmlAttributes.media} />
		<img srcset={field.htmlAttributes.srcset} alt="" />
	</picture></GroupSlot
>
