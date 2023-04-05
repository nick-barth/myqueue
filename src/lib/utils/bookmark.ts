import type { BookmarkType } from '$types/types';

export const combineMeta = (bookmark: BookmarkType) => {
	let meta = [];
	if (bookmark.authors.length > 0) {
		meta.push(bookmark.authors.join(', '));
	}
	if (bookmark.domain) {
		meta.push(bookmark.domain);
	}
	if (bookmark.read_time) {
		const time = Math.ceil(bookmark.read_time / 60);
		meta.push(time);
	}
	if (bookmark.published) {
		meta.push(bookmark.published);
	}

	return meta;
};
