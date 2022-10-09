<!-- https://github.com/ErnaneJ/svelte-star-rating -->
<script lang="ts">
	import StarRating from '@ernane/svelte-star-rating';

	import type { Field, FormTab, ComponentOptions, ValidationResult } from '$lib/Utils/types';
	import GroupSlot from '$lib/Utils/ComponentUtilities/GroupSlot.svelte';
	import ComponentLabel from '$lib/Utils/ComponentUtilities/ComponentLabel.svelte';

	import { getErrorMessage_Required } from '$lib/lib/Validation';

	export let field: Field;
	export let componentOptions: ComponentOptions;
	export let tab: FormTab;

	interface StarConfig {
		readOnly?: boolean | undefined | null;
		countStars: number;
		range: {
			min?: number;
			max?: number;
			step?: number;
		};
		score: number;
		showScore?: boolean;
		starConfig: {
			size?: number;
			fillColor?: string;
			strokeColor?: string;
		};
	}

	let config: StarConfig = {
		starConfig: {},
		range: {},
		score: 0,
		countStars: 5
	};

	$: config.showScore = field.dataAttributes?.find((x) => x.name == 'showScore')?.value;
	$: config.readOnly = field.htmlAttributes.readonly || field.htmlAttributes.disabled;
	$: config.countStars = field.dataAttributes?.find((x) => x.name == 'countStars')?.value;

	$: config.range.min = 0;
	$: config.range.max = config.countStars;
	$: config.range.step = field.dataAttributes?.find((x) => x.name == 'ratingStep')?.value;

	config.starConfig = {};
	$: config.starConfig.size = field.dataAttributes?.find((x) => x.name == 'size')?.value;
	$: config.starConfig.fillColor = field.dataAttributes?.find((x) => x.name == 'fillColor')?.value;
	$: config.starConfig.strokeColor = field.dataAttributes?.find(
		(x) => x.name == 'strokeColor'
	)?.value;

	$: {
		//Set defaults if not set
		if (!config.range.step) {
			config.range.step = 0.5;
		}
		if (!config.range.min) {
			config.range.min = 0;
		}

		if (!config.range.max) {
			config.range.max = 5;
		}

		if (!field.dataAttributes?.find((x) => x.name == 'countStars')?.value) {
			config.countStars = 5;
		}

		if (!field.dataAttributes?.find((x) => x.name == 'showScore')?.value) {
			config.showScore = false;
		}

		if (!field.dataAttributes?.find((x) => x.name == 'size')?.value) {
			config.starConfig.size = 30;
		}

		if (!field.dataAttributes?.find((x) => x.name == 'fillColor')?.value) {
			config.starConfig.fillColor = '#F9ED4F';
		}
		if (!field.dataAttributes?.find((x) => x.name == 'strokeColor')?.value) {
			config.starConfig.strokeColor = 'black';
		}
	}

	export function customUserInputSerialization() {
		return { numStars: config.score, percentage: (config.score / config.countStars) * 100 };
	}

	export function validateUserInput(): ValidationResult {
		field.htmlAttributes.value = customUserInputSerialization();

		if (field.htmlAttributes?.required && !field.htmlAttributes.value.numStars) {
			return { field: field, errors: [getErrorMessage_Required({ field })] };
		}
	}
</script>

<GroupSlot>
	<ComponentLabel {field} />

	<div on:pointerleave on:pointerenter>
		{#if config}
			<StarRating bind:config />
		{/if}
	</div>
</GroupSlot>
