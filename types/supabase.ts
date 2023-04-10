export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			bookmarks: {
				Row: {
					audio: string | null;
					authors: string[];
					content: string | null;
					created_at: string | null;
					domain: string | null;
					id: number;
					image: string | null;
					published: string | null;
					read_time: number | null;
					title: string | null;
					url: string | null;
					language: string | null;
					user_id: string | null;
				};
				Insert: {
					audio?: string | null;
					authors?: string[];
					content?: string | null;
					created_at?: string | null;
					domain?: string | null;
					id?: number;
					image?: string | null;
					published?: string | null;
					read_time?: number | null;
					title?: string | null;
					url?: string | null;
					language: string | null;
					user_id?: string | null;
				};
				Update: {
					audio?: string | null;
					authors?: string[];
					content?: string | null;
					created_at?: string | null;
					domain?: string | null;
					id?: number;
					image?: string | null;
					published?: string | null;
					read_time?: number | null;
					title?: string | null;
					url?: string | null;
					language: string | null;
					user_id?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
