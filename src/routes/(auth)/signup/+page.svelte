<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import GoogleG from '$lib/icons/google-g.svg?component';
	import db, { supabase } from '$lib/db';
	import Apple from '$lib/icons/apple.svg?component';
	import { createForm } from 'felte';

	import { validator } from '@felte/validator-zod';
	import * as zod from 'zod';
	import {
		SignInWithApple,
		type SignInWithAppleResponse
	} from '@capacitor-community/apple-sign-in';
	import { Capacitor } from '@capacitor/core';
	import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

	let isLoading = false;
	let hasSignedUp = false;

	const schema = zod.object({
		email: zod.string().email().nonempty(),
		password: zod.string().nonempty().min(6)
	});

	let error: string;

	const { form, isValid, touched } = createForm({
		extend: validator({ schema }),
		onSubmit: async (values) => {
			isLoading = true;
			const res = await db.signUp(values.email, values.password);
			if (res.error) {
				error = 'Invalid credentials';
			} else {
				hasSignedUp = true;
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
			redirectURI: 'https://play.myqueue.so/',
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
	let isIos = false;
	if (Capacitor.getPlatform() === 'ios') {
		isIos = true;
	}

	const handleGoogleLogin = async () => {
		if (isIos) {
			const res = await GoogleAuth.signIn();
			const result = await supabase.auth.signInWithIdToken({
				provider: 'google',
				token: res.authentication.idToken,
				access_token: res.authentication.accessToken,
				nonce: 'nonce'
			});
			goto('/');
		} else {
			const res = await db.signInWithGoogle();
		}
	};
</script>

<section class="max-w-[448px] w-full flex m-auto justify-center flex-col">
	{#if !hasSignedUp}
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
			Sign up with google
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

			<Button {isLoading} isDisabled={$touched && !$isValid} type="submit"
				>Create my free account</Button
			>
			{#if error}
				<div class="flex text-red-500 justify-center">
					{error}
				</div>
			{/if}
		</form>
	{:else}
		<div class="flex text-center">
			Hey! Thank you for signing up, but first you have to verify your email address. We sent you an
			email, click on the link to start listening.
		</div>
	{/if}
</section>
