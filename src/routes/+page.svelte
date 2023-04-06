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

<div class="flex md:mr-[385px]">
	{#if currentBookmark && currentBookmark.content}
		<div class="md:hidden">
			<div
				class="fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-background"
				transition:fly={{ y: 200, duration: 400 }}
			>
				<Player bookmark={currentBookmark} />
			</div>
		</div>
		<div class="hidden md:flex">
			<div
				class="max-w-[355px] fixed right-0 bottom-0 top-0 bg-background"
				transition:fly={{ y: 200, duration: 400 }}
			>
				<Player bookmark={currentBookmark} />
			</div>
		</div>
	{/if}
	<div class="max-w-4xl m-auto px-4 md:p-0">
		{#if bookmarks && bookmarks.length > 0}
			{#each bookmarks as bookmark}
				<Bookmark {bookmark} />
			{/each}
		{/if}
	</div>
</div>
