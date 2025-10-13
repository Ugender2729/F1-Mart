import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token',
    debug: false // Disable debug to reduce warnings
  },
  realtime: {
    params: {
      eventsPerSecond: 2 // Limit realtime events to reduce load
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'f1-mart-web'
    }
  }
})

// Database types (we'll generate these later)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          original_price: number | null
          image: string
          images: string[]
          category: string
          brand: string
          rating: number
          review_count: number
          stock: number
          unit: string
          weight: string
          nutrition: any
          featured: boolean
          on_sale: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          original_price?: number | null
          image: string
          images: string[]
          category: string
          brand: string
          rating?: number
          review_count?: number
          stock: number
          unit: string
          weight: string
          nutrition?: any
          featured?: boolean
          on_sale?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          original_price?: number | null
          image?: string
          images?: string[]
          category?: string
          brand?: string
          rating?: number
          review_count?: number
          stock?: number
          unit?: string
          weight?: string
          nutrition?: any
          featured?: boolean
          on_sale?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          image: string
          product_count: number
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          image: string
          product_count?: number
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          image?: string
          product_count?: number
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: any
          subtotal: number
          discount: number
          delivery_fee: number
          tax: number
          total: number
          status: string
          payment_method: string
          delivery_address: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: any
          subtotal: number
          discount?: number
          delivery_fee: number
          tax: number
          total: number
          status?: string
          payment_method: string
          delivery_address: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: any
          subtotal?: number
          discount?: number
          delivery_fee?: number
          tax?: number
          total?: number
          status?: string
          payment_method?: string
          delivery_address?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

