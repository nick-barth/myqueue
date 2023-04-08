import type { BookmarkType, UserType } from '$types/types';
import { writable } from 'svelte/store';

export const bookmarkStore = writable<BookmarkType[] | null>();
export const selectedBookmark = writable<BookmarkType | null>(null);

export const userStore = writable<UserType | null>();
