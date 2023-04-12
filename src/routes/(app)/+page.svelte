<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import UrlAdder from '$lib/components/url-adder.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	import { bookmarkStore } from '$lib/store';
	import { onMount } from 'svelte';
	import db from '$lib/db';
</script>

<section class="w-full md:max-w-4xl m-auto px-4 md:p-0 relative z-10">
	<UrlAdder />
	{#if $bookmarkStore && $bookmarkStore.length > 0}
		{#each $bookmarkStore as bookmark (bookmark.id)}
			<div animate:flip={{ duration: 300 }} in:fade={{ duration: 300 }}>
				<Bookmark {bookmark} />
			</div>
		{/each}
	{/if}
</section>
