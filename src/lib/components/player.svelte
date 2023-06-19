<script lang="ts">
	import { PUBLIC_STORAGE_URL } from '$env/static/public';
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

	let isExpanded = false;
</script>

<div
	class={`left-0 fixed ${isExpanded ? 'h-56' : 'h-28'} transition-all bottom-0 w-full bg-accent`}
>
	<aside class="flex px-6">
		<div class="max-w-2xl relative m-auto w-full">
			<div class="absolute -top-2 w-full">
				<PlayerControls {currentTime} {duration} {setNewTime} />
			</div>
			<div class="flex pt-4 mt-8 justify-between items-center gap-4">
				<h2
					class="flex text-lg leading-6 font-semibold h-12 md:items-center line-clamp-2 w-full overflow-hidden font-frank"
				>
					{bookmark.title}
				</h2>
				<button
					on:click={handleTogglePlay}
					disabled={!bookmark.audio}
					title="Toggles play"
					class="bg-primary self-end flex-shrink-0 rounded-full h-10 w-10 flex items-center justify-center text-accent disabled:bg-backgroundDark"
				>
					{#if $pausedStore}
						<div in:fade={{ duration: 100 }} class="w-4 h-4">
							<PlayButton />
						</div>
					{:else}
						<div in:fade={{ duration: 100 }} class="w-4 h-4">
							<PauseButton />
						</div>
					{/if}
				</button>
				<!-- replace when working -->
				<!-- <div class="w-full mt-2 flex items-center justify-between">
			<button on:click={handlePlayBackClick} class="text-sm w-4"> {currentSpeedLabel} </button>
			<button on:click={handleBackward} title="Skips backwards 15 seconds">
				<PlayerBackward />
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
		</div> -->
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
					src={bookmark.audio.includes('/public_audio/')
						? bookmark.audio
						: `${PUBLIC_STORAGE_URL}${bookmark.audio}`}
					bind:this={$audioStore}
				/>
			{/if}
		</div>
	</aside>
</div>
