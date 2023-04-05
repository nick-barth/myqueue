<script lang="ts">
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import { combineMeta } from '$lib/utils/bookmark';
	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';

	export let bookmark: BookmarkType;
	export let setSelectedBookmark: (arg1: BookmarkType) => void;

	let meta = combineMeta(bookmark);
	$: isGenerating = false;
	$: bookmark;
	const handlePlay = async () => {
		if (bookmark.audio) {
			setSelectedBookmark(bookmark);
		} else {
			if (!bookmark.content) {
				return;
			}
			isGenerating = true;
			const res = await db.tts.create(bookmark);
			bookmark = {
				...bookmark,
				audio: res.path
			};
			setSelectedBookmark(bookmark);
			isGenerating = false;
		}
		// isGenerating = true;
		// setTimeout(() => {
		// 	isGenerating = false;
		// }, 7000);
	};
</script>

<li class="list-none mb-8">
	<h2 class="flex font-bold text-xl">
		{#if bookmark.image}
			<div class="w-16 h-16 overflow-hidden flex-shrink-0 mr-6">
				<img class="min-h-full min-w-full" src={bookmark.image} alt="Related to the article" />
			</div>
		{/if}
		{bookmark.title}
	</h2>
	<p class="line-clamp-4 my-2 leading-7 overflow-hidden">
		{bookmark.content}
	</p>
	<div class="text-sm leading-6 mb-2">
		{meta.join(' • ')}
	</div>
	<div class="flex self-start gap-2 pb-8 py-6 border-b border-b-background">
		<button class="flex h-10 bg-background rounded-[80px] items-center py-2 px-4">Read</button>
		<button
			on:click={handlePlay}
			class=" transition-all ease-in-out max-w-[96px] duration-300 flex gap-2 h-10 bg-accent rounded-[80px] py-2 px-4 items-center {!isGenerating
				? 'bg-primary text-white'
				: 'bg-accent2 text-primary max-w-xs'}"
			>{#if !isGenerating}
				Listen <svg
					width="13"
					height="14"
					viewBox="0 0 13 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0.0290694 13.9959L0 0.473511L12.5 7.00462L0.0290694 13.9959Z" fill="#FFF" />
				</svg>
			{:else}
				Generating <LoadingDots />
			{/if}
		</button>
	</div>
</li>
