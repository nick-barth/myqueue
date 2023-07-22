<script lang="ts">
	import { userStore } from '$lib/store';
	import Button from '$lib/components/button.svelte';
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import { page } from '$app/stores';
	import { Capacitor } from '@capacitor/core';

	let isIos = false;
	if (Capacitor.getPlatform() === 'ios') {
		isIos = true;
	}
</script>

<div class={`w-full p-4 bg-white ${isIos ? '-mt-20 pt-20' : 'pt-10 -mt-10'}`}>
	<section class="flex flex-col justify-center items-center mb-16">
		<div class="w-44 mb-6" title="My queue logo"><LogoWithText /></div>
		<h2 class="font-bold text-2xl font-frank">Listen to articles</h2>
	</section>
	<slot />
	<div class="flex flex-col justify-center items-center mt-10">
		{#if $page.url.pathname.includes('signup')}
			<p class="text-sm">I already have an account</p>
			<a href="/signin" class="underline">Sign in</a>
		{:else}
			<p class="text-sm">I don't have an account</p>
			<a href="/signup" class="underline">Sign up</a>
		{/if}
	</div>
</div>
