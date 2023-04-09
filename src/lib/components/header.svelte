<script lang="ts">
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import ContextMenu from '$lib/components/context-menu.svelte';

	import { userStore } from '$lib/store';
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

<header class="p-4 md:px-6 md:p-6 w-full justify-between flex">
	<div class="w-28">
		<LogoWithText />
	</div>
	{#if user}
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
						{user.email?.charAt(0)}
					</div>
				{/if}
			</div>
			<div class="bg-white border border-gray-200 rounded-lg py-2">
				<button on:click={handleLogout} class="hover:bg-background px-4 py-2">Logout</button>
			</div>
		</ContextMenu>
	{/if}
</header>
