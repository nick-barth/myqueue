<script lang="ts">
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';

	import { userStore } from '$lib/store';
	import type { UserType } from '$types/types';
	import db from '$lib/db';
	import { goto } from '$app/navigation';

	let user: UserType | null;
	userStore.subscribe((v) => {
		user = v;
	});

	const handleLogout = () => {
		db.signOut();
		goto('/auth/signin');
	};
</script>

<header class="p-4 md:px-6 md:p-6 w-full justify-center flex md:pr-[385px]">
	<div class="w-full">
		<LogoWithText />
	</div>
	{#if user}
		<button on:click={handleLogout} class="overflow-hidden rounded-full h-10 w-10">
			{#if user?.user_metadata.avatar_url}
				<img
					class="flex items-center justify-center h-10 w-10"
					src={user.user_metadata.avatar_url}
					alt="User's profile"
				/>
			{/if}
			{#if !user?.user_metadata.avatar_url}
				fuic
			{/if}
		</button>
	{/if}
</header>
