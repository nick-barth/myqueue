import type { BookmarkType, UserType } from '$types/types';
import { writable, get } from 'svelte/store';
import Welcome from './welcome.json';
import mixpanel from 'mixpanel-browser';

// This file is disgusting I apologize to those who must witness
// Hackathon things

export const bookmarkStore = writable<BookmarkType[] | null>();
export const currentStore = writable<BookmarkType | null>(null);
export const readingStore = writable<boolean>(false);
export const pausedStore = writable<boolean>(true);
export const userStore = writable<UserType | null>();
export const toastsStore = writable<ToastType[]>([]);
export const audioStore = writable<HTMLAudioElement | null>(null);
export const planStore = writable<'premium' | null>(null);
export const paygateStore = writable<'article-limit' | null>(null);

bookmarkStore.subscribe((value) => {
	if (value && value.length === 0) {
		bookmarkStore.update((v) => [Welcome]);
		currentStore.update((v) => Welcome);
	}
});

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

	toastsStore.update((all) => [newToast, ...all]);

	if (newToast.timeout) setTimeout(() => dismissToast(id), newToast.timeout);
};

export const dismissToast = (id: number) => {
	toastsStore.update((all) => all.filter((t) => t.id !== id));
};
