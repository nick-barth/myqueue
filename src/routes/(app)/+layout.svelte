<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { fly } from 'svelte/transition';
	import { currentStore, userStore, readingStore } from '$lib/store';
	import Toasts from '$lib/components/toasts.svelte';
	import type { UserType } from '$types/types';
	import Player from '$lib/components/player.svelte';
	import { onMount } from 'svelte';
	import db from '$lib/db';

	let isLoading = true;
	let user: UserType | null = null;
	userStore.subscribe((v) => {
		user = v;
	});

	let hidePlayer = false;

	let innerWidth: number;
	$: hidePlayer = !!(innerWidth < 943 && $readingStore);

	onMount(async () => {
		await db.bookmarks.get();
		isLoading = false;
	});
</script>

<svelte:window bind:innerWidth />

{#if user}
	<div class="w-full pb-32 md:pb-0">
		<div class="sticky top-0 bg-white md:mr-[385px] z-50">
			<Header />
		</div>
		<div class="flex md:mr-[385px] flex-col">
			<div class="relative z-30">
				<Toasts />
			</div>
			{#if !isLoading}
				<slot />
			{/if}
		</div>
		{#if $currentStore && $currentStore.content && !hidePlayer}
			<aside
				class="md:max-w-[355px] fixed z-50 w-full md:h-full bottom-0 md:top-auto md:left-auto md:right-0 md:bottom-0 bg-accent"
				transition:fly={{ y: 200, duration: 300 }}
			>
				<Player bookmark={$currentStore} />
			</aside>
		{/if}
	</div>
{/if}
