<script lang="ts">
	import ComponentSelection from '$lib/ComponentSelection/ComponentSelection.svelte';
	import { componentSelectionPoppedOut } from '$lib/Utils/store';
</script>

{#if !$componentSelectionPoppedOut}
	<div>
		<ComponentSelection />
	</div>
{/if}
