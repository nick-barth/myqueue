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
	on:click={() => (isOpen = true)}
	class=" transition-colors hover:bg-background rounded-full p-2"
	use:clickOutside={handleClickOutside}
>
	<div class="h-6 w-6">
		<KebabMenu />
	</div>
	{#if isOpen}
		<div transition:fly={{ y: -10, duration: 200 }} class="absolute">
			<slot />
		</div>
	{/if}
</button>
