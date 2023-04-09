<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { goto } from '$app/navigation';
	import '../app.css';
	import { userStore } from '$lib/store';
	import { page } from '$app/stores';
	import type { UserType } from '$types/types';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/db';

	let user: UserType | null = null;
	userStore.subscribe((v) => {
		user = v;
	});

	$: if (!user && !$page.url.pathname.includes('/auth/')) {
		console.log(
			'we are running in the browser, not signed in, and not on the sign in page, we are going to the sign in page'
		);
		goto('/auth/signin');
	}

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session?.user) {
				goto('/');
				userStore.set(data.session.user);
			} else {
				if (!$page.url.pathname.includes('/auth/')) {
					goto('/auth/signin');
				}
			}
		});

		supabase.auth.onAuthStateChange((event, session) => {
			if (event == 'SIGNED_IN' && session?.user) {
				userStore.set(session.user);
				goto('/');
			} else if (event == 'SIGNED_OUT') {
				userStore.set(null);
				goto('/auth/signin');
			}
		});
	});
</script>

<svelte:head>
	<title>My Queue</title>
</svelte:head>

<div class="w-full">
	{#if user}
		<div class="sticky top-0 bg-white md:mr-[385px] z-50">
			<Header />
		</div>
	{/if}
	<slot />
</div>
