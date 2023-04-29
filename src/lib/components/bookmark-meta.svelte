<script lang="ts">
	import type { BookmarkType } from '$types/types';

	export let bookmark: BookmarkType;
	export let noReadingTime: boolean = false;

	import { format, parseISO } from 'date-fns';

	export let meta: string[] = [];
	if (bookmark.authors.length > 0) {
		meta.push(bookmark.authors.join(', '));
	}
	if (bookmark.read_time && !noReadingTime) {
		const time = Math.floor(bookmark.read_time / 60);
		const unit = time > 1 ? 'mins' : 'min';
		meta.push(`${time} ${unit}`);
	}
	if (bookmark.published) {
		const publishDate = parseISO('2022-06-01T14:42:52+00:00');
		const formattedDate = format(publishDate, `do MMMM, yyyy`);
		meta.push(formattedDate);
	}
</script>

<aside class="text-sm leading-6 mb-2">
	{#if bookmark.domain}
		<a class="underline" href={bookmark.url} target="_blank">{bookmark.domain}</a>
	{/if}
	{#if meta.length > 0}
		•
		{meta.join(' • ')}
	{/if}
</aside>
