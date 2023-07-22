<script lang="ts">
	import ContextMenu from '$lib/components/context-menu.svelte';
	import ArrowDiag from '$lib/icons/arrow-diag.svg?component';
	import { userStore, planStore } from '$lib/store';
	import type { UserType } from '$types/types';
	import db from '$lib/db';
	import { PUBLIC_STRIPE_CUSTOMER_PORTAL } from '$env/static/public';

	let user: UserType | null;
	userStore.subscribe((v) => {
		user = v;
	});

	const handleLogout = async () => {
		await db.signOut();
	};
</script>

<div class="w-full justify-end flex">
	<a href="/settings" class="overflow-hidden rounded-full h-10 w-10">
		{#if user?.user_metadata.avatar_url}
			<img
				class="flex items-center justify-center h-10 w-10"
				src={user.user_metadata.avatar_url}
				alt="User's profile"
			/>
		{/if}
		{#if !user?.user_metadata.avatar_url}
			<div class="uppercase h-10 w-10 bg-[#c8c8c8] flex justify-center items-center">
				{user?.email?.charAt(0)}
			</div>
		{/if}
	</a>
</div>
