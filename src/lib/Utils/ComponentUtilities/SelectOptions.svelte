<script lang="ts">
	import type { Field } from '#lib/Utils/types';

	export let field: Field;
	void field;
</script>

{#if field.choiceConfiguration?.initialBlankChoice}
	<option value=""></option>
{/if}

{#if field.choiceConfiguration && field.choiceConfiguration.choices}
	{#each field.choiceConfiguration.choices as choice}
		{#if choice.label}
			<option value={choice.value}>{choice.label}</option>
		{/if}
	{/each}
{/if}
