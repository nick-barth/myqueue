import { createClient, FunctionsHttpError } from '@supabase/supabase-js';
import { get } from 'svelte/store';
import {
	userStore,
	bookmarkStore,
	currentStore,
	addToast,
	planStore,
	paygateStore
} from '$lib/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { Database } from '$types/supabase';
import type { BookmarkType } from '$types/types';
import mixpanel from 'mixpanel-browser';
import { paygateStore } from './store';

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export default {
	async signInWithGoogle() {
		const res = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});

		return res;
	},
	async signUp(email: string, password: string) {
		const res = await supabase.auth.signUp({
			email: email,
			password: password
		});
		return res;
	},
	async signIn(email: string, password: string) {
		const res = await supabase.auth.signInWithPassword({
			email,
			password
		});
		return res;
	},
	async signOut() {
		const res = await supabase.auth.signOut();
	},
	bookmarks: {
		async get() {
			const { data } = await supabase
				.from('bookmarks')
				.select('*')
				.order('created_at', { ascending: false });
			bookmarkStore.set(data);
			if (data && data.length > 0) {
				currentStore.update((v) => data[0]);
			}
		},
		async addBookmark(bookmark: BookmarkType) {
			const user = get(userStore);
			try {
				const { data, error } = await supabase
					.from('bookmarks')
					.insert({ ...bookmark, user_id: user?.id })
					.select();
				if (data) {
					bookmarkStore.update((v) => {
						const currentValue = v ? v : [];
						return [data[0], ...currentValue];
					});
				}
			} catch (e) {}
		},
		async remove(bookmark: BookmarkType) {
			const user = get(userStore);
			if (!user) {
				return;
			}
			try {
				const fileRes = await supabase.storage
					.from('audio')
					.remove([`${user.id}/${bookmark.id}.mp3`]);

				// What a mess, I heard code with swears in comments scored better in quality tests, fuck
				const res = await supabase.from('bookmarks').delete().eq('id', bookmark.id);
				bookmarkStore.update((v) => {
					if (!v) {
						return [];
					}
					const filteredBookmarks = v?.filter((b) => b.id !== bookmark.id);
					const currentlySelected = get(currentStore);
					if (filteredBookmarks.length > 0 && currentlySelected?.id == bookmark.id) {
						currentStore.update((v) => filteredBookmarks[0]);
					}
					return filteredBookmarks;
				});
			} catch {
				addToast({ type: 'error', content: 'Uh oh, something went wrong!' });
			}
		},
		async post(url: string) {
			const user = get(userStore);
			const res = await supabase.functions.invoke('parse', {
				body: { user_id: user?.id, url }
			});

			const { data, error } = res;

			if (error instanceof FunctionsHttpError) {
				const errorMessage = await error.context.json();
				if (errorMessage.error == 'TOO_MANY_ARTICLES') {
					paygateStore.set('article-limit');
					return;
				}
			}

			if (data) {
				bookmarkStore.update((v) => {
					const currentValue = v ? v : [];
					return [data, ...currentValue];
				});
				addToast({
					content: 'Successfully added to queue',
					type: 'success'
				});

				mixpanel.track('url added succesfully', { response: url });
				return { data, error };
			} else {
				mixpanel.track('url failed', { url });
				addToast({
					content: 'Oops, that did not work, maybe we cannnot read the article',
					type: 'error'
				});
				return false;
			}
		}
	},
	tts: {
		async create(bookmark: BookmarkType) {
			const { data, error } = await supabase.functions.invoke('tts', {
				body: bookmark
			});

			return { data, error };
		}
	},
	discovery: {
		async get(source: string) {
			const { data, error } = await supabase.from('discovery').select().eq('publisher', source);
			return data;
		}
	},
	billing: {
		async createCustomerId(source: string) {
			const user = get(userStore);
			if (!user) {
				return;
			}
			const { data, error } = await supabase.functions.invoke('stripe-create-checkout', {
				body: {
					type: 'create_stripe_checkout',
					id: user.id,
					email: user.email
				}
			});
			window.open(data.url);
		},
		async getUserPlan() {
			const user = get(userStore);
			if (!user) {
				return;
			}
			const { data, error } = await supabase.from('profiles').select().eq('id', user.id);
			if (data[0]) {
				planStore.set(data[0].plan);
			}
		}
	}
};
