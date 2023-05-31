<script lang="ts">
	import HamburgerMenu from '$lib/components/hamburger-menu.svelte';
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
	<div class="mb-32 md:mb-0">
		<div class="grid grid-cols-1 md:grid-cols-6">
			<main class="mt-0 md:mt-14 col-span-3">
				{#if !isLoading}
					<slot />
				{/if}
			</main>
			<aside class="relative flex items-end p-4 col-span-2">
				{#if $currentStore}
					<div
						class="h-40 left-0 fixed bottom-0 w-full md:sticky md:bottom-4 bg-accent"
						transition:fly={{ y: 200, duration: 300 }}
					>
						<Player bookmark={$currentStore} />
					</div>
				{/if}
			</aside>
		</div>
	</div>
{/if}
