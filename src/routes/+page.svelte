<script lang="ts">
	import { fly } from 'svelte/transition';
	import Bookmark from '$lib/components/bookmark.svelte';
	import Player from '$lib/components/player.svelte';
	import { onMount } from 'svelte';
	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';
	let selectedBookmark: BookmarkType | null;
	$: selectedBookmark = null;
	let bookmarks: BookmarkType[] = [];
	onMount(async () => {
		bookmarks = await db.bookmarks.get();
		// if (bookmarks && bookmarks.length > 0) {
		// 	selectedBookmark = bookmarks[0];
		// }
	});

	const setSelectedBookmark = (bookmark: BookmarkType | null) => {
		console.log(bookmark);
		selectedBookmark = bookmark;
	};
</script>

<div class="mt-10">
	{#if selectedBookmark && selectedBookmark.content}
		<div
			class="fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-white"
			transition:fly={{ y: 200, duration: 400 }}
		>
			<Player bookmark={selectedBookmark} {setSelectedBookmark} />
		</div>
	{/if}
	{#if bookmarks && bookmarks.length > 0}
		{#each bookmarks as bookmark}
			<Bookmark {bookmark} {setSelectedBookmark} />
		{/each}
	{/if}
</div>
