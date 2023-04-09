import { createClient, type AuthChangeEvent } from '@supabase/supabase-js';
import { userStore, bookmarkStore } from '$lib/store';
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
		},
		async remove(id: number) {
			const res = await supabase.from('bookmarks').delete().eq('id', id);
			bookmarkStore.update((v) => {
				if (!v) {
					return [];
				}
				const filteredBookmarks = v?.filter((b) => b.id !== id);
				return filteredBookmarks;
			});
		},
		async post(url: string) {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			const { data, error } = await supabase.functions.invoke('parse', {
				body: { user_id: user?.id, url }
			});

			bookmarkStore.update((v) => {
				const currentValue = v ? v : [];
				return [data[0], ...currentValue];
			});
		}
	},
	tts: {
		async create(bookmark: BookmarkType) {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			const { data, error } = await supabase.functions.invoke('tts', {
				body: { user_id: user?.id, bookmark_id: bookmark.id, text: bookmark.content }
			});
			return data;
		}
	}
};
