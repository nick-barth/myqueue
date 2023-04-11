<script lang="ts">
	import { currentStore, readingStore } from '$lib/store';
	import Arrow from '$lib/icons/arrow.svg?component';
	import { combineMeta } from '$lib/utils/bookmark';
	import type { BookmarkType } from '$types/types';

	export let bookmark: BookmarkType;

	const handleBack = () => {
		readingStore.update((e) => false);
	};

	let meta = combineMeta(bookmark, {
		noReadingTime: true
	});
</script>

<section class="flex w-full items-center flex-col mb-16">
	<div class="max-w-2xl">
		<button
			class="flex gap-1 items-center font-bold bg-gray900 rounded-[80px] py-2 px-4 mb-10"
			on:click={handleBack}><span class="h-3 w-3"><Arrow /></span>Back</button
		>
		<p class="text-primary2 mb-4">{meta.join(' • ')}</p>
		<h1 class="text-4xl font-bold mb-8 font-domine">{bookmark.title}</h1>
		<article class="text-lg leading-7">{bookmark.content}</article>
	</div>
</section>
