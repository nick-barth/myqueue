<script>
	import { sources } from '$lib/constants/sources';
	import { page } from '$app/stores';
	import { bookmarkStore } from '$lib/store';

	$: bookmarkStoreLength = $bookmarkStore ? $bookmarkStore.length : 0;
</script>

<aside
	class="flex w-full overflow-scroll h-full items-center max-w-2xl m-auto md:justify-center no-scrollbar px-6"
>
	<a href={`/`} class="list-none pr-1.5 flex flex-col text-sm items-center flex-shrink-0 relative">
		<div
			class="bg-primary rounded-full h-5 w-5 absolute top-0.5 right-2.5 flex items-center text-white justify-center text-[11px]"
		>
			{bookmarkStoreLength}
		</div>
		<img
			class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white {$page
				.url.pathname === '/' && 'shadow-[0_0px_0px_2px_#c8c8c8]'}"
			src="/images/sources/my-queue.png"
			alt="homepage"
		/>
		My Queue
	</a>
	<a href={`/add`} class="list-none px-1.5 flex flex-col text-sm items-center flex-shrink-0">
		<img
			class="h-[60px] w-[60px] rounded-full flex-shrink-0 border-solid mb-0.5 border-white {$page
				.url.pathname === '/add' && 'shadow-[0_0px_0px_2px_#c8c8c8]'}"
			src="/images/sources/add-url.png"
			alt="add url"
		/>
		Add
	</a>
	{#each sources as source}
		<a
			href={`/discover/${source.source}`}
			class="list-none px-1.5 flex flex-col text-sm items-center flex-shrink-0"
		>
			<img
				class="h-[60px] w-[60px] rounded-full flex-shrink-0 mb-0.5 border-white {$page.params
					.source === source.source && 'shadow-[0_0px_0px_2px_#c8c8c8]'}"
				src="/images/sources/{source.source}.png"
				alt={source.title}
			/>
			{source.title}
		</a>
	{/each}
</aside>
