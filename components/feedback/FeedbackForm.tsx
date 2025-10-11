'use client';

import React, { useState } from 'react';
import { Star, Send, MessageSquare, Sparkles, Package, Truck, HeadphonesIcon, Globe, DollarSign, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { FeedbackCategory } from '@/types/feedback';

interface FeedbackFormProps {
  orderId?: string;
  onSuccess?: () => void;
}

const categories: Array<{ id: FeedbackCategory; name: string; icon: React.ReactNode; color: string }> = [
  { id: 'product-quality', name: 'Product Quality', icon: <Package className="h-5 w-5" />, color: 'from-blue-500 to-cyan-500' },
  { id: 'delivery-service', name: 'Delivery Service', icon: <Truck className="h-5 w-5" />, color: 'from-green-500 to-emerald-500' },
  { id: 'customer-service', name: 'Customer Service', icon: <HeadphonesIcon className="h-5 w-5" />, color: 'from-purple-500 to-pink-500' },
  { id: 'website-experience', name: 'Website Experience', icon: <Globe className="h-5 w-5" />, color: 'from-orange-500 to-red-500' },
  { id: 'pricing', name: 'Pricing', icon: <DollarSign className="h-5 w-5" />, color: 'from-yellow-500 to-orange-500' },
  { id: 'app-feature', name: 'App Feature Request', icon: <Lightbulb className="h-5 w-5" />, color: 'from-indigo-500 to-purple-500' },
  { id: 'other', name: 'Other', icon: <MessageSquare className="h-5 w-5" />, color: 'from-gray-500 to-slate-500' }
];

const FeedbackForm: React.FC<FeedbackFormProps> = ({ orderId, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    category: '' as FeedbackCategory,
    rating: 0,
    message: '',
    orderId: orderId || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email address';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please share your feedback';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Feedback must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to save feedback
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would save this to your database
      const feedback = {
        id: `feedback_${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending' as const
      };

      // Save to localStorage for demo
      const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
      existingFeedback.push(feedback);
      localStorage.setItem('feedback', JSON.stringify(existingFeedback));

      toast.success('Thank you for your feedback!', {
        description: 'We appreciate your input and will use it to improve our service.',
        duration: 4000
      });

      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        category: '' as FeedbackCategory,
        rating: 0,
        message: '',
        orderId: orderId || ''
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
          <Sparkles className="h-5 w-5" />
          <span className="font-bold">Help Us Improve</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          We Value Your Feedback
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your input helps us serve you better. Share your experience with us!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerName">Your Name *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="John Doe"
              className={errors.customerName ? 'border-red-500' : ''}
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="customerEmail">Email Address *</Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              placeholder="john@example.com"
              className={errors.customerEmail ? 'border-red-500' : ''}
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerPhone">Phone Number (Optional)</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              placeholder="9876543210"
            />
          </div>

          {orderId && (
            <div>
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                value={formData.orderId}
                disabled
                className="bg-gray-100 dark:bg-gray-700"
              />
            </div>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <Label className="mb-3 block">Feedback Category *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setFormData({ ...formData, category: category.id })}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.category === category.id
                    ? `border-emerald-500 bg-gradient-to-br ${category.color} text-white shadow-lg scale-105`
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {category.icon}
                  <span className="text-xs font-semibold text-center">
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm mt-2">{errors.category}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <Label className="mb-3 block">Overall Rating *</Label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-200 transform hover:scale-110"
                title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  className={`h-10 w-10 ${
                    star <= (hoveredRating || formData.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              </button>
            ))}
            <span className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
              {formData.rating > 0 ? `${formData.rating}/5` : 'Select rating'}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-2">{errors.rating}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message">Your Feedback *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your experience... What did you like? What can we improve?"
            rows={5}
            className={errors.message ? 'border-red-500' : ''}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
            <p className="text-xs text-gray-500 ml-auto">
              {formData.message.length} characters (min. 10)
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Your feedback is confidential and will only be used to improve our services.
        </p>
      </form>
    </Card>
  );
};

export default FeedbackForm;

