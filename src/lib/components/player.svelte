<script lang="ts">
	import { PUBLIC_STORAGE_URL } from '$env/static/public';
	import { combineMeta } from '$lib/utils/bookmark';
	import { currentStore, audioStore } from '$lib/store';
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

	let prevSrc: string;
	let currentTime: number;
	let duration: number;
	let volume: number;
	let paused: boolean;
	let playbackRate: number;

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

	const handleTogglePlay = () => {
		if (paused) {
			paused = false;
		} else {
			paused = true;
		}
	};

	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: bookmark.title || undefined,
			artist: bookmark.authors.length > 0 ? bookmark.authors.join(', ') : undefined,
			album: 'My Queue',
			artwork: [
				{ src: 'https://via.placeholder.com/96', sizes: '96x96', type: 'image/png' },
				{ src: 'https://via.placeholder.com/128', sizes: '128x128', type: 'image/png' },
				{ src: 'https://via.placeholder.com/192', sizes: '192x192', type: 'image/png' },
				{ src: 'https://via.placeholder.com/256', sizes: '256x256', type: 'image/png' },
				{ src: 'https://via.placeholder.com/384', sizes: '384x384', type: 'image/png' },
				{ src: 'https://via.placeholder.com/512', sizes: '512x512', type: 'image/png' }
			]
		});
	}

	$: {
		if (prevSrc !== bookmark.audio) {
			setTimeout(() => {
				if (paused) {
					$audioStore?.pause();
				} else {
					$audioStore?.play();
				}
			}, 0);
		}
		prevSrc = bookmark.audio || '';
	}

	const meta = combineMeta(bookmark);
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
				<h2 class="flex font-bold text-xl font-domine">
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
				<button class="text-sm"> 1x </button>
				<button on:click={handleBackward} title="Skips backwards 15 seconds">
					<PlayerBackward />
				</button>
				<button
					on:click={handleTogglePlay}
					title="Toggles play"
					class="bg-primary rounded-full h-16 w-16 flex items-center justify-center text-accent"
				>
					{#if paused}
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
				<button>
					<PlayerRepeat />
				</button>
			</div>
		</div>
	</div>
	<div class="flex-col h-full justify-between flex md:hidden">mobile player</div>
	<audio
		class="hidden"
		bind:volume
		bind:duration
		bind:currentTime
		bind:paused
		bind:playbackRate
		bind:this={$audioStore}
		src={`${PUBLIC_STORAGE_URL}${bookmark.audio}`}
	/>
</aside>
