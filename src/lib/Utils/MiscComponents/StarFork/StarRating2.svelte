<script lang="ts">
	import type { StarsConfig } from '$lib/Components/Stars.svelte';
	import Star from './Star.svelte';
	export let config: StarsConfig = {
		readOnly: false,
		countStars: 5,
		range: { min: 0, max: 5, step: 0.001 },
		score: 0.0,
		showScore: true,
		starConfig: {
			size: 30,
			fillColor: '#F9ED4F',
			strokeColor: '#BB8511'
		}
	};
</script>

<section class="stars-container">
	<div class="range-stars">
		<div class="stars">
			{#each Array(config.countStars) as star, id}
				{#if parseInt(config.score) == id}
					<Star
						{id}
						readOnly={config.readOnly}
						starConfig={config.starConfig}
						fillPercentage={config.score - parseInt(config.score)}
					/>
				{:else if parseInt(config.score) > id}
					<Star {id} readOnly={config.readOnly} starConfig={config.starConfig} fillPercentage={1} />
				{:else}
					<Star {id} readOnly={config.readOnly} starConfig={config.starConfig} fillPercentage={0} />
				{/if}
			{/each}
		</div>

		<input
			class="slider"
			disabled={config.readOnly}
			type="range"
			min={config.range.min}
			max={config.range.max}
			step={config.range.step}
			bind:value={config.score}
			on:change
		/>
	</div>

	{#if config.showScore}
		<span class="show-score" style="font-size: {config.starConfig.size / 2}px;">
			({parseFloat((config.score / config.countStars) * 100).toFixed(2)}%)
		</span>
	{/if}
</section>

<style>
	.stars-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	.range-stars {
		position: relative;
	}
	.stars {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	.slider {
		opacity: 0;
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		left: 0;
		height: 100%;
	}
	.show-score {
		user-select: none;
		color: #888;
	}
</style>
