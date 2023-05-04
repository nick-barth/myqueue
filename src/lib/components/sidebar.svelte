<script lang="ts">
	import ContextMenu from '$lib/components/context-menu.svelte';
	import ArrowDiag from '$lib/icons/arrow-diag.svg?component';
	import LogoIcon from '$lib/icons/logo-icon.svg?component';
	import { page } from '$app/stores';

	import { userStore } from '$lib/store';
	import type { UserType } from '$types/types';
	import db from '$lib/db';

	let user: UserType | null;
	userStore.subscribe((v) => {
		user = v;
	});

	const handleLogout = async () => {
		await db.signOut();
	};

	const sources = [
		{
			title: 'Medium',
			source: 'medium'
		},
		{
			title: 'New York Times',
			source: 'newyorktimes'
		},
		{
			title: 'CNN',
			source: 'cnn'
		},
		{
			title: 'BBC',
			source: 'bbc'
		},
		{
			title: 'Guardian',
			source: 'guardian'
		}
	];
</script>

<div class="w-full h-[100vh] sticky top-0">
	<nav class="flex flex-col h-full">
		<div class="flex border-b border-gray900 mb-2">
			<a
				href="/"
				class="flex flex-row items-center gap-4 px-4 py-4 pb-8 mt-2 w-full hover:bg-gray950 text-domine font-bold"
			>
				<div class="h-8 w-8">
					<LogoIcon />
				</div>
				<div class="pt-2">My Queue</div>
			</a>
			<p class="text-lg px-4 mb-2 md:hidden">Add articles to your queue</p>
		</div>
		{#each sources as source}
			<a
				href={`/discover/${source.source}`}
				class=" list-none py-3 w-full hover:bg-gray950 px-4 flex items-center gap-4
                    {$page.params.source === source.source && 'bg-gray950'}"
			>
				<img class="h-8 w-8" src="/images/sources/{source.source}.png" alt={source.title} />
				{source.title}
			</a>
		{/each}
		<div class="flex h-full p-2 flex-col justify-end">
			<div>
				<ContextMenu position="left" positionY="top">
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
					<div
						class="bg-white border border-gray-200 rounded-lg py-2 justify-items-start text-left mt-auto"
					>
						<a
							href="https://www.myqueue.so/support"
							target="_blank"
							class="hover:bg-background px-4 py-2 flex align-center items-center"
						>
							Support
							<div class=" h-4 w-4">
								<ArrowDiag />
							</div>
						</a>
						<button on:click={handleLogout} class="hover:bg-background w-full px-4 py-2"
							>Logout</button
						>
					</div>
				</ContextMenu>
			</div>
		</div>
	</nav>
</div>
