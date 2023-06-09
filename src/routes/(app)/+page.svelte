<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Bookmark from '$lib/components/bookmark.svelte';
	import Avatar from '$lib/components/avatar.svelte';
	import { bookmarkStore } from '$lib/store';
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

<section class="relative pt-10">
	{#if $bookmarkStore && $bookmarkStore.length > 0}
		<div class="flex justify-between px-4">
			<div class="flex items-center gap-2">
				<div class="w-14">
					<LogoIcon />
				</div>
				<div>
					<h2 class="font-domine font-bold text-2xl">My Queue</h2>
					<p class="">
						Stories: {$bookmarkStore.length}/5 <span class="px-1">•</span> Total listening time: {Math.floor(
							totalTime / 60
						)}
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
