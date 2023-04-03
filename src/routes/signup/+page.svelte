<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import db from '$lib/db';
	let email: string,
		password: string,
		sent = false;
	async function submit() {
		await db.signUp(email, password);
		sent = true;
	}
</script>

<div class="">
	<div class="">
		<h1>Sign up</h1>
		<form on:submit|preventDefault={submit}>
			<label>
				<span>E-mail Address</span>
				<input name="email" type="email" required bind:value={email} />
				<input name="password" type="password" required bind:value={password} />
			</label>
			<button class="border-2 border-blue-500">
				<span>Signup</span>
			</button>
		</form>
	</div>
</div>
