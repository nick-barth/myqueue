<script lang="ts">
	import { PUBLIC_STORAGE_URL } from '$env/static/public';
	import { combineMeta } from '$lib/utils/bookmark';
	import {
		currentStore,
		audioStore,
		pausedStore,
		handleTogglePlay,
		bookmarkStore
	} from '$lib/store';
	import { fade } from 'svelte/transition';

	import PlayerControls from '$lib/components/player-controls.svelte';

	import PlayButton from '$lib/icons/play-button.svg?component';
	import PauseButton from '$lib/icons/pause-button.svg?component';
	import CloseButton from '$lib/icons/close-button.svg?component';
	import PlayerBackward from '$lib/icons/player-backward.svg?component';
	import PlayerForward from '$lib/icons/player-forward.svg?component';
	import PlayerRepeat from '$lib/icons/player-repeat.svg?component';

	import type { BookmarkType } from '$types/types';

	export let bookmark: BookmarkType;

	let currentTime: number;
	let duration: number;
	let volume: number;
	let playbackRate: number = 1;
	let currentSpeedLabel: string = '1x';
	let infinitePlay: boolean = true;

	const handleEnded = () => {
		if ($bookmarkStore && $bookmarkStore?.length > 1) {
			const currentPosition = $bookmarkStore?.findIndex((b) => b.id === bookmark.id);
			const remaining = [...$bookmarkStore].slice(currentPosition + 1);
			const nextPlayable = remaining.find((b) => b.audio);
			if (nextPlayable && infinitePlay) {
				currentStore.update((v) => nextPlayable);
				handleTogglePlay();
			}
		}
	};

	const handleBackward = () => {
		if (currentTime - 15 < 0) {
			currentTime = 0;
		} else {
			currentTime = currentTime - 15;
		}
	};
	const handleForward = () => {
		if (currentTime + 15 > duration) {
			currentTime = 0;
		} else {
			currentTime = currentTime + 15;
		}
	};

	const setNewTime = (newTime: number) => {
		currentTime = newTime;
	};

	const handlePlayBackClick = () => {
		if (playbackRate === 1) {
			playbackRate = 1.25;
			currentSpeedLabel = '1.25x';
		} else if (playbackRate === 1.25) {
			playbackRate = 1.5;
			currentSpeedLabel = '1.5x';
		} else if (playbackRate === 1.5) {
			playbackRate = 1;
			currentSpeedLabel = '1x';
		}
	};

	let meta: string[];
	$: meta = combineMeta(bookmark);

	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: bookmark.title || 'My Queue',
			artist: bookmark.domain || 'My Queue',
			artwork: [
				{
					src: bookmark.image || '',
					sizes: '96x96',
					type: 'image/png'
				},
				{
					src: bookmark.image || '',
					sizes: '128x128',
					type: 'image/png'
				},
				{
					src: bookmark.image || '',
					sizes: '192x192',
					type: 'image/png'
				},
				{
					src: bookmark.image || '',
					sizes: '256x256',
					type: 'image/png'
				},
				{
					src: bookmark.image || '',
					sizes: '384x384',
					type: 'image/png'
				},
				{
					src: bookmark.image || '',
					sizes: '512x512',
					type: 'image/png'
				}
			]
		});
	}
</script>

<aside class="h-full">
	<div class="flex-col h-full justify-between hidden md:flex">
		<div>
			<div>
				{#if bookmark.image}
					<img class="min-w-full max-h-56" src={bookmark.image} alt="Related to the article" />
				{/if}
				<button
					class="absolute md:hidden top-6 right-6"
					on:click={() => currentStore.update((v) => null)}
				>
					<CloseButton />
				</button>
			</div>
			<div class="p-6">
				<h2 class="flex font-bold text-2xl font-domine">
					{bookmark.title}
				</h2>
				<p class="line-clamp-4 my-2 leading-7 overflow-hidden">
					{bookmark.content}
				</p>
				<div class="text-sm leading-6 mb-6">
					{meta.join(' • ')}
				</div>
			</div>
		</div>
		<div class="p-6">
			<PlayerControls {currentTime} {duration} {setNewTime} />
			<div class="w-full mt-6 flex items-center justify-between">
				<button on:click={handlePlayBackClick} class="text-sm w-4"> {currentSpeedLabel} </button>
				<button on:click={handleBackward} title="Skips backwards 15 seconds">
					<PlayerBackward />
				</button>
				<button
					on:click={handleTogglePlay}
					title="Toggles play"
					class="bg-primary rounded-full h-16 w-16 flex items-center justify-center text-accent"
				>
					{#if $pausedStore}
						<div in:fade={{ duration: 100 }} class="h-6 w-6">
							<PlayButton />
						</div>
					{:else}
						<div in:fade={{ duration: 100 }} class="h-6 w-6">
							<PauseButton />
						</div>
					{/if}
				</button>
				<button on:click={handleForward} title="Skips forwards 15 seconds">
					<PlayerForward />
				</button>
				<button
					class="h-4 w-4 {infinitePlay ? 'text-primary' : 'text-gray-500'}"
					on:click={() => (infinitePlay = !infinitePlay)}
				>
					<PlayerRepeat />
				</button>
			</div>
		</div>
	</div>
	<div class="flex h-36 flex-col p-4 md:hidden justify-between">
		<div class="flex">
			{#if bookmark.image}
				<div
					style={`background-image: url(${bookmark.image})`}
					class="h-12 w-12 overflow-hidden flex-shrink-0 mr-4 object-center bg-cover"
				/>
			{/if}
			<h2 class="flex h-12 font-semibold line-clamp-2 w-full overflow-hidden">
				{bookmark.title}
			</h2>
			<button
				on:click={handleTogglePlay}
				title="Toggles play"
				class="bg-primary self-end flex-shrink-0 rounded-full h-8 w-8 flex items-center justify-center text-accent"
			>
				{#if $pausedStore}
					<div in:fade={{ duration: 100 }} class="h-4 w-4">
						<PlayButton />
					</div>
				{:else}
					<div in:fade={{ duration: 100 }} class="h-4 w-4">
						<PauseButton />
					</div>
				{/if}
			</button>
		</div>
		<PlayerControls {currentTime} {duration} {setNewTime} />
	</div>
	{#if bookmark.audio}
		<audio
			autoplay={false}
			class="hidden"
			bind:volume
			bind:duration
			bind:currentTime
			bind:paused={$pausedStore}
			bind:playbackRate
			on:ended={handleEnded}
			src={`${PUBLIC_STORAGE_URL}${bookmark.audio}`}
			bind:this={$audioStore}
		/>
	{/if}
</aside>
