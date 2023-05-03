<script lang="ts">
	import LogoWithText from '$lib/icons/logo-with-text.svg?component';
	import Hamburger from '$lib/icons/hamburger.svg?component';
	import Close from '$lib/icons/close.svg?component';
	import { page } from '$app/stores';

	let isOpen = true;

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

	console.log($page);
	$: currentPage = page;
</script>

<div class="w-full">
	<div class="grid grid-cols-3 p-4 items-center">
		<button on:click={() => (isOpen = !isOpen)} class="h-6 w-6"><Hamburger /></button>
		<a class="w-24" href="/">
			<LogoWithText />
		</a>
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
			<a href="/" class="flex flex-row items-center gap-4 px-4 mb-4 hover:bg-gray950"
				><img class="h-8 w-8" src="/logos/logo48.png" alt="my queue" /> My Queue</a
			>
			<p class="text-lg px-4 mb-2">Add articles to your queue</p>
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
