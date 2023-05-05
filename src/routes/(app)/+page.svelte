<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import UrlAdder from '$lib/components/url-adder.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	import { bookmarkStore } from '$lib/store';

	let totalTime: number = 0;

	$: totalTime =
		$bookmarkStore?.reduce((acc, bookmark) => {
			if (bookmark.read_time) {
				return acc + bookmark.read_time;
			}
			return acc;
		}, 0) ?? 0;
</script>

<section class="relative">
	<UrlAdder />
	{#if $bookmarkStore && $bookmarkStore.length > 0}
		<section class="px-4 md:px-10">
			<h2 class="font-bold font-domine text-4xl mb-4">My Queue</h2>
			<p class="text-sm mb-2">
				Stories: {$bookmarkStore.length}/5 <span class="px-1">•</span> Total listening time: {Math.floor(
					totalTime / 60
				)}
				{Math.floor(totalTime / 60) > 1 ? 'mins' : 'min'}
			</p>
		</section>
		{#each $bookmarkStore as bookmark (bookmark.id)}
			<div animate:flip={{ duration: 300 }} in:fade={{ duration: 300 }}>
				<Bookmark {bookmark} />
			</div>
		{/each}
	{:else}
		<div>Empty queue</div>
	{/if}
</section>
