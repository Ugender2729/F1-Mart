export interface ComboItem {
  name: string;
  quantity: string;
  alternatives?: string[]; // For items with multiple brand options
}

export interface Combo {
  id: string;
  name: string;
  category: string;
  description: string;
  items: ComboItem[];
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  image: string;
  badge?: string; // e.g., "Best Seller", "New", "Limited Offer"
  savings: number;
}

export type ComboCategory = 
  | 'household'
  | 'kitchen'
  | 'personal-care'
  | 'family-utility';

