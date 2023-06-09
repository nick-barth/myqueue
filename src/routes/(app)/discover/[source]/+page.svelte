<script lang="ts">
	import Avatar from '$lib/components/avatar.svelte';
	import Bookmark from '$lib/components/bookmark.svelte';
	export let data: any;

	const sources = {
		guardian: 'Guardian',
		nyt: 'New York Times',
		techcrunch: 'TechCrunch',
		cnn: 'CNN',
		medium: 'Medium',
		bbc: 'BBC'
	};

	console.log(data);
</script>

<div>
	<div class="flex justify-between px-2 pt-10">
		<div>
			<h2 class="font-bold text-xl font-domine">
				{sources[data.source]}
			</h2>
			<p>Today</p>
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
