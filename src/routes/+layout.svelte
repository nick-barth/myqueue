<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import { userStore } from '$lib/store';
	import { page } from '$app/stores';
	import type { UserType } from '$types/types';
	import { onMount } from 'svelte';
	import db, { supabase } from '$lib/db';
	import { PUBLIC_MIXPANEL_KEY, PUBLIC_TITLE } from '$env/static/public';
	import mixpanel from 'mixpanel-browser';
	import { App } from '@capacitor/app';
	import type { URLOpenListenerEvent } from '@capacitor/app';
	import { Capacitor } from '@capacitor/core';

	mixpanel.init(PUBLIC_MIXPANEL_KEY);

	let user: UserType | null = null;
	userStore.subscribe((v) => {
		user = v;
	});

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session?.user) {
				userStore.set(data.session.user);
				mixpanel.identify(data.session.user.id);
				mixpanel.people.set({ $email: data.session.user.email });
				db.billing.getUserPlan();
			} else {
				if (!$page.url.pathname.includes('/sign')) {
					goto('/signin');
				}
			}
		});

		supabase.auth.onAuthStateChange((event, session) => {
			if (event == 'SIGNED_IN' && session?.user) {
				console.log('ok ok');
				userStore.set(session.user);
				goto('/');
			} else if (event == 'SIGNED_OUT') {
				userStore.set(null);
				goto('/signin');
			}
		});

		App.addListener('appUrlOpen', async function (event: URLOpenListenerEvent) {
			const refresh_token = event.url.split('&refresh_token')[1].split('&')[0].split('=')[1];
			const { data, error } = await supabase.auth.refreshSession({ refresh_token });
			if (data.session?.user) {
				userStore.set(data.session.user);
				mixpanel.identify(data.session.user.id);
				mixpanel.people.set({ $email: data.session.user.email });
				db.billing.getUserPlan();
				goto('/');
			}
		});
	});
	let isIos = false;
	if (Capacitor.getPlatform() === 'ios') {
		isIos = true;
	}
</script>

<svelte:head>
	<title>{PUBLIC_TITLE}</title>
</svelte:head>

<main class={`bg-background ${isIos ? 'pt-20' : 'pt-10'}`}>
	<slot />
</main>
