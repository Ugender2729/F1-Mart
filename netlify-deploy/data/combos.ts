import { Combo } from '@/types/combo';

export const combos: Combo[] = [
  // 🧴 HOUSEHOLD ESSENTIALS COMBOS
  {
    id: 'household-001',
    name: 'Cleaning Power Combo',
    category: 'household',
    description: 'Complete cleaning solution for your home',
    items: [
      { name: 'Surf Excel / Tide Detergent', quantity: '1 kg', alternatives: ['Surf Excel', 'Tide'] },
      { name: 'Vim Dishwash Liquid', quantity: '500 ml' },
      { name: 'Lizol Floor Cleaner', quantity: '500 ml' }
    ],
    originalPrice: 599,
    discountedPrice: 479,
    discountPercent: 20,
    savings: 120,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=300&fit=crop',
    badge: 'Best Seller'
  },
  {
    id: 'household-002',
    name: 'Laundry Care Combo',
    category: 'household',
    description: 'Premium laundry care essentials',
    items: [
      { name: 'Surf Excel Matic', quantity: '1 kg' },
      { name: 'Comfort Fabric Conditioner', quantity: '400 ml' },
      { name: 'Rin Bar', quantity: '250 g' }
    ],
    originalPrice: 545,
    discountedPrice: 436,
    discountPercent: 20,
    savings: 109,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
    badge: 'Popular'
  },
  {
    id: 'household-003',
    name: 'Bathroom Hygiene Combo',
    category: 'household',
    description: 'Keep your bathroom fresh and clean',
    items: [
      { name: 'Harpic Toilet Cleaner', quantity: '500 ml' },
      { name: 'Dettol Liquid', quantity: '250 ml' },
      { name: 'Room Freshener', quantity: '1 unit', alternatives: ['Air Wick', 'Odonil'] }
    ],
    originalPrice: 465,
    discountedPrice: 372,
    discountPercent: 20,
    savings: 93,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop'
  },

  // 🍳 KITCHEN ESSENTIALS COMBOS
  {
    id: 'kitchen-001',
    name: 'Cooking Basics Combo',
    category: 'kitchen',
    description: 'Essential ingredients for everyday cooking',
    items: [
      { name: 'Fortune Sunflower Oil', quantity: '1 L' },
      { name: 'Tata Salt', quantity: '1 kg' },
      { name: 'Aashirvaad Atta', quantity: '5 kg' }
    ],
    originalPrice: 595,
    discountedPrice: 476,
    discountPercent: 20,
    savings: 119,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
    badge: 'Best Value'
  },
  {
    id: 'kitchen-002',
    name: 'Everyday Cooking Trio',
    category: 'kitchen',
    description: 'Must-have spices and oil for daily meals',
    items: [
      { name: 'Sunflower Oil', quantity: '1 L' },
      { name: 'Turmeric Powder', quantity: '100 g' },
      { name: 'Chilli Powder', quantity: '100 g' }
    ],
    originalPrice: 299,
    discountedPrice: 239,
    discountPercent: 20,
    savings: 60,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kitchen-003',
    name: 'Breakfast Quick Pack',
    category: 'kitchen',
    description: 'Start your day with a perfect breakfast',
    items: [
      { name: 'Fresh Bread', quantity: '400 g' },
      { name: 'Amul Butter', quantity: '100 g' },
      { name: 'Mixed Fruit Jam', quantity: '200 g' }
    ],
    originalPrice: 185,
    discountedPrice: 148,
    discountPercent: 20,
    savings: 37,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    badge: 'Morning Saver'
  },
  {
    id: 'kitchen-004',
    name: 'Tea Time Combo',
    category: 'kitchen',
    description: 'Perfect tea-time essentials',
    items: [
      { name: 'Red Label Tea', quantity: '250 g' },
      { name: 'Sugar', quantity: '1 kg' },
      { name: 'Fresh Milk', quantity: '1 L' }
    ],
    originalPrice: 295,
    discountedPrice: 236,
    discountPercent: 20,
    savings: 59,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop'
  },

  // 🚿 PERSONAL CARE COMBOS
  {
    id: 'personal-001',
    name: 'Bathing Essentials Combo',
    category: 'personal-care',
    description: 'Complete bathing and hygiene essentials',
    items: [
      { name: 'Premium Soap', quantity: '3x100 g', alternatives: ['Lux', 'Dove'] },
      { name: 'Lifebuoy Handwash', quantity: '200 ml' },
      { name: 'Dettol Antiseptic Liquid', quantity: '100 ml' }
    ],
    originalPrice: 375,
    discountedPrice: 300,
    discountPercent: 20,
    savings: 75,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
    badge: 'Family Pack'
  },
  {
    id: 'personal-002',
    name: 'Hair Care Combo',
    category: 'personal-care',
    description: 'Complete hair care solution',
    items: [
      { name: 'Shampoo', quantity: '180 ml', alternatives: ['Clinic Plus', 'Dove'] },
      { name: 'Coconut Oil', quantity: '100 ml' },
      { name: 'Hair Conditioner', quantity: '80 ml' }
    ],
    originalPrice: 325,
    discountedPrice: 260,
    discountPercent: 20,
    savings: 65,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=300&fit=crop'
  },
  {
    id: 'personal-003',
    name: "Men's Grooming Combo",
    category: 'personal-care',
    description: 'Complete grooming essentials for men',
    items: [
      { name: 'Gillette Razor', quantity: '1 unit' },
      { name: 'Shaving Cream', quantity: '70 g' },
      { name: 'Aftershave Lotion', quantity: '50 ml' }
    ],
    originalPrice: 445,
    discountedPrice: 356,
    discountPercent: 20,
    savings: 89,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=300&fit=crop',
    badge: "Men's Special"
  },
  {
    id: 'personal-004',
    name: "Women's Care Combo",
    category: 'personal-care',
    description: 'Essential care products for women',
    items: [
      { name: 'Sanitary Pads', quantity: 'Regular Pack' },
      { name: 'Intimate Wash', quantity: '100 ml' },
      { name: 'Wet Wipes', quantity: 'Pack of 10' }
    ],
    originalPrice: 395,
    discountedPrice: 316,
    discountPercent: 20,
    savings: 79,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=300&fit=crop',
    badge: "Women's Care"
  },

  // 🏠 FAMILY UTILITY COMBOS
  {
    id: 'family-001',
    name: 'Family Hygiene Combo',
    category: 'family-utility',
    description: 'Complete hygiene solution for the whole family',
    items: [
      { name: 'Lifebuoy Soap', quantity: '4x100 g' },
      { name: 'Colgate Toothpaste', quantity: '150 g' },
      { name: 'Toothbrush', quantity: 'Pack of 2' }
    ],
    originalPrice: 345,
    discountedPrice: 276,
    discountPercent: 20,
    savings: 69,
    image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=300&fit=crop',
    badge: 'Family Saver'
  },
  {
    id: 'family-002',
    name: 'Monthly Refill Combo',
    category: 'family-utility',
    description: 'Monthly essentials refill pack',
    items: [
      { name: 'Surf Excel', quantity: '1 kg' },
      { name: 'Vim Liquid', quantity: '500 ml' },
      { name: 'Dettol Soap', quantity: '3x100 g' }
    ],
    originalPrice: 525,
    discountedPrice: 420,
    discountPercent: 20,
    savings: 105,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    badge: 'Monthly Pack'
  },
  {
    id: 'family-003',
    name: 'Home Fragrance Combo',
    category: 'family-utility',
    description: 'Keep your home fresh and fragrant',
    items: [
      { name: 'Odonil Room Freshener', quantity: '1 unit' },
      { name: 'Camphor Tablets', quantity: '100 g' },
      { name: 'Agarbatti Pack', quantity: '1 pack' }
    ],
    originalPrice: 235,
    discountedPrice: 188,
    discountPercent: 20,
    savings: 47,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
  }
];

export const comboCategories = [
  { id: 'all', name: 'All Combos', icon: '🎁' },
  { id: 'household', name: 'Household Essentials', icon: '🧴' },
  { id: 'kitchen', name: 'Kitchen Essentials', icon: '🍳' },
  { id: 'personal-care', name: 'Personal Care', icon: '🚿' },
  { id: 'family-utility', name: 'Family Utility', icon: '🏠' }
];

