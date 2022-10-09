<script context="module" lang="ts">
	export const componentName = 'Pretty Checkbox';
</script>

<script lang="ts">
	import type { Field } from '$lib/Utils/types';
	export let field: Field;
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css" /> -->
</svelte:head>
<!-- primary -->
<div class="pretty p-default">
	<input type="checkbox" />
	<div class="state p-primary">
		<label>Primary</label>
	</div>
</div>

<!-- success -->
<div class="pretty p-default">
	<input type="checkbox" />
	<div class="state p-success">
		<label>Success</label>
	</div>
</div>

<!-- info -->
<div class="pretty p-default">
	<input type="checkbox" />
	<div class="state p-info">
		<label>Info</label>
	</div>
</div>

<!-- warning -->
<div class="pretty p-default">
	<input type="checkbox" />
	<div class="state p-warning">
		<label>Warning</label>
	</div>
</div>

<!-- danger -->
<div class="pretty p-default">
	<input type="checkbox" />
	<div class="state p-danger">
		<label>Danger</label>
	</div>
</div>
