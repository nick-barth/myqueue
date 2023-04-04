<script lang="ts">
	import type { BookmarkType } from '$types/types';
	import { combineMeta } from '$lib/utils/bookmark';

	export let bookmark: BookmarkType;
	export let setSelectedBookmark: (arg1: BookmarkType | null) => void;

	const meta = combineMeta(bookmark);
</script>

<aside class="fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-white">
	<div>
		<img class="min-w-full max-h-56" src={bookmark.image} alt="Related to the article" />
		<button class="" on:click={() => setSelectedBookmark(null)}>close</button>
	</div>
	<div class="p-6">
		<h2 class="flex font-bold text-xl">
			{bookmark.title}
		</h2>
		<p class="line-clamp-4 my-2 leading-7 overflow-hidden">
			{bookmark.content}
		</p>
		<div class="text-sm leading-6 mb-2">
			{meta.join(' • ')}
		</div>
	</div>
	<figure>
		<audio
			src="https://paddechpmdutxepollwl.supabase.co/storage/v1/object/public/audio/{bookmark.audio}"
		/>
	</figure>
</aside>
