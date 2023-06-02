<script>
	import { sources } from '$lib/constants/sources';
	import { page } from '$app/stores';
</script>

<aside>
	<div class="flex w-full overflow-scroll">
		{#each sources as source}
			<a
				href={`/discover/${source.source}`}
				class="list-none py-3 w-full hover:bg-gray950 px-4 flex flex-col items-center gap-4
        {$page.params.source === source.source && 'bg-gray950'}"
			>
				<img
					class="h-[60px] w-[60px] rounded-full"
					src="/images/sources/{source.source}.png"
					alt={source.title}
				/>
				{source.title}
			</a>
		{/each}
	</div>
</aside>
