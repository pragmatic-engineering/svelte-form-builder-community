<script lang="ts">
	import { opts } from '$lib/Utils/store';
	import Label from '$lib/Form/PropertyPanel/PropertyPanelUtilities/Label.svelte';
	import TextSlot from '$lib/Form/PropertyPanel/PropertyPanelUtilities/TextSlot.svelte';
	import type { Field } from '$lib/Utils/types';

	export let guid: string;
	export let field: Field;
</script>

{#if field.labelAttributes}
	<TextSlot>
		<Label forName={`${guid}.label`} label={'Label'} />
		<div
			contenteditable="true"
			type="text"
			id={`${guid}.label`}
			bind:textContent={field.labelAttributes.label}
		/>
	</TextSlot>

	{#if $opts.showLabelMaxWidth}
		<TextSlot>
			<Label forName={`${guid}.labelMaxWidth`} label={'Label Max Width'} />
			<input
				type="text"
				id={`${guid}.labelMaxWidth`}
				bind:value={field.labelAttributes.maxWidth}
				title="A CSS Value"
			/>
		</TextSlot>
	{/if}

	{#if $opts.showLabelStyle}
		<TextSlot>
			<Label forName={`${guid}.labelStyle`} label={'Label Style'} />
			<input
				type="text"
				id={`${guid}.labelStyle`}
				bind:value={field.labelAttributes.style}
				title="CSS Style"
			/>
		</TextSlot>
	{/if}
{/if}
