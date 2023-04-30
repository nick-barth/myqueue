<script lang="ts">
	import { userStore } from '$lib/store';
	import Button from '$lib/components/button.svelte';
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import { page } from '$app/stores';
</script>

<div class="w-full p-4">
	<section class="flex flex-col justify-center items-center mb-16">
		<div class="w-44 mb-6" title="My queue logo"><LogoWithText /></div>
		<h2 class="font-bold text-2xl font-domine">Listen to your favorite articles</h2>
	</section>
	<section class="max-w-[448px] m-auto">
		<slot />
		<div class="w-full flex justify-end items-center gap-2 mt-8">
			{#if $page.url.pathname.includes('signup')}
				<p class="text-sm">I already have an account</p>
				<Button size="sm" variant="secondary" classes="w-auto">
					<a href="/signin">Sign in</a>
				</Button>
			{:else}
				<p class="text-sm">I don't have an account</p>
				<Button size="sm" variant="secondary" classes="w-auto">
					<a href="/signup">Sign up</a>
				</Button>
			{/if}
		</div>
	</section>
</div>
