<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { goto } from '$app/navigation';
	import '../app.css';
	import { userStore } from '$lib/store';

	let user;
	userStore.subscribe((v) => {
		user = v;
	});

	if (!user) {
		goto('/signin');
	}
</script>

<svelte:head>
	<title>My Queue</title>
</svelte:head>

<div class="w-full">
	<div class="sticky top-0 bg-white">
		<Header />
	</div>
	<slot />
</div>
