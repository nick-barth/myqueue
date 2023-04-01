import { writable } from 'svelte/store';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, PUBLIC_BASE_URL } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

const userStore = writable();

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
	get user() {
		return userStore;
	},
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
		async all() {
			const { data } = await supabase.from('bookmarks').select('*');

			return data;
		},

		async create(bookmark) {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			const { data, error } = await supabase.from('bookmarks').insert({
				...bookmark,
				user_id: user.id
			});

			return data;
		}
	},
	tts: {
		async createTts(bookmark) {
			// remove these calls
			const {
				data: { user }
			} = await supabase.auth.getUser();
			const { data, error } = await supabase.functions.invoke('tts', {
				body: { user_id: user.id, bookmark_id: bookmark.id, text: bookmark.text }
			});
		}
	}
};
