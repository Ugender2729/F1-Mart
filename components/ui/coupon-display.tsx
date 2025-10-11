'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Tag, 
  Percent, 
  Gift, 
  Truck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Copy,
  Sparkles
} from 'lucide-react';
import { Coupon } from '@/hooks/useCoupons';

interface CouponDisplayProps {
  coupon: Coupon;
  onApply?: (couponCode: string) => void;
  onRemove?: (couponCode: string) => void;
  isApplied?: boolean;
  showApplyButton?: boolean;
  className?: string;
}

export function CouponDisplay({ 
  coupon, 
  onApply, 
  onRemove, 
  isApplied = false,
  showApplyButton = true,
  className = '' 
}: CouponDisplayProps) {
  const getCouponIcon = () => {
    switch (coupon.type) {
      case 'percentage':
        return <Percent className="h-4 w-4" />;
      case 'fixed':
        return <Tag className="h-4 w-4" />;
      case 'free_delivery':
        return <Truck className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const getCouponColor = () => {
    if (isApplied) {
      return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
    }
    
    if (coupon.is_first_order_only) {
      return 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20';
    }
    
    return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
  };

  const getCouponText = () => {
    switch (coupon.type) {
      case 'percentage':
        return `${coupon.value}% off`;
      case 'fixed':
        return `₹${coupon.value} off`;
      case 'free_delivery':
        return 'Free delivery';
      default:
        return 'Discount';
    }
  };

  const getValidityStatus = () => {
    const now = new Date();
    const validFrom = new Date(coupon.valid_from);
    const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null;

    if (!coupon.is_active) {
      return { isValid: false, message: 'Inactive' };
    }

    if (now < validFrom) {
      return { isValid: false, message: 'Not yet valid' };
    }

    if (validUntil && now > validUntil) {
      return { isValid: false, message: 'Expired' };
    }

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return { isValid: false, message: 'Usage limit reached' };
    }

    return { isValid: true, message: 'Valid' };
  };

  const validity = getValidityStatus();

  return (
    <Card className={`${getCouponColor()} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCouponIcon()}
            <CardTitle className="text-lg font-bold">
              {coupon.name}
            </CardTitle>
            {coupon.is_first_order_only && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Sparkles className="h-3 w-3 mr-1" />
                First Order
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isApplied ? (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Applied
              </Badge>
            ) : (
              <Badge variant={validity.isValid ? "default" : "destructive"}>
                {validity.isValid ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {validity.message}
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    {validity.message}
                  </>
                )}
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>
          {coupon.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Coupon Code */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Code:</Label>
            <div className="flex items-center gap-2">
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                {coupon.code}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(coupon.code)}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Discount Amount */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Discount:</Label>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {getCouponText()}
            </span>
          </div>

          {/* Minimum Amount */}
          {coupon.minimum_amount > 0 && (
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Min. Order:</Label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ₹{coupon.minimum_amount}
              </span>
            </div>
          )}

          {/* Usage Info */}
          {coupon.usage_limit && (
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Usage:</Label>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {coupon.used_count}/{coupon.usage_limit} used
              </span>
            </div>
          )}

          {/* Validity Period */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Valid:</Label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(coupon.valid_from).toLocaleDateString()} - {' '}
              {coupon.valid_until ? new Date(coupon.valid_until).toLocaleDateString() : 'No expiry'}
            </span>
          </div>

          {/* Action Buttons */}
          {showApplyButton && (
            <div className="flex gap-2 pt-2">
              {isApplied ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove?.(coupon.code)}
                  className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => onApply?.(coupon.code)}
                  disabled={!validity.isValid}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Apply Coupon
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Component for displaying first order coupon automatically
interface FirstOrderCouponBannerProps {
  couponCode: string;
  discountAmount: number;
  message: string;
  onApply: () => void;
  onDismiss: () => void;
}

export function FirstOrderCouponBanner({
  couponCode,
  discountAmount,
  message,
  onApply,
  onDismiss
}: FirstOrderCouponBannerProps) {
  return (
    <Alert className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20">
      <Sparkles className="h-4 w-4 text-purple-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-purple-900 dark:text-purple-100">
            🎉 {message}
          </p>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Use code <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-800 rounded text-xs font-mono">
              {couponCode}
            </code> for ₹{discountAmount} off!
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={onApply}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Apply Now
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/20"
          >
            Dismiss
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}



