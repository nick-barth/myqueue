<script lang="ts">
	import { combineMeta } from '$lib/utils/bookmark';
	import { onMount } from 'svelte';
	import { intervalToDuration } from 'date-fns';

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
		<button class="absolute top-6 right-6" on:click={() => setSelectedBookmark(null)}
			><svg
				width="34"
				height="34"
				viewBox="0 0 34 34"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					opacity="0.24"
					d="M1 16.9974C1.08668 17.9661 1.12863 18.9407 1.26285 19.8974C1.87243 24.1919 3.76829 27.6947 7.23005 29.9889C12.7554 33.6567 18.6192 33.8276 24.5556 31.2935C27.5616 30.0099 29.8741 27.7487 31.3589 24.6088C32.95 21.2409 33.3191 17.6812 32.7459 13.9834C31.8762 8.39035 28.9346 4.57266 24.0831 2.43139C20.7443 0.958896 17.2602 0.700985 13.7285 1.30078C10.6387 1.8256 7.81726 3.05818 5.48798 5.37638C2.3422 8.51031 1.05872 12.4779 1 16.9974Z"
					stroke="white"
					stroke-width="2"
				/>
				<path
					d="M13.2354 13.0006L20.7648 21.001"
					stroke="white"
					stroke-width="2"
					stroke-linecap="square"
					stroke-linejoin="round"
				/>
				<path
					d="M20.7648 13.0006L13.2354 21.001"
					stroke="white"
					stroke-width="2"
					stroke-linecap="square"
					stroke-linejoin="round"
				/>
			</svg>
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
				><svg
					class="pl-1"
					width="20"
					height="23"
					viewBox="0 0 20 23"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0.046511 22.1935L0 0.557571L20 11.0073L0.046511 22.1935Z" fill="#F4F4F4" />
				</svg>
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
