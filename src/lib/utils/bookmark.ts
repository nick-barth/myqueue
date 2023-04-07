import type { BookmarkType } from '$types/types';

import { format, parseISO } from 'date-fns';

export const combineMeta = (
	bookmark: BookmarkType,
	options?: {
		noReadingTime: boolean;
	}
) => {
	let meta = [];
	if (bookmark.authors.length > 0) {
		meta.push(bookmark.authors.join(', '));
	}
	if (bookmark.domain) {
		meta.push(bookmark.domain);
	}
	if (bookmark.read_time && !options?.noReadingTime) {
		const time = Math.floor(bookmark.read_time / 60);
		meta.push(`${time} mins`);
	}
	if (bookmark.published) {
		const publishDate = parseISO('2022-06-01T14:42:52+00:00');
		const formattedDate = format(publishDate, `do MMMM, yyyy`);
		meta.push(formattedDate);
	}

	return meta;
};
