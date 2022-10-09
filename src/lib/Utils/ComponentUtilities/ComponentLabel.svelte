<script lang="ts">
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import { opts } from '$lib/Utils/store';
	import type { Field } from '$lib/Utils/types';

	export let field: Field;
</script>

{#if field.labelAttributes}
	<span>
		<label
			for={field.htmlAttributes.id}
			class:required={field.htmlAttributes?.required}
			style:max-width={field.labelAttributes.maxWidth}
			style={field.labelAttributes.style}
		>
			{#if $opts.allowHtmlLabels}
				{@html field.labelAttributes.label}
			{:else}
				{field.labelAttributes.label}
			{/if}
		</label>
		{#if field.tooltipAttributes?.text}
			<!-- Svelte @html doesn't work applying to attributes yet so tooltip has that limitation right now https://github.com/sveltejs/svelte/issues/4302 -->
			<span
				class="tooltip"
				aria-label={field.tooltipAttributes.text}
				data-balloon-length={field.tooltipAttributes.size ?? 'large'}
				data-balloon-pos={field.tooltipAttributes.position ?? 'right'}
				><Icon type="InfoCircle" /></span
			>
		{/if}
	</span>
{/if}

<style>
	.tooltip {
		margin-left: 10px;
		--balloon-font-size: 14px;
	}
</style>
