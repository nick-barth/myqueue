import type { Database } from './supabase';

export type BookmarkType = Database['public']['Tables']['bookmarks']['Row'];
