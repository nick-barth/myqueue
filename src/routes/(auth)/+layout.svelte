<script lang="ts">
	import { userStore } from '$lib/store';
	import Button from '$lib/components/button.svelte';
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import { page } from '$app/stores';
</script>

<div class="w-full p-4">
	<section class="flex flex-col justify-center items-center mb-16">
		<div class="w-44 mb-6" title="My queue logo"><LogoWithText /></div>
		<h2 class="font-bold text-2xl font-frank">Listen to your favorite articles</h2>
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
