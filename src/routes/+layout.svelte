<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import { userStore } from '$lib/store';
	import { page } from '$app/stores';
	import type { UserType } from '$types/types';
	import { onMount } from 'svelte';
	import db, { supabase } from '$lib/db';
	import { PUBLIC_MIXPANEL_KEY, PUBLIC_TITLE } from '$env/static/public';
	import { App, type URLOpenListenerEvent } from '@capacitor/app';

	import mixpanel from 'mixpanel-browser';

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
				userStore.set(session.user);
				goto('/');
			} else if (event == 'SIGNED_OUT') {
				userStore.set(null);
				goto('/signin');
			}
		});

		App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
			// Example url: https://beerswift.app/tabs/tabs2
			// slug = /tabs/tabs2
			const slug = event.url.split('.app').pop();

			// We only push to the route if there is a slug present
			if (slug) {
				router.push({
					path: slug
				});
			}
		});
	});
</script>

<svelte:head>
	<title>{PUBLIC_TITLE}</title>
</svelte:head>

<slot />
