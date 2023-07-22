<script lang="ts">
	import { goto } from '$app/navigation';
	import GoogleG from '$lib/icons/google-g.svg?component';
	import Apple from '$lib/icons/apple.svg?component';
	import db, { supabase } from '$lib/db';
	import { createForm } from 'felte';
	import Button from '$lib/components/button.svelte';

	import { validator } from '@felte/validator-zod';
	import * as zod from 'zod';

	import { SignInWithApple } from '@capacitor-community/apple-sign-in';
	import type { SignInWithAppleResponse } from '@capacitor-community/apple-sign-in';
	import { Capacitor } from '@capacitor/core';

	const schema = zod.object({
		email: zod.string().email().nonempty(),
		password: zod.string().nonempty().min(6)
	});

	let isLoading: boolean = false;
	let error: string;

	const { form, isValid } = createForm({
		extend: validator({ schema }),
		onSubmit: async (values) => {
			isLoading = true;
			const res = await db.signIn(values.email, values.password);
			if (res.error) {
				error = 'Invalid credentials';
			} else {
				goto('/');
			}
			isLoading = false;
		}
	});

	const sha256 = async (message: string) => {
		// encode as UTF-8
		const msgBuffer = new TextEncoder().encode(message);

		// hash the message
		const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

		// convert ArrayBuffer to Array
		const hashArray = Array.from(new Uint8Array(hashBuffer));

		// convert bytes to hex string
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
		return hashHex;
	};

	const handleAppleLogin = async () => {
		const nonce = 'nonce';
		const hashedNonceHex = await sha256(nonce); // see next function

		let options = {
			clientId: 'so.play.myqueue',
			redirectURI: 'https://play.myqueue.so',
			scopes: 'email name',
			state: '12345',
			nonce: hashedNonceHex
		};

		const result: SignInWithAppleResponse = await SignInWithApple.authorize(options);
		const res = await supabase.auth.signInWithIdToken({
			provider: 'apple',
			token: result.response.identityToken,
			nonce: nonce
		});
		goto('/');
	};

	const handleGoogleLogin = async () => {
		const res = await db.signInWithGoogle();
	};

	let isIos = false;
	if (Capacitor.getPlatform() === 'ios') {
		isIos = true;
	}
</script>

<section class="max-w-[448px] w-full flex m-auto justify-center flex-col">
	{#if isIos}
		<button
			class="h-12 gap-2 mb-4 w-full flex justify-center items-center text-primary rounded-primary border border-primary"
			on:click={handleAppleLogin}
		>
			<span class="h-6 w-6 mr-2 flex flex-end">
				<Apple />
			</span>
			Continue with Apple
		</button>
	{/if}
	<button
		class="h-12 gap-2 w-full flex justify-center items-center text-primary rounded-primary border border-primary"
		on:click={handleGoogleLogin}
	>
		<span class="h-6 w-6 mr-2">
			<GoogleG />
		</span>
		Continue with Google
	</button>

	<span class="flex self-center my-4 text-sm"> OR </span>

	<form class="flex gap-4 flex-col" use:form>
		<input
			class="h-12 mb-2 pl-4 w-full flex justify-center items-center text-primary rounded-primary border border-gray-300 bg-background"
			name="email"
			type="email"
			placeholder="Email"
			required
		/>
		<input
			class="h-12 mb-2 pl-4 w-full flex justify-center items-center text-primary rounded-primary border border-gray-300 bg-background"
			name="password"
			type="password"
			placeholder="Password"
			required
		/>
		<Button {isLoading} type="submit" isDisabled={!$isValid}>Sign in</Button>
		{#if error}
			<div class="flex text-red-500 justify-center">
				{error}
			</div>
		{/if}
	</form>
</section>
