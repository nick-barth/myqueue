<script lang="ts">
	import { PUBLIC_STORAGE_URL } from '$env/static/public';
	import { currentStore, audioStore, pausedStore, bookmarkStore } from '$lib/store';
	import { fade } from 'svelte/transition';

	import { MediaSession } from '@jofr/capacitor-media-session';
	import PlayerControls from '$lib/components/player-controls.svelte';

	import DoubleUpArrow from '$lib/icons/double-up-arrow.svg?component';
	import PlayButton from '$lib/icons/play-button.svg?component';
	import PauseButton from '$lib/icons/pause-button.svg?component';
	import PlayerBackward from '$lib/icons/player-backward.svg?component';
	import PlayerForward from '$lib/icons/player-forward.svg?component';
	import PlayerRepeat from '$lib/icons/player-repeat.svg?component';

	import type { BookmarkType } from '$types/types';
	import { onDestroy, onMount } from 'svelte';
	import { Capacitor } from '@capacitor/core';

	export let bookmark: BookmarkType;

	let currentTime: number;
	let duration: number = 0;
	let volume: number;
	let playbackRate: number = 1;
	let currentSpeedLabel: string = '1x';
	let infinitePlay: boolean = true;

	export function handleTogglePlay() {
		if ($pausedStore) {
			$audioStore?.play();
			pausedStore.update((v) => false);
			MediaSession.setPlaybackState({ playbackState: 'playing' });
		} else {
			$audioStore?.pause();
			pausedStore.update((v) => true);
			MediaSession.setPlaybackState({ playbackState: 'paused' });
		}
	}

	const getMetaData = () => {
		return {
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
		};
	};

	const updateMediaPlayer = () => {
		MediaSession.setPositionState({
			position: currentTime,
			duration: duration,
			playbackRate: playbackRate
		});
	};

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
		updateMediaPlayer();
	};
	const handleForward = () => {
		if (currentTime + 15 > duration) {
			currentTime = 0;
		} else {
			currentTime = currentTime + 15;
		}
		updateMediaPlayer();
	};

	const setNewTime = (newTime: number) => {
		currentTime = newTime;
		updateMediaPlayer();
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
		updateMediaPlayer();
	};

	if ('mediaSession' in navigator) {
		const newMetaData = new MediaMetadata(getMetaData());
		navigator.mediaSession.metadata = newMetaData;
		MediaSession.setMetadata(getMetaData());
		console.log('doing it');
	}

	let isExpanded = false;

	$: {
		MediaSession.setMetadata({
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
		updateMediaPlayer();
	}

	if (Capacitor.getPlatform() === 'android') {
		MediaSession.setActionHandler({ action: 'play' }, () => {
			pausedStore.update((v) => false);
			MediaSession.setPlaybackState({ playbackState: 'playing' });
			updateMediaPlayer();
		});

		MediaSession.setActionHandler({ action: 'pause' }, () => {
			pausedStore.update((v) => true);
			MediaSession.setPlaybackState({ playbackState: 'paused' });
			updateMediaPlayer();
		});

		MediaSession.setActionHandler({ action: 'seekto' }, (details) => {
			if (details?.seekTime) {
				currentTime = details?.seekTime;
			}
			updateMediaPlayer();
		});

		MediaSession.setActionHandler({ action: 'seekforward' }, (details) => {
			handleForward();
			updateMediaPlayer();
		});

		MediaSession.setActionHandler({ action: 'seekbackward' }, (details) => {
			handleBackward();
			updateMediaPlayer();
		});

		MediaSession.setActionHandler({ action: 'nexttrack' }, (details) => {
			handleNextTrack();
			updateMediaPlayer();
		});

		MediaSession.setActionHandler({ action: 'previoustrack' }, (details) => {
			handlePreviousTrack();
			updateMediaPlayer();
		});
	} else {
		navigator.mediaSession.setActionHandler('play', function () {
			pausedStore.update((v) => false);
			MediaSession.setPlaybackState({ playbackState: 'playing' });
			updateMediaPlayer();
		});
		navigator.mediaSession.setActionHandler('pause', function () {
			pausedStore.update((v) => true);
			MediaSession.setPlaybackState({ playbackState: 'paused' });
			updateMediaPlayer();
		});
		navigator.mediaSession.setActionHandler('previoustrack', function () {
			handleNextTrack();
			updateMediaPlayer();
		});
		navigator.mediaSession.setActionHandler('nexttrack', function () {
			handleNextTrack();
			updateMediaPlayer();
		});
	}

	const setNewTrack = (index: number) => {
		const nextBookmark = $bookmarkStore[index];
		currentStore.update((v) => nextBookmark);
		currentTime = 0;
		updateMediaPlayer();
		setTimeout(() => {
			$audioStore?.play();
		}, 30);
	};

	const handleNextTrack = () => {
		const currentIndex = $bookmarkStore?.findIndex((b) => bookmark.id === b.id);
		if (currentIndex === $bookmarkStore.length - 1) {
			console.log('it does');
			setNewTrack(0);
			return;
		}
		if (currentIndex >= 0) {
			console.log($bookmarkStore);
			if ($bookmarkStore && $bookmarkStore.length > 0) {
				setNewTrack(currentIndex + 1);
			}
		}
	};

	const handlePreviousTrack = () => {
		const currentIndex = $bookmarkStore?.findIndex((b) => bookmark.id === b.id);
		if (currentIndex === 0) {
			setNewTrack($bookmarkStore.length - 1);
			return;
		}
		const storeLength = $bookmarkStore?.length || 0;
		if (currentIndex && currentIndex < storeLength) {
			if ($bookmarkStore && $bookmarkStore.length > 0) {
				setNewTrack(currentIndex - 1);
			}
		}
	};

	const handleTimeUpdate = (e: any) => {
		updateMediaPlayer();
	};
	let audioSrc = '';
	$: {
		if (bookmark?.audio) {
			audioSrc = bookmark?.audio.includes('/public_audio/')
				? bookmark.audio
				: `${PUBLIC_STORAGE_URL}${bookmark.audio}`;
		}
	}

	const handleOnLoad = () => {
		currentTime = 0;
		updateMediaPlayer();
	};
</script>

<div
	class={`left-0 fixed ${isExpanded ? 'h-56' : 'h-28'} transition-all bottom-0 w-full bg-accent`}
>
	<aside class="flex px-6 h-full">
		<div class="max-w-2xl relative m-auto w-full h-full">
			<button
				class={`h-6 w-6 absolute left-1/2 -translate-x-1/2 top-2 z-50 ${
					isExpanded && 'rotate-180'
				}`}
				on:click={() => (isExpanded = !isExpanded)}><DoubleUpArrow /></button
			>
			<div class="absolute -top-2 w-full">
				<PlayerControls {currentTime} {duration} {setNewTime} />
			</div>
			<div class="flex flex-col justify-between h-full">
				<div class="flex pt-4 mt-8 justify-between items-center gap-4">
					<h2
						class={`flex text-lg leading-6 font-semibold h-12 md:items-center line-clamp-2 w-full overflow-hidden font-frank ${
							isExpanded && 'justify-center mt-4'
						}`}
					>
						{bookmark.title}
					</h2>
					{#if !isExpanded}
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
					{/if}
				</div>
				{#if isExpanded}
					<div class="w-full mb-4 flex items-center justify-between">
						<button on:click={handlePlayBackClick} class="text-sm w-4">
							{currentSpeedLabel}
						</button>
						<button on:click={handleBackward} title="Skips backwards 15 seconds">
							<PlayerBackward />
						</button>
						<button
							on:click={handleTogglePlay}
							disabled={!bookmark.audio}
							title="Toggles play"
							class="bg-primary self-end flex-shrink-0 rounded-full h-14 w-14 flex items-center justify-center text-accent disabled:bg-backgroundDark"
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
				{/if}
			</div>
			{#if bookmark.audio}
				<audio
					autoplay={false}
					class="hidden"
					bind:volume
					bind:duration
					bind:paused={$pausedStore}
					bind:playbackRate
					bind:currentTime
					on:ended={handleEnded}
					on:timeupdate={handleTimeUpdate}
					src={audioSrc}
					on:load={handleOnLoad}
					bind:this={$audioStore}
				/>
			{/if}
		</div>
	</aside>
</div>
