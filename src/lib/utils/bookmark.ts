import type { BookmarkType } from '$types/types';

export const combineMeta = (bookmark: BookmarkType) => {
	let meta = [];
	if (bookmark.authors.length > 0) {
		meta.push(bookmark.authors.join(', '));
	}
	if (bookmark.domain) {
		meta.push(bookmark.domain);
	}
	meta.push('8 mins');
	meta.push('November 18, 2022');

	return meta;
};
