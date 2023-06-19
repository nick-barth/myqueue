<script lang="ts">
	import { fly } from 'svelte/transition';
	import KebabMenu from '$lib/icons/kebab-menu.svg?component';
	import { clickOutside } from '$lib/directives/clickAway';
	import type { SvelteComponentTyped } from 'svelte/internal';

	type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;

	export let icon: C | null = null;
	export let position: 'left' | 'right' = 'left';
	export let positionY: 'top' | 'bottom' = 'bottom';

	let isOpen: boolean;

	function handleClickOutside() {
		if (!isOpen) {
			return;
		}
		isOpen = false;
	}
</script>

<button
	class="relative h-full"
	on:click={() => (isOpen = true)}
	use:clickOutside={handleClickOutside}
>
	{#if $$slots.icon}
		<slot name="icon" />
	{:else}
		<div class=" transition-colors hover:bg-background rounded-full p-2">
			<div class="h-6 w-6">
				{#if icon} <svelte:component this={icon} /> {:else}<KebabMenu />{/if}
			</div>
		</div>
	{/if}
	{#if isOpen}
		<div
			transition:fly={{ y: -10, duration: 200 }}
			class="absolute {positionY === 'top'
				? '-top-2  -translate-y-full'
				: '-bottom-1  translate-y-full'} {position === 'left' ? 'left-2' : 'right-2'} z-50"
		>
			<slot />
		</div>
	{/if}
</button>
