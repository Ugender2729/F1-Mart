import { Product } from '@/types';

export const products: Product[] = [
  // Fresh Fruits
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Fresh, organic bananas perfect for snacking or smoothies. Rich in potassium and naturally sweet.',
    price: 119,
    originalPrice: 289,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    ],
    category: 'fruits',
    brand: 'Farm Fresh',
    rating: 4.5,
    reviewCount: 128,
    stock: 45,
    unit: 'bunch',
    weight: '1.5 lbs',
    nutritionalInfo: {
      calories: 105,
      protein: '1.3g',
      carbs: '27g',
      fat: '0.4g',
      fiber: '3.1g'
    },
    featured: true,
    onSale: true
  },
  {
    id: '2',
    name: 'Fresh Strawberries',
    description: 'Sweet, juicy strawberries picked at peak ripeness. Perfect for desserts or eating fresh.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    ],
    category: 'fruits',
    brand: 'Berry Best',
    rating: 4.8,
    reviewCount: 94,
    stock: 32,
    unit: 'container',
    weight: '1 lb',
    nutritionalInfo: {
      calories: 49,
      protein: '1g',
      carbs: '12g',
      fat: '0.5g',
      fiber: '3g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '3',
    name: 'Gala Apples',
    description: 'Crisp and sweet Gala apples, perfect for snacking or baking. Rich in fiber and antioxidants.',
    price: 159,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    ],
    category: 'fruits',
    brand: 'Orchard Select',
    rating: 4.3,
    reviewCount: 156,
    stock: 78,
    unit: 'bag',
    weight: '3 lbs',
    featured: false,
    onSale: false
  },
  // Vegetables
  {
    id: '4',
    name: 'Organic Broccoli',
    description: 'Fresh organic broccoli crowns, packed with nutrients and perfect for steaming or stir-frying.',
    price: 139,
    image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'vegetables',
    brand: 'Green Fields',
    rating: 4.6,
    reviewCount: 87,
    stock: 23,
    unit: 'head',
    weight: '1.2 lbs',
    nutritionalInfo: {
      calories: 34,
      protein: '2.8g',
      carbs: '7g',
      fat: '0.4g',
      fiber: '2.6g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '5',
    name: 'Rainbow Carrots',
    description: 'Colorful mix of orange, purple, and yellow carrots. Sweet, crunchy, and full of vitamins.',
    price: 112,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'vegetables',
    brand: 'Rainbow Harvest',
    rating: 4.4,
    reviewCount: 73,
    stock: 41,
    unit: 'bundle',
    weight: '2 lbs',
    featured: false,
    onSale: false
  },
  // Dairy & Eggs
  {
    id: '6',
    name: 'Organic Whole Milk',
    description: 'Fresh organic whole milk from grass-fed cows. Rich, creamy texture perfect for drinking or cooking.',
    price: 199,
    originalPrice: 456,
    image: 'https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'dairy',
    brand: 'Pure Valley',
    rating: 4.7,
    reviewCount: 203,
    stock: 18,
    unit: 'gallon',
    weight: '1 gallon',
    nutritionalInfo: {
      calories: 150,
      protein: '8g',
      carbs: '12g',
      fat: '8g',
      fiber: '0g'
    },
    featured: true,
    onSale: true
  },
  {
    id: '7',
    name: 'Free-Range Eggs',
    description: 'Farm-fresh eggs from free-range hens. Perfect for baking, cooking, or enjoying scrambled.',
    price: 239,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'dairy',
    brand: 'Happy Hens',
    rating: 4.9,
    reviewCount: 167,
    stock: 29,
    unit: 'dozen',
    weight: '1.5 lbs',
    featured: true,
    onSale: false
  },
  // Meat & Seafood
  {
    id: '8',
    name: 'Wild-Caught Salmon',
    description: 'Premium wild-caught salmon fillets. Rich in omega-3 fatty acids and perfect for grilling.',
    price: 757,
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'meat-seafood',
    brand: 'Ocean Fresh',
    rating: 4.8,
    reviewCount: 91,
    stock: 12,
    unit: 'fillet',
    weight: '1 lb',
    nutritionalInfo: {
      calories: 206,
      protein: '22g',
      carbs: '0g',
      fat: '12g',
      fiber: '0g'
    },
    featured: true,
    onSale: false
  },
  // Pantry Essentials
  {
    id: '9',
    name: 'Organic Brown Rice',
    description: 'Premium long-grain brown rice. Nutty flavor and chewy texture, perfect for healthy meals.',
    price: 278,
    image: 'https://images.pexels.com/photos/2397651/pexels-photo-2397651.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2397651/pexels-photo-2397651.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'pantry',
    brand: 'Wholesome Grains',
    rating: 4.5,
    reviewCount: 112,
    stock: 67,
    unit: 'bag',
    weight: '5 lbs',
    featured: false,
    onSale: false
  },
  {
    id: '10',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold-pressed extra virgin olive oil from Mediterranean olives. Perfect for cooking and dressing.',
    price: 517,
    originalPrice: 1327,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'pantry',
    brand: 'Mediterranean Gold',
    rating: 4.7,
    reviewCount: 145,
    stock: 25,
    unit: 'bottle',
    weight: '500ml',
    featured: true,
    onSale: true
  },
  // Snacks & Beverages
  {
    id: '11',
    name: 'Mixed Nuts Trail Mix',
    description: 'Premium mix of almonds, cashews, walnuts, and dried fruits. Perfect healthy snack.',
    price: 358,
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1751227/pexels-photo-1751227.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'snacks-beverages',
    brand: 'Nature\'s Best',
    rating: 4.6,
    reviewCount: 89,
    stock: 34,
    unit: 'bag',
    weight: '12 oz',
    nutritionalInfo: {
      calories: 170,
      protein: '6g',
      carbs: '6g',
      fat: '15g',
      fiber: '3g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '12',
    name: 'Sparkling Water Variety Pack',
    description: 'Refreshing sparkling water in multiple flavors. Zero calories, naturally flavored.',
    price: 299,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'snacks-beverages',
    brand: 'Crystal Clear',
    rating: 4.4,
    reviewCount: 76,
    stock: 56,
    unit: 'pack',
    weight: '12 cans',
    featured: true,
    onSale: false
  },
  // Dry Fruits & Nuts
  {
    id: '13',
    name: 'Premium Almonds',
    description: 'California almonds, rich in protein and healthy fats. Perfect for snacking or cooking.',
    price: 450,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'dry-fruits',
    brand: 'Nutty Delights',
    rating: 4.8,
    reviewCount: 156,
    stock: 78,
    unit: 'pack',
    weight: '500g',
    nutrition: {
      calories: '579 per 100g',
      protein: '21g',
      fat: '50g',
      carbs: '22g',
      fiber: '12g'
    },
    featured: true,
    onSale: true
  },
  {
    id: '14',
    name: 'Cashew Nuts',
    description: 'Premium cashew nuts, creamy and delicious. Great for snacking or adding to dishes.',
    price: 380,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'dry-fruits',
    brand: 'Nutty Delights',
    rating: 4.7,
    reviewCount: 134,
    stock: 65,
    unit: 'pack',
    weight: '500g',
    nutrition: {
      calories: '553 per 100g',
      protein: '18g',
      fat: '44g',
      carbs: '30g',
      fiber: '3g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '15',
    name: 'Walnuts',
    description: 'Fresh walnuts with rich omega-3 fatty acids. Perfect for brain health and snacking.',
    price: 420,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'dry-fruits',
    brand: 'Nutty Delights',
    rating: 4.6,
    reviewCount: 98,
    stock: 52,
    unit: 'pack',
    weight: '500g',
    nutrition: {
      calories: '654 per 100g',
      protein: '15g',
      fat: '65g',
      carbs: '14g',
      fiber: '7g'
    },
    featured: false,
    onSale: true
  },
  {
    id: '16',
    name: 'Raisins',
    description: 'Sweet and chewy raisins, perfect for snacking or adding to cereals and desserts.',
    price: 180,
    originalPrice: 240,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'dry-fruits',
    brand: 'Nutty Delights',
    rating: 4.5,
    reviewCount: 87,
    stock: 89,
    unit: 'pack',
    weight: '500g',
    nutrition: {
      calories: '299 per 100g',
      protein: '3g',
      fat: '0.5g',
      carbs: '79g',
      fiber: '4g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '17',
    name: 'Pistachios',
    description: 'Premium pistachios, rich in protein and antioxidants. Great for heart health.',
    price: 520,
    originalPrice: 680,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'dry-fruits',
    brand: 'Nutty Delights',
    rating: 4.9,
    reviewCount: 203,
    stock: 45,
    unit: 'pack',
    weight: '500g',
    nutrition: {
      calories: '560 per 100g',
      protein: '20g',
      fat: '45g',
      carbs: '28g',
      fiber: '10g'
    },
    featured: true,
    onSale: true
  },
  {
    id: '18',
    name: 'Mixed Dry Fruits',
    description: 'Premium mix of almonds, cashews, walnuts, raisins, and pistachios. Perfect healthy snack.',
    price: 480,
    originalPrice: 640,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'dry-fruits',
    brand: 'Nutty Delights',
    rating: 4.8,
    reviewCount: 167,
    stock: 72,
    unit: 'pack',
    weight: '1kg',
    nutrition: {
      calories: '520 per 100g',
      protein: '18g',
      fat: '42g',
      carbs: '35g',
      fiber: '8g'
    },
    featured: true,
    onSale: false
  },
  
  // Frozen Foods - Adding 8 frozen food products
  {
    id: '19',
    name: 'Frozen Mixed Vegetables',
    description: 'Premium frozen mixed vegetables including carrots, peas, corn, and green beans. Perfect for stir-fries and soups.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Frosty Fresh',
    rating: 4.3,
    reviewCount: 156,
    stock: 67,
    unit: 'pack',
    weight: '500g',
    nutritionalInfo: {
      calories: 35,
      protein: '2.5g',
      carbs: '7g',
      fat: '0.2g',
      fiber: '3g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '20',
    name: 'Frozen Chicken Nuggets',
    description: 'Crispy, golden chicken nuggets made with premium chicken breast. Perfect for quick meals and kids.',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Crispy Delights',
    rating: 4.6,
    reviewCount: 234,
    stock: 45,
    unit: 'pack',
    weight: '400g',
    nutritionalInfo: {
      calories: 280,
      protein: '18g',
      carbs: '15g',
      fat: '16g',
      fiber: '1g'
    },
    featured: true,
    onSale: true
  },
  {
    id: '21',
    name: 'Frozen Fish Fillets',
    description: 'Premium frozen fish fillets, individually wrapped for convenience. Great source of omega-3 fatty acids.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Ocean Fresh',
    rating: 4.4,
    reviewCount: 189,
    stock: 38,
    unit: 'pack',
    weight: '600g',
    nutritionalInfo: {
      calories: 120,
      protein: '25g',
      carbs: '0g',
      fat: '2g',
      fiber: '0g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '22',
    name: 'Frozen Pizza Margherita',
    description: 'Classic Margherita pizza with fresh tomato sauce, mozzarella cheese, and basil. Ready to bake in minutes.',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Pizza Palace',
    rating: 4.2,
    reviewCount: 312,
    stock: 52,
    unit: 'pack',
    weight: '350g',
    nutritionalInfo: {
      calories: 320,
      protein: '14g',
      carbs: '38g',
      fat: '12g',
      fiber: '2g'
    },
    featured: true,
    onSale: true
  },
  {
    id: '23',
    name: 'Frozen French Fries',
    description: 'Golden, crispy French fries made from premium potatoes. Perfect side dish for any meal.',
    price: 79,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Crispy Spuds',
    rating: 4.1,
    reviewCount: 178,
    stock: 89,
    unit: 'pack',
    weight: '750g',
    nutritionalInfo: {
      calories: 160,
      protein: '2g',
      carbs: '25g',
      fat: '6g',
      fiber: '2g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '24',
    name: 'Frozen Ice Cream Vanilla',
    description: 'Creamy, rich vanilla ice cream made with real vanilla beans. Perfect for desserts and treats.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Creamy Dreams',
    rating: 4.7,
    reviewCount: 267,
    stock: 34,
    unit: 'tub',
    weight: '1L',
    nutritionalInfo: {
      calories: 250,
      protein: '4g',
      carbs: '25g',
      fat: '14g',
      fiber: '0g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '25',
    name: 'Frozen Berries Mix',
    description: 'Frozen mix of strawberries, blueberries, raspberries, and blackberries. Perfect for smoothies and baking.',
    price: 159,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Berry Fresh',
    rating: 4.5,
    reviewCount: 145,
    stock: 41,
    unit: 'pack',
    weight: '500g',
    nutritionalInfo: {
      calories: 40,
      protein: '1g',
      carbs: '10g',
      fat: '0.2g',
      fiber: '4g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '26',
    name: 'Frozen Dumplings',
    description: 'Delicious frozen dumplings filled with pork and vegetables. Steam or pan-fry for a quick meal.',
    price: 189,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'frozen',
    brand: 'Asian Delights',
    rating: 4.4,
    reviewCount: 198,
    stock: 56,
    unit: 'pack',
    weight: '400g',
    nutritionalInfo: {
      calories: 180,
      protein: '8g',
      carbs: '22g',
      fat: '6g',
      fiber: '2g'
    },
    featured: false,
    onSale: false
  },

  // Adding more products to other categories to ensure 5+ products each
  
  // More Fresh Fruits
  {
    id: '27',
    name: 'Fresh Mangoes',
    description: 'Sweet, juicy mangoes from the finest orchards. Perfect for eating fresh or making smoothies.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    ],
    category: 'fruits',
    brand: 'Tropical Fresh',
    rating: 4.6,
    reviewCount: 189,
    stock: 28,
    unit: 'kg',
    weight: '1kg',
    nutritionalInfo: {
      calories: 60,
      protein: '0.8g',
      carbs: '15g',
      fat: '0.4g',
      fiber: '1.6g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '28',
    name: 'Fresh Grapes',
    description: 'Sweet, seedless grapes perfect for snacking. Rich in antioxidants and vitamins.',
    price: 179,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1537640538966-79f369143b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1537640538966-79f369143b8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'fruits',
    brand: 'Vineyard Fresh',
    rating: 4.4,
    reviewCount: 156,
    stock: 42,
    unit: 'bunch',
    weight: '500g',
    nutritionalInfo: {
      calories: 62,
      protein: '0.6g',
      carbs: '16g',
      fat: '0.2g',
      fiber: '0.9g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '29',
    name: 'Fresh Pineapple',
    description: 'Sweet, tropical pineapple with golden flesh. Perfect for fruit salads and desserts.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'fruits',
    brand: 'Tropical Fresh',
    rating: 4.3,
    reviewCount: 134,
    stock: 35,
    unit: 'piece',
    weight: '1.5kg',
    nutritionalInfo: {
      calories: 50,
      protein: '0.5g',
      carbs: '13g',
      fat: '0.1g',
      fiber: '1.4g'
    },
    featured: false,
    onSale: false
  },

  // More Fresh Vegetables
  {
    id: '30',
    name: 'Fresh Broccoli',
    description: 'Fresh, green broccoli rich in vitamins C and K. Perfect for steaming or stir-frying.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'vegetables',
    brand: 'Garden Fresh',
    rating: 4.2,
    reviewCount: 98,
    stock: 67,
    unit: 'head',
    weight: '500g',
    nutritionalInfo: {
      calories: 34,
      protein: '2.8g',
      carbs: '7g',
      fat: '0.4g',
      fiber: '2.6g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '31',
    name: 'Fresh Bell Peppers',
    description: 'Colorful bell peppers in red, yellow, and green. Great for salads, stir-fries, and stuffing.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'vegetables',
    brand: 'Rainbow Garden',
    rating: 4.5,
    reviewCount: 112,
    stock: 54,
    unit: 'pack',
    weight: '1kg',
    nutritionalInfo: {
      calories: 31,
      protein: '1g',
      carbs: '7g',
      fat: '0.3g',
      fiber: '2.5g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '32',
    name: 'Fresh Spinach',
    description: 'Fresh, leafy spinach rich in iron and folate. Perfect for salads, smoothies, and cooking.',
    price: 49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'vegetables',
    brand: 'Leafy Greens',
    rating: 4.3,
    reviewCount: 87,
    stock: 73,
    unit: 'bunch',
    weight: '200g',
    nutritionalInfo: {
      calories: 23,
      protein: '2.9g',
      carbs: '3.6g',
      fat: '0.4g',
      fiber: '2.2g'
    },
    featured: false,
    onSale: false
  },

  // More Dairy & Eggs
  {
    id: '33',
    name: 'Greek Yogurt',
    description: 'Creamy, protein-rich Greek yogurt. Perfect for breakfast, smoothies, or as a healthy snack.',
    price: 89,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'dairy',
    brand: 'Creamy Delights',
    rating: 4.6,
    reviewCount: 234,
    stock: 45,
    unit: 'tub',
    weight: '500g',
    nutritionalInfo: {
      calories: 100,
      protein: '10g',
      carbs: '6g',
      fat: '0g',
      fiber: '0g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '34',
    name: 'Fresh Mozzarella',
    description: 'Fresh, soft mozzarella cheese perfect for salads, pizzas, and Italian dishes.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'dairy',
    brand: 'Italian Delights',
    rating: 4.4,
    reviewCount: 156,
    stock: 38,
    unit: 'ball',
    weight: '250g',
    nutritionalInfo: {
      calories: 280,
      protein: '22g',
      carbs: '2g',
      fat: '22g',
      fiber: '0g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '35',
    name: 'Organic Eggs',
    description: 'Farm-fresh organic eggs from free-range chickens. Rich in protein and essential nutrients.',
    price: 129,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'dairy',
    brand: 'Farm Fresh',
    rating: 4.7,
    reviewCount: 289,
    stock: 67,
    unit: 'dozen',
    weight: '12 pieces',
    nutritionalInfo: {
      calories: 70,
      protein: '6g',
      carbs: '0.6g',
      fat: '5g',
      fiber: '0g'
    },
    featured: true,
    onSale: false
  },
  // Beverages
  {
    id: '36',
    name: 'Fresh Orange Juice',
    description: '100% pure fresh orange juice, rich in vitamin C and natural sweetness.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Fresh Valley',
    rating: 4.6,
    reviewCount: 156,
    stock: 45,
    unit: 'bottle',
    weight: '1L',
    nutritionalInfo: {
      calories: 45,
      protein: '0.7g',
      carbs: '10g',
      fat: '0.2g',
      fiber: '0.2g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '37',
    name: 'Green Tea',
    description: 'Premium green tea leaves, rich in antioxidants and natural flavor.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Tea Masters',
    rating: 4.8,
    reviewCount: 234,
    stock: 78,
    unit: 'pack',
    weight: '100g',
    nutritionalInfo: {
      calories: 2,
      protein: '0.2g',
      carbs: '0.4g',
      fat: '0g',
      fiber: '0g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '38',
    name: 'Coconut Water',
    description: 'Natural coconut water, refreshing and hydrating with essential electrolytes.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Tropical Fresh',
    rating: 4.5,
    reviewCount: 189,
    stock: 56,
    unit: 'bottle',
    weight: '500ml',
    nutritionalInfo: {
      calories: 19,
      protein: '0.7g',
      carbs: '3.7g',
      fat: '0.2g',
      fiber: '1.1g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '39',
    name: 'Coffee Beans',
    description: 'Premium Arabica coffee beans, medium roast with rich aroma and smooth taste.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Coffee Masters',
    rating: 4.9,
    reviewCount: 312,
    stock: 34,
    unit: 'pack',
    weight: '500g',
    nutritionalInfo: {
      calories: 2,
      protein: '0.3g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g'
    },
    featured: true,
    onSale: false
  },
  {
    id: '40',
    name: 'Herbal Tea Mix',
    description: 'Blend of chamomile, peppermint, and lemongrass for a soothing experience.',
    price: 179,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Herbal Bliss',
    rating: 4.4,
    reviewCount: 98,
    stock: 67,
    unit: 'pack',
    weight: '50g',
    nutritionalInfo: {
      calories: 1,
      protein: '0.1g',
      carbs: '0.2g',
      fat: '0g',
      fiber: '0g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '41',
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with natural sweetness, perfect for summer.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Citrus Fresh',
    rating: 4.3,
    reviewCount: 145,
    stock: 89,
    unit: 'bottle',
    weight: '1L',
    nutritionalInfo: {
      calories: 40,
      protein: '0.1g',
      carbs: '10g',
      fat: '0g',
      fiber: '0.1g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '42',
    name: 'Energy Drink',
    description: 'Natural energy drink with B-vitamins and electrolytes, no artificial colors.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Vital Boost',
    rating: 4.2,
    reviewCount: 167,
    stock: 43,
    unit: 'can',
    weight: '250ml',
    nutritionalInfo: {
      calories: 25,
      protein: '0g',
      carbs: '6g',
      fat: '0g',
      fiber: '0g'
    },
    featured: false,
    onSale: false
  },
  {
    id: '43',
    name: 'Sparkling Water',
    description: 'Natural sparkling water with a hint of lime, refreshing and calorie-free.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
    images: [
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400',
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400'
    ],
    category: 'beverages',
    brand: 'Pure Sparkle',
    rating: 4.1,
    reviewCount: 123,
    stock: 78,
    unit: 'bottle',
    weight: '500ml',
    nutritionalInfo: {
      calories: 0,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      fiber: '0g'
    },
    featured: false,
    onSale: false
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  );
};