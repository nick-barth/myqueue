<script>
	import Bookmark from '$lib/components/bookmark.svelte';
	import { onMount } from 'svelte';
	import db from '../db';
	import { goto } from '$app/navigation';
	let bookmarks = [];
	onMount(async () => {
		bookmarks = await db.bookmarks.all();
	});
	async function handleInsertBookmark() {
		const bookmark = await db.bookmarks.create({
			url: 'https://blog.hireproof.io/big-twitch-energy-how-live-streaming-made-me-a-better-developer-ae61e09c8c48'
		});
	}
</script>

<div>
	I'm protected route
	<button on:click={handleInsertBookmark}>Insert bookmark</button>

	<h2>Bookmarks</h2>
	<div>
		{#each bookmarks as bookmark}
			<Bookmark {bookmark} />
		{/each}
	</div>
</div>
