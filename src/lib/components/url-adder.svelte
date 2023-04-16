<script lang="ts">
	import Sparkle from '$lib/icons/sparkle.svg?component';
	import { addToast, userStore, bookmarkStore } from '$lib/store';
	import { findTimeDifference } from '$lib/utils/date-time';
	import db from '$lib/db';
	import { onMount } from 'svelte';

	let url: string;
	let isLoading: boolean;
	let timeDiff: number;

	$: isLoading;

	onMount(async () => {
		if ($userStore && (!$bookmarkStore || $bookmarkStore.length === 0)) {
			timeDiff = findTimeDifference($userStore.created_at);
			if (timeDiff < 2) {
				url =
					'https://medium.com/@playmyqueue/welcome-to-my-queue-save-articles-you-want-to-read-to-your-personal-queue-and-listen-to-them-on-187ab93abf2a';
				handlePaste();
			}
		}
	});

	const handleSubmit = async () => {
		if (isLoading) {
			return;
		}

		isLoading = true;
		const res = await db.bookmarks.post(url);

		if (res.error) {
			addToast({
				content: 'Oops, that did not work, maybe we cannnot read the article',
				type: 'error'
			});
		} else {
			addToast({
				content: 'Successfully added to queue',
				type: 'success'
			});
		}

		isLoading = false;
		url = '';
	};

	const handlePaste = () => {
		// Onpaste fires before onchange, 4ms is the difference
		setTimeout(() => {
			handleSubmit();
		}, 4);
	};
</script>

<div class="w-full max-w-4xl m-auto mr-[385px] px-4 md:px-8 mb-6">
	<form on:submit={handleSubmit} class="flex flex-row w-full relative">
		<input
			on:paste={handlePaste}
			bind:value={url}
			placeholder="Paste a URL"
			class="w-full h-12 pl-6 border rounded-primary border-gray800 pr-24 outline-none"
		/>
		<div
			class="absolute top-1 right-1 transition-all duration-300 {isLoading
				? 'min-w-[calc(100%-8px)]'
				: 'min-w-0'}"
		>
			<button
				type="submit"
				disabled={isLoading}
				class="{isLoading
					? 'gradient-animation'
					: 'bg-accent2'} transition-all duration-150 rounded-primary h-10 flex gap-2 items-center justify-center px-4 w-full"
				>{#if !isLoading}
					Save & listen
				{:else}
					Generating audio story
				{/if}
				<div class="h-6 w-6"><Sparkle /></div>
			</button>
		</div>
	</form>
</div>

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
