<script lang="ts">
	import { goto } from '$app/navigation';
	import db from '$lib/db';
	let email: string,
		password: string,
		sent = false;
	async function submit() {
		await db.signIn(email, password);
	}

	const handleGoogleLogin = async () => {
		const res = await db.signInWithGoogle();
	};
</script>

<div class="">
	<div class="">
		<h1>Sign in</h1>
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
		<button on:click={handleGoogleLogin}>GOogle button </button>
	</div>
</div>
