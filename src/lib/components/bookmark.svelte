<script lang="ts">
	import type { BookmarkType } from '$types/types';
	export let bookmark: BookmarkType;

	const handlePlay = () => {};
</script>

<li class="list-none mb-8">
	<h2 class="flex font-bold text-xl">
		{#if bookmark.image}
			<div class="w-16 h-16 overflow-hidden flex-shrink-0 mr-6">
				<img class="min-h-full min-w-full" src={bookmark.image} alt="Related to the article" />
			</div>
		{/if}
		{bookmark.title}
	</h2>
	<p class="line-clamp-4 my-2 leading-7 overflow-hidden">
		{bookmark.content}
	</p>
	<div class="text-sm leading-6 mb-2">
		{#if bookmark.authors && bookmark.authors.length > 0}
			{bookmark.authors.join(' • ')}
		{/if}
		• www.website.com • 8 min • November 18, 2022
	</div>
	<div class="flex self-start gap-2 pb-8 py-6 border-b border-b-colors-background">
		<button class="flex h-10 bg-colors-background rounded-[80px] items-center py-2 px-4"
			>Read article</button
		>
		<button class="flex gap-2 h-10 bg-colors-accent rounded-[80px] items-center py-2 px-4"
			>Play article <svg
				width="13"
				height="14"
				viewBox="0 0 13 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M0.0290694 13.9959L0 0.473511L12.5 7.00462L0.0290694 13.9959Z" fill="#181818" />
			</svg>
		</button>
	</div>
</li>
