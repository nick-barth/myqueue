<script lang="ts">
	import Avatar from '$lib/components/avatar-circle.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	export let data: any;

	const sources = {
		guardian: 'Guardian',
		newyorktimes: 'New York Times',
		techcrunch: 'TechCrunch',
		cnn: 'CNN',
		medium: 'Medium',
		bbc: 'BBC'
	};
</script>

<div>
	<div class="flex justify-between px-2 pt-10">
		<div>
			<h2 class="font-bold text-2xl leading-6 font-frank mb-1">
				{sources[data.source]}
			</h2>
			<p class="text-sm pl-0.5">Today</p>
		</div>
		<div class="relative">
			<Avatar />
		</div>
	</div>
	<section>
		{#if data.articles}
			{#each data.articles as article}
				<Bookmark isDiscovery={true} bookmark={article} />
			{/each}
		{/if}
	</section>
</div>
