<script lang="ts">
	import Avatar from '$lib/components/avatar-circle.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	import { getErrorMap } from 'zod';
	export let data: any;

	const sources = {
		guardian: 'Guardian',
		newyorktimes: 'New York Times',
		techcrunch: 'TechCrunch',
		cnn: 'CNN',
		medium: 'Medium',
		bbc: 'BBC'
	};

	// filter out the current source
	const sourcesWithoutCurrent = Object.keys(sources).filter((s) => s !== data.source);

	console.log(sourcesWithoutCurrent);
</script>

<div>
	<div class="flex justify-between px-6">
		<div>
			<h2 class="font-bold text-2xl leading-6 font-frank mb-1">
				{sources[data.source]}
			</h2>
			<p class="text-sm pl-0.5">Latest news</p>
		</div>
		<div class="relative">
			<Avatar />
		</div>
	</div>
	<section>
		{#if data.articles && data.articles.length > 0}
			{#each data.articles as article}
				<Bookmark isDiscovery={true} bookmark={article} />
			{/each}
		{:else}
			<li
				class="mt-2 list-none transition-colors ease-in-out duration-150 md:flex md:flex-row p-6 bg-white"
			>
				<div class="flex flex-col w-full">
					<h2
						class="flex font-bold text-lg md:text-xl leading-6 md:leading-7 font-frank justify-between"
					>
						Oh... no
					</h2>
					<p class="line-clamp-4 my-2 leading-5 overflow-hidden text-sm breakword">
						It doesn't look like we've found any relevant stories for <span
							class="capitalize font-semibold">{data.source}</span
						> today.
					</p>
					<p class="line-clamp-4 my-2 leading-5 overflow-hidden text-sm breakword">
						You can try looking at our other sources, or <a class="underline" href="/add"
							>add your own</a
						>.
					</p>
					<div class="flex gap-2 mt-4">
						{#each sourcesWithoutCurrent as source}
							<a
								href={`/discover/${source}`}
								class="list-none px-1 flex flex-col items-center flex-shrink-0 text-xs"
							>
								<img
									class="h-[68px] w-[68px] rounded-full flex-shrink-0 border-4 border-solid mb-0.5 border-white shadow-[0_0px_0px_2px_#c8c8c8]"
									src="/images/sources/{source}.png"
									alt={source}
								/>
							</a>
						{/each}
					</div>
				</div>
			</li>
		{/if}
	</section>
</div>
