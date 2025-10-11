'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle, Package, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface OrderVerificationModalProps {
  orderId: string;
  deliveredAt: Date;
  onVerify: (verified: boolean, notes?: string) => void;
  onClose: () => void;
}

const OrderVerificationModal: React.FC<OrderVerificationModalProps> = ({
  orderId,
  deliveredAt,
  onVerify,
  onClose
}) => {
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute = 60 seconds
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Calculate time remaining based on delivery time
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const deliveryTime = new Date(deliveredAt).getTime();
      const elapsed = Math.floor((now - deliveryTime) / 1000);
      const remaining = Math.max(0, 60 - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        // Auto-verify as accepted after 1 minute
        handleAutoVerify();
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [deliveredAt]);

  const handleAutoVerify = () => {
    toast.success('Order Auto-Verified', {
      description: 'Your order has been automatically verified as accepted.'
    });
    onVerify(true, 'Auto-verified after 1 minute');
    onClose();
  };

  const handleVerify = async (accepted: boolean) => {
    setIsVerifying(true);
    
    try {
      const notes = accepted 
        ? verificationNotes || 'Order verified - All items received correctly'
        : verificationNotes || 'Order disputed - Issues reported';

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      onVerify(accepted, notes);
      
      toast.success(
        accepted ? 'Order Verified Successfully!' : 'Issue Reported',
        {
          description: accepted 
            ? 'Thank you for confirming your order.'
            : 'Our team will contact you shortly.',
          duration: 3000
        }
      );
      
      onClose();
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            title="Close verification modal"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Verify Your Order</h2>
              <p className="text-white/90 text-sm">Order ID: {orderId}</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border-2 border-white/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Verification Window</span>
              </div>
              <div className="text-3xl font-black tabular-nums">
                {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="mt-2 bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-1000"
                style={{ width: `${Math.max(0, Math.min(100, (timeRemaining / 60) * 100))}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Important Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">
                  Important: Verify Within 1 Minute
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Please check all items and report any issues within 1 minute of delivery. 
                  After this time, the order will be automatically verified and refunds will not be possible.
                </p>
              </div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
              Verification Checklist
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>All items received as ordered</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Items are in good condition (not damaged/expired)</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Correct quantities delivered</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Package properly sealed</span>
              </li>
            </ul>
          </div>

          {/* Notes Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes (Optional)
            </label>
            <Textarea
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              placeholder="Any comments about your delivery..."
              rows={3}
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleVerify(false)}
              disabled={isVerifying}
              variant="outline"
              className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 py-6 rounded-xl font-bold"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Report Issue
            </Button>
            <Button
              onClick={() => handleVerify(true)}
              disabled={isVerifying}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 rounded-xl font-bold shadow-lg"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Verify Order
            </Button>
          </div>

          {/* Info Text */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            {timeRemaining > 0 
              ? `You have ${formatTime(timeRemaining)} to verify your order`
              : 'Order will be auto-verified now'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderVerificationModal;

