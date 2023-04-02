<script lang="ts">
	import Bookmark from '$lib/components/bookmark.svelte';
	import { onMount } from 'svelte';
	import db from './db';
	import type { BookmarkType } from '$types/types';

	let bookmarks: BookmarkType[] | null = [];
	onMount(async () => {
		bookmarks = await db.bookmarks.get();
	});
</script>

<div>
	{#if bookmarks && bookmarks.length > 0}
		{#each bookmarks as bookmark}
			<Bookmark {bookmark} />
		{/each}
	{/if}
</div>
