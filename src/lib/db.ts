import { createClient } from '@supabase/supabase-js';
import { get } from 'svelte/store';
import { userStore, bookmarkStore, currentStore, addToast, limitsStore } from '$lib/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { Database } from '$types/supabase';
import type { BookmarkType } from '$types/types';

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
		async remove(bookmark: BookmarkType) {
			const user = get(userStore);
			if (!user) {
				return;
			}
			try {
				const fileRes = await supabase.storage
					.from('audio')
					.remove([`${user.id}/${bookmark.id}.mp3`]);

				const res = await supabase.from('bookmarks').delete().eq('id', bookmark.id);
				bookmarkStore.update((v) => {
					if (!v) {
						return [];
					}
					const filteredBookmarks = v?.filter((b) => b.id !== bookmark.id);
					return filteredBookmarks;
				});
			} catch {
				addToast({ type: 'error', content: 'Uh oh, something went wrong!' });
			}
		},
		async post(url: string) {
			const user = get(userStore);
			const { data, error } = await supabase.functions.invoke('parse', {
				body: { user_id: user?.id, url }
			});

			bookmarkStore.update((v) => {
				const currentValue = v ? v : [];
				return [data[0], ...currentValue];
			});
			return { data, error };
		}
	},
	tts: {
		async getList() {
			const user = get(userStore);
			if (!user) {
				return;
			}
			const { data, error } = await supabase.storage.from('audio').list(user.id, {
				limit: 100,
				offset: 0
			});
			if (data && data.length > 4) {
				limitsStore.update((v) => true);
			}
			return { data, error };
		},
		async create(bookmark: BookmarkType) {
			const { data, error } = await supabase.functions.invoke('tts', {
				body: bookmark
			});
			return { data, error };
		}
	}
};
