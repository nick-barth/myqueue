<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { goto } from '$app/navigation';
	import '../app.css';
	import db from '$lib/db';
	let user = db.user;

	if (!$user) {
		goto('/signin');
	}
</script>

<div class="max-w-screen-2xl w-full px-6 py-3">
	<Header />
	<slot />
</div>
