<script lang="ts">
	import { combineMeta } from '$lib/utils/bookmark';
	import { formatToMmss } from '$lib/utils/date-time';
	import { onMount } from 'svelte';
	import { selectedBookmark } from '$lib/store.js';

	import PlayButton from '$lib/icons/play-button.svg?component';
	import CloseButton from '$lib/icons/close-button.svg?component';
	import PlayerBackward from '$lib/icons/player-backward.svg?component';
	import PlayerForward from '$lib/icons/player-forward.svg?component';
	import PlayerRepeat from '$lib/icons/player-repeat.svg?component';

	import type { BookmarkType } from '$types/types';

	export let bookmark: BookmarkType;

	export let audioPlayer: HTMLAudioElement | null = null;
	let currentTime: number;
	let duration: number;
	let paused: boolean;

	let displayTime: string;
	let percentLeft: string;
	$: percentLeft = `${(100 * currentTime) / duration}%`;
	$: displayTime = formatToMmss(currentTime);
	$: displayDuration = formatToMmss(duration);

	onMount(async () => {
		audioPlayer?.play();
	});

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

	const meta = combineMeta(bookmark);
</script>

<aside class="flex flex-col h-full justify-between">
	<div>
		<div>
			<img class="min-w-full max-h-56" src={bookmark.image} alt="Related to the article" />
			<button class="absolute top-6 right-6" on:click={() => selectedBookmark.update((v) => null)}>
				<CloseButton />
			</button>
		</div>
		<div class="p-6">
			<h2 class="flex font-bold text-xl">
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
		<div class="w-full">
			<div class="w-full h-1 bg-slate-300 relative">
				<div
					style="left: {percentLeft}"
					class="absolute h-3 w-3 top-0 rounded-full bg-primary -translate-y-1/3 transition-all ease-out duration-75"
				/>
			</div>
			<div class="w-full justify-between flex text-sm mt-2">
				<div>{displayTime}</div>
				<div>{displayDuration}</div>
			</div>
		</div>
		<div class="w-full mt-6 flex items-center justify-between">
			<button class="text-sm"> 1x </button>
			<button on:click={handleBackward} title="Skips backwards 15 seconds">
				<PlayerBackward />
			</button>
			<button
				on:click={() => (paused = !paused)}
				title="Toggles play"
				class="bg-primary rounded-full h-16 w-16 flex items-center justify-center"
			>
				{#if paused}
					<div class="pl-1 overflow-visible">
						<PlayButton />
					</div>
				{:else}
					<div class="pl-1">
						<PlayButton />
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
		<figure>
			<audio
				bind:paused
				bind:duration
				bind:currentTime
				bind:this={audioPlayer}
				src="https://paddechpmdutxepollwl.supabase.co/storage/v1/object/public/audio/{bookmark.audio}"
			/>
		</figure>
	</div>
</aside>
