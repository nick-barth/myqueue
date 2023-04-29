<script lang="ts">
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import Button from '$lib/components/button.svelte';
	import PlayButton from '$lib/icons/play-button.svg?component';
	import PauseButton from '$lib/icons/pause-button.svg?component';
	import Share from '$lib/icons/share.svg?component';
	import ContextMenu from '$lib/components/context-menu.svelte';
	import BookmarkMeta from '$lib/components/bookmark-meta.svelte';

	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';
	import {
		currentStore,
		addToast,
		audioStore,
		pausedStore,
		handleTogglePlay,
		bookmarkStore
	} from '$lib/store';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import mixpanel from 'mixpanel-browser';

	export let bookmark: BookmarkType;

	let currentlyPlaying = false;

	$: currentlyPlaying = currentlySelected && !$pausedStore;
	$: isGenerating = false;
	$: bookmark;
	$: currentlySelected = $currentStore ? $currentStore.id === bookmark.id : false;
	$: canDelete = $bookmarkStore && $bookmarkStore.length > 1;

	const handleRemove = async () => {
		db.bookmarks.remove(bookmark);
	};

	const handleRead = () => {
		currentStore.update((v) => bookmark);
		goto('/read');
	};

	export const handleCopyLink = async (type: 'clipboard' | 'twitter' | 'facebook' | 'linkedin') => {
		if (!bookmark.url) {
			return;
		}
		if (type === 'clipboard') {
			navigator.clipboard.writeText(bookmark.url).then(
				function () {
					addToast({ content: 'Link copied to clipboard', type: 'success' });
				},
				function (err) {
					console.error('Async: Could not copy text: ', err);
				}
			);
		}
		if (type === 'twitter') {
			const link = `https://twitter.com/intent/tweet?url=${bookmark.url}`;
			window.open(link, '_blank')?.focus();
		}
		if (type === 'facebook') {
			const link = `https://www.facebook.com/sharer/sharer.php?u=${bookmark.url}`;
			window.open(link, '_blank')?.focus();
		}
		if (type === 'linkedin') {
			const link = `https://www.linkedin.com/shareArticle?mini=true&url=${bookmark.url}`;
			window.open(link, '_blank')?.focus();
		}
	};

	const handlePlay = async () => {
		if (bookmark.audio) {
			if (currentlyPlaying) {
				handleTogglePlay();
			} else {
				currentStore.update((v) => bookmark);
				setTimeout(() => {
					$audioStore?.play();
				}, 40);
			}
		} else {
			if (!bookmark.content) {
				return;
			}
			isGenerating = true;
			const res = await db.tts.create(bookmark);

			if (res.error) {
				mixpanel.track('generated error', { bookmark: bookmark });
				addToast({
					content: 'Oops, that did not work, maybe we cannnot read the article',
					type: 'error'
				});
			} else {
				mixpanel.track('generated succesfully', { response: res.data });
				bookmark = {
					...bookmark,
					audio: res.data.path
				};
				const bookmarks = get(bookmarkStore);
				if (bookmarks && bookmarks.length > 0) {
					var foundIndex = bookmarks.findIndex((x) => x.id == bookmark.id);
					const updatedBookmarkStore = [...bookmarks];
					updatedBookmarkStore[foundIndex] = bookmark;
					bookmarkStore.update((v) => updatedBookmarkStore);
				}
				currentStore.update((v) => bookmark);
				addToast({
					content: 'Audio ready to play!',
					type: 'success'
				});
			}

			isGenerating = false;
		}
	};
</script>

<li
	class="list-none px-4 transition-colors ease-in-out duration-150 md:flex md:flex-row md:px-10 pt-10 {!currentlySelected
		? 'bg-white'
		: 'bg-gray950'}"
>
	{#if bookmark.image}
		<div
			style={`background-image: url(${bookmark.image})`}
			role="img"
			aria-label="article cover"
			class="hidden md:flex h-24 w-24 overflow-hidden flex-shrink-0 mr-4 bg-cover bg-center"
		/>
	{/if}
	<div class="w-full flex flex-col">
		<h2 class="flex font-bold text-xl md:text-2xl font-domine mb-4">
			{#if bookmark.image}
				<div class="md:hidden w-16 h-16 overflow-hidden flex-shrink-0 mr-6">
					<div
						style={`background-image: url(${bookmark.image})`}
						role="img"
						aria-label="article cover"
						class="flex h-16 w-16 overflow-hidden flex-shrink-0 mr-4 bg-cover bg-center"
					/>
				</div>
			{/if}
			{bookmark.title}
		</h2>
		<BookmarkMeta {bookmark} noReadingTime={true} />
		<p class="line-clamp-2 my-2 leading-7 overflow-hidden">
			{bookmark.content}
		</p>
		<div
			class="flex w-full pb-8 py-6 border-b border-b-background items-center flex-row-reverse justify-between"
		>
			<div class="flex gap-2">
				<Button
					size="sm"
					variant="secondary"
					handleClick={handleRead}
					classes={currentlySelected ? 'bg-gray800' : 'bg-gray950'}
				>
					Read
				</Button>
				<Button size="sm" handleClick={handlePlay} isPartyMode={isGenerating || currentlyPlaying}
					>{#if !isGenerating}
						<div class="flex items-center gap-2">
							{#if currentlyPlaying}
								Playing <div class="h-3 w-3 overflow-hidden"><PauseButton /></div>
							{:else}
								Listen <div class="h-3 w-3 overflow-hidden"><PlayButton /></div>
							{/if}
						</div>
					{:else}
						Generating <LoadingDots />
					{/if}
				</Button>
			</div>
			<div class="text-sm flex items-center">
				{#if canDelete}
					<ContextMenu>
						<div class="bg-white border border-gray-200 rounded-lg py-2">
							<button on:click={handleRemove} class="hover:bg-background px-4 py-2">Delete</button>
						</div>
					</ContextMenu>
				{/if}
				<ContextMenu icon={Share}>
					<div class="bg-white border border-gray-200 rounded-lg py-2 whitespace-nowrap">
						<button
							on:click={() => handleCopyLink('clipboard')}
							class="hover:bg-background px-4 flex py-2 flex-nowrap w-full"
						>
							Copy link
						</button>
						<button
							on:click={() => handleCopyLink('twitter')}
							class="hover:bg-background px-4 flex py-2 flex-nowrap w-full"
						>
							Share on Twitter
						</button>
						<button
							on:click={() => handleCopyLink('facebook')}
							class="hover:bg-background px-4 flex py-2 flex-nowrap w-full"
						>
							Share on Facebook
						</button>
						<button
							on:click={() => handleCopyLink('linkedin')}
							class="hover:bg-background px-4 flex py-2 flex-nowrap w-full"
						>
							Share on LinkedIn
						</button>
					</div>
				</ContextMenu>
				{#if bookmark.read_time}
					<div class="pl-1">
						{Math.floor(bookmark.read_time / 60)}
						{Math.floor(bookmark.read_time / 60) > 1 ? 'mins' : 'min'}
					</div>
				{/if}
			</div>
		</div>
	</div>
</li>
