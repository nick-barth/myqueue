<script lang="ts">
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

	const setSelectedBookmark = (bookmark: BookmarkType) => {
		console.log(bookmark);
		selectedBookmark = bookmark;
	};
</script>

<div class="mt-10">
	{#if selectedBookmark && selectedBookmark.content}
		<Player bookmark={selectedBookmark} {setSelectedBookmark} />
	{/if}
	{#if bookmarks && bookmarks.length > 0}
		{#each bookmarks as bookmark}
			<Bookmark {bookmark} {setSelectedBookmark} />
		{/each}
	{/if}
</div>
