<script>
	import { goto } from '$app/navigation';
	import db from '../db';
	let user = db.user;

	if (!$user) {
		console.log('what');
		goto('/');
	}
	const handleLogout = async () => {
		db.signOut();
		goto('/');
	};
</script>

<div>
	{#if $user}{$user.email}{/if}
	<button on:click={handleLogout}>Logout</button>
	<slot />
</div>
