import { createClient } from '@supabase/supabase-js'
import { products } from '../data/products'
import { categories } from '../data/categories'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateCategories() {
  console.log('🔄 Migrating categories...')
  
  for (const category of categories) {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: category.name,
        image: category.image,
        product_count: category.productCount,
        slug: category.slug
      })
      .select()
    
    if (error) {
      console.error('Error inserting category:', category.name, error)
    } else {
      console.log('✅ Category migrated:', category.name)
    }
  }
}

async function migrateProducts() {
  console.log('🔄 Migrating products...')
  
  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice,
        image: product.image,
        images: product.images,
        category: product.category,
        brand: product.brand,
        rating: product.rating,
        review_count: product.reviewCount,
        stock: product.stock,
        unit: product.unit,
        weight: product.weight,
        nutrition: product.nutrition,
        featured: product.featured,
        on_sale: product.onSale
      })
      .select()
    
    if (error) {
      console.error('Error inserting product:', product.name, error)
    } else {
      console.log('✅ Product migrated:', product.name)
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting data migration...')
    
    await migrateCategories()
    await migrateProducts()
    
    console.log('✅ Data migration completed!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  main()
}

export { migrateCategories, migrateProducts }
