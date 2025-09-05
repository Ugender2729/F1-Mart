import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  subtotal: number;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, onCheckout }) => {
  // Tiered discount system
  const getDiscountInfo = (subtotal: number) => {
    if (subtotal >= 1000) {
      return { 
        type: 'coupon', 
        amount: 250, 
        description: '₹250 coupon applied!',
        threshold: 1000
      };
    } else if (subtotal >= 700) {
      return { 
        type: 'coupon', 
        amount: 150, 
        description: '₹150 coupon applied!',
        threshold: 700
      };
    } else if (subtotal >= 500) {
      return { 
        type: 'delivery', 
        amount: 0, 
        description: 'Free delivery applied!',
        threshold: 500
      };
    }
    return null;
  };

  const discountInfo = getDiscountInfo(subtotal);
  const deliveryFee = subtotal >= 500 ? 0 : 415;
  const couponDiscount = discountInfo?.type === 'coupon' ? discountInfo.amount : 0;
  const tax = (subtotal - couponDiscount) * 0.08; // 8% tax on discounted amount
  const total = subtotal - couponDiscount + deliveryFee + tax;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Order Summary
      </h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
        </div>
        
        {/* Coupon Discount */}
        {couponDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Coupon Discount
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              -₹{couponDiscount.toFixed(2)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Delivery {subtotal >= 500 && '(Free over ₹500)'}
          </span>
          <span className={`font-medium ${deliveryFee === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
            {deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="font-medium text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-between text-lg font-bold">
        <span className="text-gray-900 dark:text-white">Total</span>
        <span className="text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
      </div>
      
      <Button 
        onClick={() => {
          console.log('CartSummary checkout button clicked');
          console.log('onCheckout function:', onCheckout);
          alert('Checkout button clicked! Check console for details.');
          if (onCheckout) {
            onCheckout();
          } else {
            console.error('onCheckout function is not provided');
            alert('onCheckout function is not provided');
          }
        }}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
        size="lg"
      >
        Proceed to Checkout
      </Button>
      
      {!discountInfo && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
          <p>Add ₹{(500 - subtotal).toFixed(2)} more for free delivery</p>
          <p>Add ₹{(700 - subtotal).toFixed(2)} more for ₹150 coupon</p>
          <p>Add ₹{(1000 - subtotal).toFixed(2)} more for ₹250 coupon</p>
        </div>
      )}
      
      {discountInfo && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 text-center">
            🎉 {discountInfo.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CartSummary;