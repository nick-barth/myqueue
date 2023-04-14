<script lang="ts">
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import PlayButton from '$lib/icons/play-button.svg?component';
	import PauseButton from '$lib/icons/pause-button.svg?component';
	import Share from '$lib/icons/share.svg?component';
	import ContextMenu from '$lib/components/context-menu.svelte';

	import { combineMeta } from '$lib/utils/bookmark';
	import db from '$lib/db';
	import type { BookmarkType } from '$types/types';
	import { currentStore, addToast, audioStore, pausedStore, handleTogglePlay } from '$lib/store';
	import { goto } from '$app/navigation';

	export let bookmark: BookmarkType;

	$: currentlySelected = $currentStore ? $currentStore.id === bookmark.id : false;

	const handleRead = () => {
		currentStore.update((v) => bookmark);
		goto('/read');
	};

	let currentlyPlaying = false;

	$: currentlyPlaying = currentlySelected && !$pausedStore;

	let meta = combineMeta(bookmark, {
		noReadingTime: true
	});
	$: isGenerating = false;
	$: bookmark;

	const handleRemove = async () => {
		db.bookmarks.remove(bookmark);
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
				// waits for audio to load maybe?
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
				addToast({
					content: 'Oops, that did not work, maybe we cannnot read the article',
					type: 'error'
				});
			} else {
				bookmark = {
					...bookmark,
					audio: res.data.path
				};
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
			class="hidden md:flex h-24 w-24 overflow-hidden flex-shrink-0 mr-4 bg-cover"
		/>
	{/if}
	<div class="w-full flex flex-col">
		<h2 class="flex font-bold text-xl md:text-2xl font-domine mb-4">
			{#if bookmark.image}
				<div class="md:hidden w-16 h-16 overflow-hidden flex-shrink-0 mr-6">
					<div
						style={`background-image: url(${bookmark.image})`}
						class="flex h-16 w-16 overflow-hidden flex-shrink-0 mr-4 bg-cover"
					/>
				</div>
			{/if}
			{bookmark.title}
		</h2>
		<aside class="text-sm leading-6 mb-2">
			{meta.join(' • ')}
		</aside>
		<p class="line-clamp-2 my-2 leading-7 overflow-hidden">
			{bookmark.content}
		</p>
		<div
			class="flex w-full pb-8 py-6 border-b border-b-background items-center flex-row-reverse justify-between"
		>
			<div class="flex gap-2">
				<button
					on:click={handleRead}
					class="flex h-10 transition-colors {currentlySelected
						? 'bg-gray800'
						: 'bg-gray950'} rounded-[80px] items-center py-2 px-4">Read</button
				>
				<button
					on:click={handlePlay}
					class=" transition-all ease-in-out max-w-[96px] duration-300 flex gap-2 h-10 bg-accent rounded-[80px] py-2 px-4 items-center {isGenerating ||
					currentlyPlaying
						? 'bg-accent2 gradient-animation text-primary max-w-xs'
						: 'bg-primary text-white'}"
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
				</button>
			</div>
			<div class="text-sm flex items-center">
				<ContextMenu>
					<div class="bg-white border border-gray-200 rounded-lg py-2">
						<button on:click={handleRemove} class="hover:bg-background px-4 py-2">Delete</button>
					</div>
				</ContextMenu>
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

<style>
	@-webkit-keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@-moz-keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	.gradient-animation {
		background: linear-gradient(90deg, #c1ebff, #d8bbfe);
		background-size: 400% 400%;

		-webkit-animation: gradient 1.5s ease infinite;
		-moz-animation: gradient 1.5s ease infinite;
		animation: gradient 1.5s ease infinite;
	}
</style>
