<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Toasts from '$lib/components/toasts.svelte';
	import UrlAdder from '$lib/components/url-adder.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	import Player from '$lib/components/player.svelte';
	import { selectedBookmark, bookmarkStore } from '$lib/store.js';
	import { userStore } from '$lib/store.js';
	import { onMount } from 'svelte';
	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';

	let currentBookmark: BookmarkType | null;
	let bookmarks: BookmarkType[] | null;

	bookmarkStore.subscribe((value) => {
		bookmarks = value;
	});

	selectedBookmark.subscribe((value) => {
		currentBookmark = value;
	});

	onMount(async () => {
		await db.bookmarks.get();
	});
</script>

<div class="flex md:mr-[385px]">
	<div class="relative z-30">
		<Toasts />
	</div>
	{#if currentBookmark && currentBookmark.content}
		<aside
			class="md:max-w-[355px] fixed z-50 w-full h-full top-0 left-0 md:top-auto md:left-auto right-0 bottom-0 bg-accent"
			transition:fly={{ y: 200, duration: 400 }}
		>
			<Player bookmark={currentBookmark} />
		</aside>
	{/if}
	{#if $userStore}
		<div class="w-full md:max-w-4xl m-auto px-4 md:p-0 relative z-10">
			<UrlAdder />
			{#if bookmarks && bookmarks.length > 0}
				{#each bookmarks as bookmark (bookmark.id)}
					<div animate:flip={{ duration: 300 }} in:fade={{ duration: 300 }}>
						<Bookmark {bookmark} />
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
