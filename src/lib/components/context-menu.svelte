<script lang="ts">
	import { fly } from 'svelte/transition';
	import KebabMenu from '$lib/icons/kebab-menu.svg?component';
	import { clickOutside } from '$lib/directives/clickAway';

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
				<KebabMenu />
			</div>
		</div>
	{/if}
	{#if isOpen}
		<div
			transition:fly={{ y: -10, duration: 200 }}
			class="absolute -bottom-1 right-2 translate-y-full"
		>
			<slot />
		</div>
	{/if}
</button>
