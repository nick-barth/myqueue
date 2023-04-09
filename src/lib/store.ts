import type { BookmarkType, UserType } from '$types/types';
import { writable } from 'svelte/store';

export const bookmarkStore = writable<BookmarkType[] | null>();
export const selectedBookmark = writable<BookmarkType | null>(null);
export const userStore = writable<UserType | null>();

export const toasts = writable<ToastType[]>([]);

interface ToastType {
	id?: number;
	content: string;
	timeout?: number;
	type: 'info' | 'success' | 'error';
}

export const addToast = (toast: ToastType) => {
	const id = Math.floor(Math.random() * 10000);

	const newToast = {
		id,
		timeout: 5000,
		...toast
	};

	toasts.update((all) => [newToast, ...all]);

	if (newToast.timeout) setTimeout(() => dismissToast(id), newToast.timeout);
};

export const dismissToast = (id: number) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
