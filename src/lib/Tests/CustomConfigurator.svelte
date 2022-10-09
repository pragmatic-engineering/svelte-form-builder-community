<script lang="ts" context="module">
	interface CustomDataModel {
		name: string;
		value?: string;
	}
</script>

<script lang="ts">
	import type { CustomDataAttribute } from '$lib/Utils/types';

	export let self: any = '';
	export let dataAttribute: CustomDataAttribute;
	let model: CustomDataModel = {
		name: 'X'
	};

	if (dataAttribute.value) {
		model = JSON.parse(dataAttribute.value);
	}

	$: {
		dataAttribute.value = JSON.stringify(model);
	}
</script>

<h2>Configure something custom...</h2>

<input bind:value={model.value} />

<div>
	{dataAttribute.value}
</div>

<br />

<button on:click={self && self.$destroy()}>Save</button>
