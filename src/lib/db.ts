import { createClient } from '@supabase/supabase-js';
import { userStore, bookmarkStore } from '$lib/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { Database } from '$types/supabase';
import type { BookmarkType } from '$types/types';

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

supabase.auth.getSession().then(({ data }) => {
	userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
	}
});

export default {
	signUp(email: string, password: string) {
		return supabase.auth.signUp({
			email: email,
			password: password
		});
	},
	async signIn(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
	},
	signOut() {
		return supabase.auth.signOut();
	},
	bookmarks: {
		async get() {
			const { data } = await supabase.from('bookmarks').select('*');
			bookmarkStore.set(data);
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
		},
		async getPublicPath(bookmark: BookmarkType) {
			if (!bookmark.audio) {
				return;
			}
			const { data } = supabase.storage.from('public-bucket').getPublicUrl(bookmark.audio);
		}
	}
};
