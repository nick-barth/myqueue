<script lang="ts">
	import { readingStore } from '$lib/store';
	import Arrow from '$lib/icons/arrow.svg?component';
	import type { BookmarkType } from '$types/types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import BookmarkMeta from '$lib/components/bookmark-meta.svelte';

	export let bookmark: BookmarkType;

	const handleBack = () => {
		readingStore.update((e) => false);
		goto('/');
	};

	onMount(() => {
		document.body.scrollIntoView();
	});
</script>

<section class="flex w-full items-center flex-col mb-16 px-4 md:px-0">
	<div class="max-w-2xl">
		<Button variant="secondary" size="sm" classes="mb-8" handleClick={handleBack}
			><span class="h-3 w-3"><Arrow /></span>Back</Button
		>
		<p class="text-primary2 mb-4"><BookmarkMeta {bookmark} noReadingTime={true} /></p>
		<h1 class="text-4xl font-bold mb-8 font-domine">{bookmark.title}</h1>
		<article class="read text-lg leading-7">{@html bookmark.reader}</article>
	</div>
</section>
