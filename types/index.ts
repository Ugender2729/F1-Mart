export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  unit: string;
  weight: string;
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  ingredients?: string[];
  featured: boolean;
  onSale: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  date: string;
  address: Address;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}