<script lang="ts">
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';
	import { opts } from '$lib/Utils/store';

	export let id: string;
	export let value: any;
	export let label: string;
	export let fontSize = '18px';
	export let marginTop = '';
	export let marginLeft = '';
</script>

<div class="pretty p-svg" style:margin-top={marginTop} style:margin-left={marginLeft}>
	<input type="checkbox" {id} bind:checked={value} />
	<div
		class="state p-primary"
		class:p-primary={$opts.styling?.checkboxColor == 'primary'}
		class:p-success={$opts.styling?.checkboxColor == 'success'}
		class:p-warning={$opts.styling?.checkboxColor == 'warning'}
		class:p-info={$opts.styling?.checkboxColor == 'info'}
		class:p-danger={$opts.styling?.checkboxColor == 'danger'}
	>
		<div style:font-size={fontSize}>
			<Icon type="SquareCheck" />
		</div>
		<label style:font-size={fontSize} for={id}>{label}</label>
	</div>
</div>

<style>
	.state {
		display: flex;
	}

	.pretty {
		margin-bottom: 10px;
	}

	label::before {
		background-color: #eee !important;
		border: 1px solid black !important;
	}
	.pretty:hover label::after {
		background-color: #ccc !important;
	}
</style>
