<script lang="ts">
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import Hamburger from '$lib/icons/hamburger.svg?component';
	import ContextMenu from '$lib/components/context-menu.svelte';
	import ArrowDiag from '$lib/icons/arrow-diag.svg?component';
	import Close from '$lib/icons/close.svg?component';
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

	let isOpen = false;

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

<div class="w-full">
	<div class="grid grid-cols-3 p-4 items-center justify-between">
		<button on:click={() => (isOpen = !isOpen)} class="h-6 w-6"><Hamburger /></button>
		<a class="w-24" href="/">
			<LogoWithText />
		</a>
		<div class="w-full justify-end flex">
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
				<div class="bg-white border border-gray-200 rounded-lg py-2 justify-items-start text-left">
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
	<aside
		class="fixed top-0 bottom-0 left-0 right-0 bg-white z-50 transition-all {isOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div class="flex w-full justify-end p-4">
			<button class="h-6 w-6" on:click={() => (isOpen = !isOpen)}><Close /></button>
		</div>

		<nav class="flex flex-col">
			<a
				on:click={() => (isOpen = false)}
				href="/"
				class="flex flex-row items-center gap-4 px-4 mb-4 hover:bg-gray950"
			>
				<div class="w-6 h-6">
					<LogoIcon />
				</div>
				<div class="mt-2">My Queue</div>
			</a>
			<p class="text-lg px-4 py-4 mb-2">Add articles to your queue</p>
			{#each sources as source}
				<a
					on:click={() => (isOpen = false)}
					href={`/discover/${source.source}`}
					class=" list-none py-3 w-full hover:bg-gray950 px-4 flex items-center gap-4
                    {$page.params.source === source.source && 'bg-gray950'}"
				>
					<img class="h-8 w-8" src="/images/sources/{source.source}.png" alt={source.title} />
					{source.title}
				</a>
			{/each}
		</nav>
	</aside>
</div>
