<script lang="ts">
	import Bookmark from '$lib/components/bookmark.svelte';
	export let data;

	const sources = {
		guardian: 'Guardian',
		newyorktimes: 'New York Times',
		techcrunch: 'TechCrunch',
		// cnn: 'CNN',
		bbc: 'BBC'
	};
</script>

<section>
	{#if data.articles}
		<h2 class="font-bold text-xl md:text-2xl font-domine px-4 md:px-10">
			Add trending {sources[data.source]} articles
		</h2>
		{#each data.articles as article}
			<Bookmark isDiscovery={true} bookmark={article} />
		{/each}
	{/if}
</section>
