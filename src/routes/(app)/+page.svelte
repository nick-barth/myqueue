<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Bookmark from '$lib/components/bookmark.svelte';
	import Avatar from '$lib/components/avatar-circle.svelte';
	import { bookmarkStore, planStore } from '$lib/store';
	import LogoIcon from '$lib/icons/logo-icon.svg?component';

	let totalTime: number = 0;

	$: totalTime =
		$bookmarkStore?.reduce((acc, bookmark) => {
			if (bookmark?.read_time) {
				return acc + bookmark.read_time;
			}
			return acc;
		}, 0) ?? 0;
</script>

<section class={`relative`}>
	{#if $bookmarkStore && $bookmarkStore.length > 0}
		<div class="flex justify-between px-6 mb-4">
			<div class="flex items-center">
				<div class="w-11 h-14 mr-2">
					<LogoIcon />
				</div>
				<div>
					<h2 class="font-frank font-bold text-2xl">My Queue</h2>
					<p class="text-xs">
						Stories: {$bookmarkStore.length}{#if !$planStore} /5{/if} <span class="px-1">•</span>
						Total listening time: {Math.floor(totalTime / 60)}
						{Math.floor(totalTime / 60) > 1 ? 'mins' : 'min'}
					</p>
				</div>
			</div>
			<div class="relative">
				<Avatar />
			</div>
		</div>
		{#each $bookmarkStore as bookmark (bookmark.id)}
			<div animate:flip={{ duration: 300 }} in:fade={{ duration: 300 }}>
				<Bookmark {bookmark} />
			</div>
		{/each}
	{:else}
		<div>Empty queue</div>
	{/if}
</section>
