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
	on:click={() => (isOpen = !isOpen)}
	class="h-6 w-6"
	use:clickOutside
	on:click_outside={handleClickOutside}
>
	<KebabMenu />
	{#if isOpen}
		<div in:fly={{ y: -5 }} out:fly={{ y: -5 }} class="absolute">
			<slot />
		</div>
	{/if}
</button>
