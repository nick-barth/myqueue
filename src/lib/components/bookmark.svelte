<script lang="ts">
	import LoadingDots from '$lib/components/loading-dots.svelte';
	import type { BookmarkType } from '$types/types';
	export let bookmark: BookmarkType;
	import db from '$lib/db';

	let meta: string[] = [];
	meta.push(bookmark.authors.join(', '));
	bookmark.domain && meta.push(bookmark.domain);
	meta.push('8 mins');
	meta.push('November 18, 2022');
	$: isGenerating = false;
	const handlePlay = async () => {
		console.log(bookmark);
		if (bookmark.audio) {
			db.tts.getPublicPath(bookmark);
		} else {
			if (!bookmark.content) {
				return;
			}
			if (bookmark.content.length > 4500) {
				console.log('oops thatsa too big');
			} else {
				isGenerating = true;
				const res = await db.tts.create(bookmark);
				isGenerating = false;
			}
		}
		// isGenerating = true;
		// setTimeout(() => {
		// 	isGenerating = false;
		// }, 7000);
	};
</script>

<li class="list-none mb-8">
	<h2 class="flex font-bold text-xl">
		{#if bookmark.audio}
			<figure>
				<figcaption>Listen to this shit dog:</figcaption>
				<audio
					controls
					src="https://paddechpmdutxepollwl.supabase.co/storage/v1/object/public/audio/{bookmark.audio}"
				/>
			</figure>
		{/if}
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
		{meta.join(' • ')}
	</div>
	<div class="flex self-start gap-2 pb-8 py-6 border-b border-b-colors-background">
		<button class="flex h-10 bg-colors-background rounded-[80px] items-center py-2 px-4"
			>Read</button
		>
		<button
			on:click={handlePlay}
			class=" transition-all ease-in-out max-w-[96px] duration-300 flex gap-2 h-10 bg-colors-accent rounded-[80px] py-2 px-4 items-center {!isGenerating
				? 'bg-colors-primary text-white'
				: 'bg-colors-accent2 text-colors-primary max-w-xs'}"
			>{#if !isGenerating}
				Listen <svg
					width="13"
					height="14"
					viewBox="0 0 13 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0.0290694 13.9959L0 0.473511L12.5 7.00462L0.0290694 13.9959Z" fill="#FFF" />
				</svg>
			{:else}
				Generating <LoadingDots />
			{/if}
		</button>
	</div>
</li>
