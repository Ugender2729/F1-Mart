'use client';

import React from 'react';
import { MessageSquareHeart, TrendingUp, Users, Award } from 'lucide-react';
import FeedbackForm from '@/components/feedback/FeedbackForm';

const FeedbackPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
                <MessageSquareHeart className="h-16 w-16" />
              </div>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                Help Us Improve
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Your feedback shapes our future • Every suggestion matters
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm font-medium">Continuous</div>
                <div className="text-xs text-white/70">Improvement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm font-medium">Customer</div>
                <div className="text-xs text-white/70">Focused</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <Award className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm font-medium">Excellence</div>
                <div className="text-xs text-white/70">Driven</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <div className="container mx-auto px-6 py-12">
        <FeedbackForm />

        {/* Why Your Feedback Matters */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white mb-8">
            Why Your Feedback Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Drive Improvements
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your suggestions help us prioritize what matters most to you
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Better Experience
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We use your feedback to enhance your shopping experience
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Quality Service
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your input ensures we maintain the highest standards
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-12 text-white text-center max-w-4xl mx-auto shadow-2xl">
          <p className="text-2xl font-bold mb-4">
            "We've implemented over 50 improvements based on customer feedback!"
          </p>
          <p className="text-white/80">
            Your voice drives our innovation. Thank you for helping us grow! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

