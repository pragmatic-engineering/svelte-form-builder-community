<script lang="ts">
	import type { Field } from '$lib/Utils/types';
	import Icon from '$lib/Utils/MiscComponents/Icon.svelte';

	export let field: Field;
	export let label: string | undefined;
	export let id: string;

	let fontSize = '16px';
</script>

{#if field.choiceConfiguration}
	<div
		class:pretty={true}
		class:p-svg={field.choiceConfiguration.svg}
		class:p-default={!field.choiceConfiguration.svg && !field.choiceConfiguration.isSwitch}
		class:p-fill={field.choiceConfiguration.fillStyle == 'fill' ||
			field.choiceConfiguration.switchStyle == 'fill'}
		class:p-thick={field.choiceConfiguration.fillStyle == 'thick'}
		class:p-switch={field.choiceConfiguration.isSwitch}
		class:p-outline={field.choiceConfiguration.switchStyle == 'outline'}
		class:p-slim={field.choiceConfiguration.switchStyle == 'slim'}
		class:p-smooth={field.choiceConfiguration.animation == 'smooth'}
		class:p-pulse={field.choiceConfiguration.animation == 'pulse'}
		class:p-tada={field.choiceConfiguration.animation == 'tada'}
		class:p-jelly={field.choiceConfiguration.animation == 'jelly'}
		class:p-rotate={field.choiceConfiguration.animation == 'rotate'}
		class:p-square={field.choiceConfiguration.shape == 'square'}
		class:p-curve={field.choiceConfiguration.shape == 'curve'}
		class:p-round={field.choiceConfiguration.shape == 'round'}
	>
		<!-- Insert the checkbox/radio element -->
		<slot />

		<div
			class:p-primary={field.choiceConfiguration.solidColor == 'primary'}
			class:p-success={field.choiceConfiguration.solidColor == 'success'}
			class:p-warning={field.choiceConfiguration.solidColor == 'warning'}
			class:p-info={field.choiceConfiguration.solidColor == 'info'}
			class:p-danger={field.choiceConfiguration.solidColor == 'danger'}
			class:state={true}
		>
			{#if field.choiceConfiguration.checkIcon == undefined || field.choiceConfiguration.checkIcon == true}
				<div style:font-size={fontSize}>
					<Icon type="SquareCheck" />
				</div>
			{/if}

			<label style:font-size={fontSize} for={id}>{label}</label>
		</div>
	</div>
{/if}

<style>
	.pretty {
		margin-bottom: 10px;
	}
	.pretty:nth-child(1) {
		margin-top: 10px;
	}

	.pretty:hover label::after {
		background-color: #ccc !important;
	}
</style>
