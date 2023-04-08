<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { goto } from '$app/navigation';
	import '../app.css';
	import { userStore } from '$lib/store';
	import { page } from '$app/stores';
	import type { UserType } from '$types/types';

	let user: UserType | null = null;
	userStore.subscribe((v) => {
		user = v;
	});

	if (!user && !$page.url.pathname.includes('/auth/')) {
		goto('/auth/signin');
	}
	if (user && $page.url.pathname.includes('/auth/')) {
		goto('/');
	}
</script>

<svelte:head>
	<title>My Queue</title>
</svelte:head>

<div class="w-full">
	{#if user}
		<div class="sticky top-0 bg-white">
			<Header />
		</div>
	{/if}
	<slot />
</div>
