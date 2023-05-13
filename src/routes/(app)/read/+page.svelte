<script lang="ts">
	import { fade } from 'svelte/transition';
	import { currentStore } from '$lib/store';
	import Reader from '$lib/components/reader.svelte';
	import { onMount } from 'svelte';
	import mixpanel from 'mixpanel-browser';

	onMount(async () => {
		mixpanel.track('Reading', { currentStore: $currentStore });
	});
</script>

{#if $currentStore}
	<div in:fade={{ duration: 300 }}>
		<Reader bookmark={$currentStore} />
	</div>
{/if}
