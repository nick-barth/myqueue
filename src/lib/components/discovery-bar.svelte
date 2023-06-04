<script>
	import { sources } from '$lib/constants/sources';
	import { page } from '$app/stores';

	console.log($page);
</script>

<aside class="flex w-full overflow-scroll h-full items-center">
	<a href={`/`} class="list-none px-4 flex flex-col text-sm items-center flex-shrink-0">
		<img
			class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-4 border-solid border-white {$page
				.url.pathname === '/' && 'shadow-[0_0px_0px_2px_black]'}"
			src="/images/sources/my-queue.png"
			alt="homepage"
		/>
		My Queue
	</a>
	<a
		href={`/add-url`}
		class="list-none px-4 flex flex-col text-sm items-center flex-shrink-0
{$page.url.pathname === `/add-url` && 'bg-gray950'}"
	>
		<img
			class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-4 border-solid border-white {$page
				.url.pathname === 'add-url' && 'shadow-[0_0px_0px_2px_black]'}"
			src="/images/sources/add-url.png"
			alt="add url"
		/>
		Add
	</a>
	{#each sources as source}
		<a
			href={`/discover/${source.source}`}
			class="list-none px-4 flex flex-col text-sm items-center flex-shrink-0"
		>
			<img
				class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-4 border-solid border-white {$page
					.params.source === source.source && 'shadow-[0_0px_0px_2px_black]'}"
				src="/images/sources/{source.source}.png"
				alt={source.title}
			/>
			{source.title}
		</a>
	{/each}
</aside>
