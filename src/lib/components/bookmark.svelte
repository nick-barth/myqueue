<script lang="ts">
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import PlayButton from '$lib/icons/play-button.svg?component';
	import Share from '$lib/icons/share.svg?component';
	import ContextMenu from '$lib/components/context-menu.svelte';
	import { addToast } from '$lib/store';

	import { combineMeta } from '$lib/utils/bookmark';
	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';
	import { selectedBookmark } from '$lib/store.js';

	export let bookmark: BookmarkType;

	let currentlySelected: boolean;
	selectedBookmark.subscribe((v) => {
		currentlySelected = v ? v.id === bookmark.id : false;
	});

	let meta = combineMeta(bookmark, {
		noReadingTime: true
	});
	$: isGenerating = false;
	$: bookmark;

	const handleRemove = async () => {
		db.bookmarks.remove(bookmark.id);
	};

	const handlePlay = async () => {
		if (bookmark.audio) {
			selectedBookmark.update((v) => bookmark);
		} else {
			if (!bookmark.content) {
				return;
			}
			isGenerating = true;
			const res = await db.tts.create(bookmark);

			if (res.error) {
				addToast({
					content: 'Oops, that did not work, maybe we cannnot read the article',
					type: 'error'
				});
			} else {
				bookmark = {
					...bookmark,
					audio: res.data.path
				};
				selectedBookmark.update((v) => bookmark);
				addToast({
					content: 'Audio successfully synthesized',
					type: 'error'
				});
			}

			isGenerating = false;
		}
	};

	const handleCopyLink = async () => {
		if (!bookmark.url) {
			return;
		}
		navigator.clipboard.writeText(bookmark.url).then(
			function () {
				addToast({ content: 'Link copied to clipboard', type: 'success' });
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	};
</script>

<li
	class="list-none transition-colors ease-in-out duration-150 md:flex md:flex-row md:px-10 pt-10 {!currentlySelected
		? 'bg-white'
		: 'bg-gray950'}"
>
	<div class="hidden md:flex h-24 w-24 overflow-hidden flex-shrink-0 mr-6">
		{#if bookmark.image}
			<img class="object-cover object-center" src={bookmark.image} alt="Related to the article" />
		{/if}
	</div>
	<div class="w-full flex flex-col">
		<h2 class="flex font-bold text-xl">
			{#if bookmark.image}
				<div class="md:hidden w-16 h-16 overflow-hidden flex-shrink-0 mr-6">
					<img class="min-h-full min-w-full" src={bookmark.image} alt="Related to the article" />
				</div>
			{/if}
			{bookmark.title}
		</h2>
		<p class="md:line-clamp-2 line-clamp-4 my-2 leading-7 overflow-hidden">
			{bookmark.content}
		</p>
		<aside class="text-sm leading-6 mb-2">
			{meta.join(' • ')}
		</aside>
		<div
			class="flex w-full pb-8 py-6 border-b border-b-background items-center flex-row-reverse justify-between"
		>
			<div class="flex gap-2">
				<button
					class="flex h-10 transition-colors {currentlySelected
						? 'bg-gray800'
						: 'bg-gray950'} rounded-[80px] items-center py-2 px-4">Read</button
				>
				<button
					on:click={handlePlay}
					class=" transition-all ease-in-out max-w-[96px] duration-300 flex gap-2 h-10 bg-accent rounded-[80px] py-2 px-4 items-center {!isGenerating
						? 'bg-primary text-white'
						: 'bg-accent2 text-primary max-w-xs'}"
					>{#if !isGenerating}
						<div class="flex items-center gap-2">
							Listen <div class="h-3 w-3 overflow-hidden"><PlayButton /></div>
						</div>
					{:else}
						Generating <LoadingDots />
					{/if}
				</button>
			</div>
			<div class="text-sm flex items-center gap-2">
				<ContextMenu>
					<div class="bg-white border border-gray-200 rounded-lg py-2">
						<button on:click={handleRemove} class="hover:bg-background px-4 py-2">Delete</button>
					</div>
				</ContextMenu>
				<ContextMenu icon={Share}>
					<div class="bg-white border border-gray-200 rounded-lg py-2 whitespace-nowrap">
						<button
							on:click={handleCopyLink}
							class="hover:bg-background px-4 flex py-2 flex-nowrap"
						>
							Copy link
						</button>
					</div>
				</ContextMenu>
				{#if bookmark.read_time}
					{Math.floor(bookmark.read_time / 60)} mins
				{/if}
			</div>
		</div>
	</div>
</li>
