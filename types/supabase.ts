export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          audo_url: string | null
          authors: Json | null
          content: string | null
          created_at: string | null
          id: number
          image: string | null
          title: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          audo_url?: string | null
          authors?: Json | null
          content?: string | null
          created_at?: string | null
          id?: number
          image?: string | null
          title?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          audo_url?: string | null
          authors?: Json | null
          content?: string | null
          created_at?: string | null
          id?: number
          image?: string | null
          title?: string | null
          url?: string | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
