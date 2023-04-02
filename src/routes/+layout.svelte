<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import db from './db';
	let user = db.user;

	if (!$user) {
		goto('/signin');
	}
</script>

<div class="color-slate-700 bg-slate-100">
	<slot />
</div>
