<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Reader from '$lib/components/reader.svelte';
	import Toasts from '$lib/components/toasts.svelte';
	import UrlAdder from '$lib/components/url-adder.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	import Player from '$lib/components/player.svelte';
	import { currentStore, bookmarkStore, readingStore } from '$lib/store';
	import { userStore } from '$lib/store.js';
	import { onMount } from 'svelte';
	import db from '$lib/db';

	onMount(async () => {
		await db.bookmarks.get();
	});
</script>

<div class="flex md:mr-[385px]">
	<div class="relative z-30">
		<Toasts />
	</div>
	{#if $currentStore && $currentStore.content}
		<aside
			class="md:max-w-[355px] fixed z-50 w-full h-full top-0 left-0 md:top-auto md:left-auto right-0 bottom-0 bg-accent"
			transition:fly={{ y: 200, duration: 400 }}
		>
			<Player bookmark={$currentStore} />
		</aside>
	{/if}
	{#if $userStore}
		<section class="w-full md:max-w-4xl m-auto px-4 md:p-0 relative z-10">
			{#if $readingStore && $currentStore}
				<div in:fade={{ duration: 300 }}>
					<Reader bookmark={$currentStore} />
				</div>
			{:else}
				<UrlAdder />
				{#if $bookmarkStore && $bookmarkStore.length > 0}
					{#each $bookmarkStore as bookmark (bookmark.id)}
						<div animate:flip={{ duration: 300 }} in:fade={{ duration: 300 }}>
							<Bookmark {bookmark} />
						</div>
					{/each}
				{/if}
			{/if}
		</section>
	{/if}
</div>
