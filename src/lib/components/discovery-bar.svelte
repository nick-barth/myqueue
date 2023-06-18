<script>
	import { sources } from '$lib/constants/sources';
	import { page } from '$app/stores';
</script>

<aside
	class="flex w-full overflow-scroll h-full items-center max-w-2xl m-auto md:justify-center no-scrollbar"
>
	<a href={`/`} class="list-none px-2 flex flex-col text-sm items-center flex-shrink-0">
		<img
			class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white {$page
				.url.pathname === '/' && 'shadow-[0_0px_0px_2px_#c8c8c8]'}"
			src="/images/sources/my-queue.png"
			alt="homepage"
		/>
		My Queue
	</a>
	<a href={`/add`} class="list-none px-2 flex flex-col text-sm items-center flex-shrink-0">
		<img
			class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white {$page
				.url.pathname === '/add' && 'shadow-[0_0px_0px_2px_#c8c8c8]'}"
			src="/images/sources/add-url.png"
			alt="add url"
		/>
		Add
	</a>
	{#each sources as source}
		<a
			href={`/discover/${source.source}`}
			class="list-none px-2 flex flex-col text-sm items-center flex-shrink-0"
		>
			<img
				class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white {$page
					.params.source === source.source && 'shadow-[0_0px_0px_2px_#c8c8c8]'}"
				src="/images/sources/{source.source}.png"
				alt={source.title}
			/>
			{source.title}
		</a>
	{/each}
</aside>
