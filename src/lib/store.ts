import type { BookmarkType } from '$types/types';
import { writable } from 'svelte/store';

export const selectedBookmark = writable<BookmarkType | null>(null);
