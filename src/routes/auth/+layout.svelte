<script lang="ts">
	import { userStore } from '$lib/store';
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import { page } from '$app/stores';
</script>

<div class="w-full">
	<div class="w-full flex justify-end items-center gap-2 pr-8 mt-8">
		{#if $page.url.pathname.includes('signup')}
			<p class="text-sm">I already have an account</p>
			<a href="/auth/signin" class="bg-background py-2 px-4 font-semibold text-sm rounded-primary"
				>Sign in</a
			>
		{:else}
			<p class="text-sm">I don't have an account</p>
			<a href="/auth/signup" class="bg-background py-2 px-4 font-semibold text-sm rounded-primary"
				>Sign up</a
			>
		{/if}
	</div>
	<section class="flex flex-col justify-center items-center mb-16">
		<div class="w-44 mb-6" title="My queue logo"><LogoWithText /></div>
		<h2 class="font-bold text-2xl font-domine">Listen to your favorite articles</h2>
	</section>
	<slot />
</div>
