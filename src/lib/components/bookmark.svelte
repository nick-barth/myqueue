<script lang="ts">
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import Button from '$lib/components/button.svelte';
	import PlayButton from '$lib/icons/play-button.svg?component';
	import PlusIcon from '$lib/icons/plus-icon.svg?component';
	import Checkmark from '$lib/icons/checkmark.svg?component';
	import PauseButton from '$lib/icons/pause-button.svg?component';
	import Share from '$lib/icons/share.svg?component';
	import Trash from '$lib/icons/trash.svg?component';
	import ContextMenu from '$lib/components/context-menu.svelte';
	import BookmarkMeta from '$lib/components/bookmark-meta.svelte';
	import { MediaSession } from '@jofr/capacitor-media-session';

	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';
	import { currentStore, addToast, audioStore, pausedStore, bookmarkStore } from '$lib/store';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import mixpanel from 'mixpanel-browser';
	import { sources } from '$lib/constants/sources';

	export let bookmark: BookmarkType;
	export let isDiscovery: Boolean = false;

	let currentlyPlaying = false;
	$: isInQueue = $bookmarkStore && $bookmarkStore.find((b: BookmarkType) => b.url === bookmark.url);
	$: currentlyPlaying = currentlySelected && !$pausedStore;
	$: isGenerating = false;
	$: bookmark;
	$: currentlySelected = $currentStore ? $currentStore.id === bookmark.id : false;
	$: canDelete = $bookmarkStore && $bookmarkStore.length > 1 && !isDiscovery;

	const handleRemove = async () => {
		db.bookmarks.remove(bookmark);
	};

	const handleRead = () => {
		currentStore.update((v) => bookmark);
		goto('/read');
	};

	const handleCopyLink = async (type: 'clipboard' | 'twitter' | 'facebook' | 'linkedin') => {
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
				pausedStore.update((v) => true);
				$audioStore?.pause();
				MediaSession.setPlaybackState({ playbackState: 'paused' });
			} else {
				currentStore.update((v) => bookmark);
				setTimeout(() => {
					$audioStore?.play();
					MediaSession.setPlaybackState({ playbackState: 'playing' });
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
	let bookmarkDomain: any;

	// Wtf fix this, and figure out how to do big computed properties in svelte
	$: {
		if (!bookmark.domain) {
			bookmarkDomain = null;
		} else {
			const domain = bookmark.domain;
			const source = sources.find((s: any) => domain.includes(s.domain));
			if (!source) {
				bookmarkDomain = null;
			} else {
				bookmarkDomain = source.source;
			}
		}
	}

	const handleAddToQueue = async () => {
		if (!bookmark.url) {
			return;
		}
		mixpanel.track('discovery add', { bookmark: bookmark });
		isGenerating = true;
		await db.bookmarks.post(bookmark.url);
		isGenerating = false;
	};
</script>

<li
	class="mt-2 list-none transition-colors ease-in-out duration-150 md:flex md:flex-row p-6 bg-white"
>
	<div class="w-full flex flex-col">
		{#if bookmarkDomain}
			<img
				src={`/images/sources/banners/${bookmarkDomain}.png`}
				alt={bookmarkDomain}
				class="mb-2 w-32 h-18"
			/>
		{/if}
		<div class="flex flex-row-reverse">
			{#if bookmark.image}
				<div class="w-20 h-20 overflow-hidden flex-shrink-0 rounded-md ml-4">
					<div
						style={`background-image: url(${bookmark.image})`}
						role="img"
						aria-label="article cover"
						class="flex w-20 h-20 overflow-hidden flex-shrink-0 mr-4 bg-cover bg-center"
					/>
				</div>
			{/if}
			<div class="flex flex-col w-full">
				<h2
					class="flex font-bold text-lg md:text-xl leading-6 md:leading-7 font-frank justify-between"
				>
					{bookmark.title}
				</h2>
				<p class="line-clamp-4 my-2 leading-5 overflow-hidden text-sm breakword">
					{bookmark.content}
				</p>
				<BookmarkMeta {bookmark} noReadingTime />
			</div>
		</div>
		<div class="flex w-ful items-center flex-row-reverse justify-between">
			<div class="flex items-center">
				{#if !isDiscovery}
					{#if bookmark && bookmark.read_time}
						<div class="text-sm mr-4">
							{Math.floor(bookmark.read_time / 60)}
							{Math.floor(bookmark.read_time / 60) > 1 ? 'mins' : 'min'}
						</div>
					{/if}
					<button
						on:click={handleRead}
						class={`
						rounded-primary text-primary text-sm px-4 py-2 bg-background h-10 mr-4`}
					>
						Read
					</button>
					<Button size="sm" classes="w-10" handleClick={handlePlay}>
						<div class="flex items-center gap-2">
							{#if currentlyPlaying}
								<div class="h-3 w-3 overflow-hidden"><PauseButton /></div>
							{:else}
								<div class="h-3 w-3 overflow-hidden"><PlayButton /></div>
							{/if}
						</div>
					</Button>
				{:else}
					<Button
						size="sm"
						variant={!isInQueue ? 'accent' : 'success'}
						classes="w-10 h-10"
						handleClick={handleAddToQueue}
					>
						{#if !isGenerating}
							{#if !isInQueue}
								<div class="flex items-center gap-2">
									<div class="h-6 w-6"><PlusIcon /></div>
								</div>
							{:else}
								<div class="flex items-center gap-2">
									<div class="h-6 w-6"><Checkmark /></div>
								</div>
							{/if}
						{:else}
							<div class="flex items-center gap-2 text-primary">
								<LoadingDots />
							</div>
						{/if}
					</Button>
				{/if}
			</div>
			<div class="text-sm -ml-[10px]">
				{#if !isDiscovery}
					<div class="flex items-center">
						<button
							on:click={handleRemove}
							class=" transition-colors hover:bg-background rounded-full p-2"
						>
							<div class="h-6 w-6">
								<Trash />
							</div>
						</button>
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
					</div>
				{/if}
			</div>
		</div>
	</div>
</li>

<style>
	.breakword {
		word-break: break-word;
	}
</style>
