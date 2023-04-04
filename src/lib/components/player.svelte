<script lang="ts">
	import { combineMeta } from '$lib/utils/bookmark';
	import { onMount } from 'svelte';
	import { intervalToDuration } from 'date-fns';
	import PlayButton from '$lib/icons/play-button.svg?component';
	import CloseButton from '$lib/icons/close-button.svg?component';

	import type { BookmarkType } from '$types/types';

	export let bookmark: BookmarkType;
	export let setSelectedBookmark: (arg1: BookmarkType | null) => void;

	export let audioPlayer: HTMLAudioElement | null = null;
	let currentTime: number;
	let duration: number;

	const zeroPad = (num: number | undefined) => String(num).padStart(2, '0');

	const formatToMmss = (seconds: number) => {
		if (!seconds) {
			return '00:00';
		}
		const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
		const formatted = `${duration.minutes}:${zeroPad(duration.seconds)}`;
		return formatted;
	};

	$: volume = 0;
	let displayTime: string;
	let percentLeft: string;
	$: percentLeft = `${(100 * currentTime) / duration}%`;
	$: displayTime = formatToMmss(currentTime);
	$: displayDuration = formatToMmss(duration);

	onMount(async () => {
		audioPlayer?.play();
	});

	const meta = combineMeta(bookmark);
</script>

<aside>
	<div>
		<img class="min-w-full max-h-56" src={bookmark.image} alt="Related to the article" />
		<button class="absolute top-6 right-6" on:click={() => setSelectedBookmark(null)}>
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
		<div class="w-full">
			<div class="w-full h-1 bg-slate-300 relative">
				<div
					style="left: {percentLeft}"
					class="absolute h-3 w-3 top-0 rounded-full bg-colors-primary -translate-y-1/3 transition-all ease-out duration-75"
				/>
			</div>
			<div class="w-full justify-between flex text-sm mt-2">
				<div>{displayTime}</div>
				<div>{displayDuration}</div>
			</div>
		</div>
		<div class="w-full mt-6 flex items-center justify-center">
			<button class="bg-colors-primary rounded-full h-16 w-16 flex items-center justify-center"
				><PlayButton />
			</button>
		</div>
		<figure>
			<audio
				bind:volume
				bind:duration
				bind:currentTime
				bind:this={audioPlayer}
				src="https://paddechpmdutxepollwl.supabase.co/storage/v1/object/public/audio/{bookmark.audio}"
			/>
		</figure>
	</div>
</aside>
