<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import GoogleG from '$lib/icons/google-g.svg?component';
	import db from '$lib/db';
	import { createForm } from 'felte';

	import { validator } from '@felte/validator-zod';
	import * as zod from 'zod';

	const schema = zod.object({
		email: zod.string().email().nonempty(),
		password: zod.string().nonempty().min(6)
	});

	let error: string;

	const { form, isValid, touched } = createForm({
		extend: validator({ schema }),
		onSubmit: async (values) => {
			const res = await db.signIn(values.email, values.password);
			if (res.error) {
				error = 'Invalid credentials';
			} else {
				goto('/');
			}
		}
	});

	const handleGoogleLogin = async () => {
		const res = await db.signInWithGoogle();
	};
</script>

<section class="max-w-[448px] w-full flex m-auto justify-center flex-col">
	<button
		class="h-12 gap-2 w-full flex justify-center items-center text-primary font-semibold rounded-primary border border-primary"
		on:click={handleGoogleLogin}
	>
		<span class="h-6 w-6">
			<GoogleG />
		</span>
		Sign up with google
	</button>

	<span class="flex self-center my-4 text-sm"> OR </span>

	<form class="flex gap-4 flex-col" use:form>
		<input
			class="h-12 gap-2 pl-4 w-full flex justify-center items-center text-primary rounded-primary border border-background bg-background"
			name="email"
			type="email"
			placeholder="Email"
			required
		/>
		<input
			class="h-12 gap-2 pl-4 w-full flex justify-center items-center text-primary rounded-primary border border-background bg-background"
			name="password"
			type="password"
			placeholder="Password"
			required
		/>
		<p class="px-4 text-xs">
			By creating your account, you agree to My Queue's <a
				class="underline"
				target="_blank"
				href="https://myqueue.so/tos"
			>
				Terms of Service
			</a>
			and
			<a class="underline" target="_blank" href="https://myqueue.so/privacy-policy"
				>Privacy policy</a
			>
		</p>

		<Button isDisabled={$touched && !$isValid} type="submit">Create my free account</Button>
		{#if error}
			<div class="flex text-red-500 justify-center">
				{error}
			</div>
		{/if}
	</form>
</section>
