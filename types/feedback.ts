export interface Feedback {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  category: FeedbackCategory;
  rating: number; // 1-5
  message: string;
  orderId?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export type FeedbackCategory = 
  | 'product-quality'
  | 'delivery-service'
  | 'customer-service'
  | 'website-experience'
  | 'pricing'
  | 'app-feature'
  | 'other';

export interface FeedbackFormData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  category: FeedbackCategory;
  rating: number;
  message: string;
  orderId?: string;
}

