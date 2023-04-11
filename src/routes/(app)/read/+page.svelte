<script lang="ts">
	import { fade } from 'svelte/transition';
	import { currentStore } from '$lib/store';
	import Reader from '$lib/components/reader.svelte';
</script>

{#if $currentStore}
	<div in:fade={{ duration: 300 }}>
		<Reader bookmark={$currentStore} />
	</div>
{/if}
