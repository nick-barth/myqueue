<script lang="ts">
	import type { BookmarkType } from '$types/types';

	export let bookmark: BookmarkType;
	export let noReadingTime: boolean = false;

	import { format, parseISO } from 'date-fns';

	export let meta: string[] = [];
	if (bookmark.authors.length > 0) {
		meta.push(bookmark.authors.join(', '));
	}
	if (bookmark?.read_time && !noReadingTime) {
		const time = Math.floor(bookmark?.read_time / 60);
		const unit = time > 1 ? 'mins' : 'min';
		meta.push(`${time} ${unit}`);
	}
	if (bookmark.published) {
		const publishDate = parseISO(bookmark.published);
		try {
			const formattedDate = format(publishDate, `MMMM do, yyyy`);
			meta.push(formattedDate);
		} catch {}
	}
</script>

<aside class="text-xs leading-[18px] mb-2">
	{#if meta.length > 0}
		{meta.join('  •  ')}
	{/if}
	{#if bookmark.domain}
		•{'  '}
		<a class="underline" href={bookmark.url} target="_blank">Original article</a>
	{/if}
</aside>
