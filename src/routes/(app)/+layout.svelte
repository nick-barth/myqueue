<script lang="ts">
	import DiscoveryBar from '$lib/components/discovery-bar.svelte';
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

	onMount(async () => {
		await db.bookmarks.get();
		isLoading = false;
	});
</script>

{#if user}
	<Toasts />
	<div class="mb-80">
		<div class="">
			<main class="max-w-7xl m-auto">
				{#if !isLoading}
					<slot />
				{/if}
			</main>
			<aside class="relative flex items-end p-4 col-span-2">
				{#if $currentStore}
					<div
						class="left-0 fixed h-28 bottom-28 w-full bg-white"
						transition:fly={{ y: 200, duration: 300 }}
					>
						<DiscoveryBar />
					</div>
					<div
						class="left-0 fixed h-28 bottom-0 w-full bg-accent"
						transition:fly={{ y: 200, duration: 300 }}
					>
						<Player bookmark={$currentStore} />
					</div>
				{/if}
			</aside>
		</div>
	</div>
{/if}
