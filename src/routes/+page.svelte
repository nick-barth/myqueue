<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import UrlAdder from '$lib/components/url-adder.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	import Player from '$lib/components/player.svelte';
	import { selectedBookmark, bookmarkStore } from '$lib/store.js';
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
	{#if currentBookmark && currentBookmark.content}
		<div
			class="md:max-w-[355px] fixed w-full h-full top-0 left-0 md:top-auto md:left-auto right-0 bottom-0 bg-background"
			transition:fly={{ y: 200, duration: 400 }}
		>
			<Player bookmark={currentBookmark} />
		</div>
	{/if}
	<div class="max-w-4xl m-auto px-4 md:p-0">
		<UrlAdder />
		{#if bookmarks && bookmarks.length > 0}
			{#each bookmarks as bookmark (bookmark.id)}
				<div animate:flip={{ duration: 300 }} in:fade={{ duration: 300 }}>
					<Bookmark {bookmark} />
				</div>
			{/each}
		{/if}
	</div>
</div>
