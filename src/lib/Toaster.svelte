<script lang="ts">
	import { onMount } from 'svelte';
	import { getToastRegistry } from '#lib/toast';

	export let position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
	export let richColors = false;
	export let closeButton = false;

	let toasts: Array<{ id: number; message: string; type: string; closeButton: boolean }> = [];

	function refresh() {
		toasts = [...getToastRegistry().items];
	}

	onMount(() => {
		refresh();
		const timer = window.setInterval(refresh, 200);
		return () => window.clearInterval(timer);
	});

	function getTheme(type: string) {
		const palette: Record<string, string> = {
			default: '#111827',
			success: '#22c55e',
			error: '#ef4444',
			info: '#3b82f6',
			warning: '#f59e0b'
		};
		return richColors ? (palette[type] ?? palette.default) : palette.default;
	}

	function dismiss(id: number) {
		const registry = getToastRegistry();
		registry.items = registry.items.filter((entry) => entry.id !== id);
		refresh();
	}

	$: placement =
		position === 'top-left'
			? 'left:1rem;top:1rem;'
			: position === 'bottom-left'
				? 'left:1rem;bottom:1rem;'
				: position === 'bottom-right'
					? 'right:1rem;bottom:1rem;'
					: 'right:1rem;top:1rem;';
</script>

<div
	aria-live="polite"
	style={`position:fixed;display:flex;flex-direction:column;gap:0.5rem;${placement}z-index:9999;`}
>
	{#each toasts as item (item.id)}
		<div
			style={`display:flex;align-items:center;justify-content:space-between;gap:0.75rem;min-width:220px;max-width:320px;padding:0.75rem 0.9rem;border-radius:0.75rem;box-shadow:0 12px 26px rgba(15,23,42,0.2);background:${getTheme(
				item.type
			)};color:white;`}
		>
			<span>{item.message}</span>
			{#if closeButton || item.closeButton}
				<button
					type="button"
					aria-label="Dismiss toast"
					on:click={() => dismiss(item.id)}
					style="border:none;background:transparent;color:inherit;cursor:pointer;font-size:1rem;opacity:0.8;"
				>
					×
				</button>
			{/if}
		</div>
	{/each}
</div>
