import type { BookmarkType } from '$types/types';

export const combineMeta = (bookmark: BookmarkType) => {
	let meta = [];
	meta.push(bookmark.authors.join(', '));
	bookmark.domain && meta.push(bookmark.domain);
	meta.push('8 mins');
	meta.push('November 18, 2022');

	return meta;
};
