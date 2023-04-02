<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import db from './db';
	let user = db.user;

	if (!$user) {
		goto('/signin');
	}
</script>

<div class="max-w-screen-2xl w-full">
	<slot />
</div>
