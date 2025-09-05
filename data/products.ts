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