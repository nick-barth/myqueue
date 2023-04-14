<script lang="ts">
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import ContextMenu from '$lib/components/context-menu.svelte';

	import { userStore, limitsStore } from '$lib/store';
	import type { UserType } from '$types/types';
	import db from '$lib/db';
	import { goto } from '$app/navigation';

	let user: UserType | null;
	userStore.subscribe((v) => {
		user = v;
	});

	const handleLogout = async () => {
		await db.signOut();
	};
</script>

<header class="p-4 md:px-6 md:p-6 w-full justify-between flex relative">
	<div class="w-28">
		<LogoWithText />
	</div>
	{#if $limitsStore}
		<div
			class="bg-accent2 absolute max-w-2xl p-2 text-sm rounded-sm top-0 left-1/2 -translate-x-1/2"
		>
			Dope! We really appreciate you playing around with your Queue! However servers cost money and
			we're broke, so we currently have a limit on amount of audio you can have generated. If you're
			super into the product, pop us a message, and we'll remove your limit.
		</div>
	{/if}
	<ContextMenu position="right">
		<div slot="icon" class="overflow-hidden rounded-full h-10 w-10">
			{#if user?.user_metadata.avatar_url}
				<img
					class="flex items-center justify-center h-10 w-10"
					src={user.user_metadata.avatar_url}
					alt="User's profile"
				/>
			{/if}
			{#if !user?.user_metadata.avatar_url}
				<div class="uppercase h-10 w-10 bg-background flex justify-center items-center">
					{user?.email?.charAt(0)}
				</div>
			{/if}
		</div>
		<div class="bg-white border border-gray-200 rounded-lg py-2">
			<button on:click={handleLogout} class="hover:bg-background px-4 py-2">Logout</button>
		</div>
	</ContextMenu>
</header>
