<script lang="ts">
	import { fly } from 'svelte/transition';
	import Bookmark from '$lib/components/bookmark.svelte';
	import Player from '$lib/components/player.svelte';
	import { selectedBookmark } from '$lib/store.js';
	import { onMount } from 'svelte';
	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';
	let bookmarks: BookmarkType[] = [];

	let currentBookmark: BookmarkType | null;

	selectedBookmark.subscribe((value) => {
		currentBookmark = value;
	});

	onMount(async () => {
		bookmarks = await db.bookmarks.get();
	});
</script>

<div class="mt-10">
	{#if currentBookmark && currentBookmark.content}
		<div
			class="fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-background"
			transition:fly={{ y: 200, duration: 400 }}
		>
			<Player bookmark={currentBookmark} />
		</div>
	{/if}
	{#if bookmarks && bookmarks.length > 0}
		{#each bookmarks as bookmark}
			<Bookmark {bookmark} />
		{/each}
	{/if}
</div>
