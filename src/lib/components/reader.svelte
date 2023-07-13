<script lang="ts">
	import { readingStore } from '$lib/store';
	import Arrow from '$lib/icons/arrow.svg?component';
	import type { BookmarkType } from '$types/types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import BookmarkMeta from '$lib/components/bookmark-meta.svelte';
	import { Capacitor } from '@capacitor/core';

	export let bookmark: BookmarkType;

	const handleBack = () => {
		readingStore.update((e) => false);
		goto('/');
	};

	onMount(() => {
		document.body.scrollIntoView();
	});
</script>

<section class="flex w-full items-center flex-col mb-16 bg-white p-4 pt-10">
	<div class="max-w-2xl">
		<div class="fixed left-0 right-0 top-0 bg-white p-4 flex justify-center">
			<div class="max-w-2xl w-full">
				<Button variant="secondary" size="sm" handleClick={handleBack}
					><span class="h-3 w-3"><Arrow /></span>Back</Button
				>
			</div>
		</div>
		<p class="mb-4"><BookmarkMeta {bookmark} noReadingTime={true} /></p>
		<h1 class=" text-2xl leading-7 font-bold mb-8 font-frank">{bookmark.title}</h1>
		<article class="read text-lg leading-7">{@html bookmark.reader}</article>
	</div>
</section>
