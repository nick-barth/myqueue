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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Domine:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<slot />
