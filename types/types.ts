import type { Database } from './supabase';
import type { Session } from '@supabase/gotrue-js/src/lib/types';

export type SessionType = Session;

export type UserType = Session['user'];

export type BookmarkType = Database['public']['Tables']['bookmarks']['Row'];
