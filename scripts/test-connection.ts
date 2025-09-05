import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('🔗 Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey.substring(0, 20) + '...')

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Test basic connection by checking if we can reach Supabase
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (error) {
      if (error.message.includes('relation "products" does not exist')) {
        console.log('✅ Supabase connection successful!')
        console.log('⚠️  Database tables not created yet')
        console.log('📋 Please run the database schema first')
        return
      }
      console.error('❌ Connection failed:', error.message)
      return
    }

    console.log('✅ Supabase connection successful!')
    console.log('📊 Database is ready for data migration')
  } catch (err) {
    console.error('❌ Connection error:', err)
  }
}

testConnection()
