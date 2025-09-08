import React from 'react';
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Returns & <span className="text-emerald-600">Refunds</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We want you to be completely satisfied with your purchase. Our hassle-free return policy 
            ensures you can shop with confidence.
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">30-Day Returns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Return most items within 30 days of delivery
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Returns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No return shipping fees for eligible items
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Process</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simple online return process
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <div className="mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                How to Return an Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Initiate Return</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Go to your order history and select "Return Item"
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Select Reason</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Choose the reason for return from the dropdown menu
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Print Label</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Print the prepaid return shipping label
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ship & Refund</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Package the item and drop it off. Get refunded within 3-5 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Policy Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                What Can Be Returned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Unopened, non-perishable items</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Items in original packaging</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Defective or damaged products</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Wrong items delivered</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Items past expiration date</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                What Cannot Be Returned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Opened perishable items</span>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Personalized or custom items</span>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Items damaged by misuse</span>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Items returned after 30 days</span>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Gift cards and vouchers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Refund Information */}
        <div className="mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                Refund Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Refund Timeline</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Processing: 1-2 business days</li>
                    <li>• Credit Card: 3-5 business days</li>
                    <li>• Bank Transfer: 5-7 business days</li>
                    <li>• Digital Wallet: 1-3 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Refund Methods</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Original payment method</li>
                    <li>• Store credit (faster processing)</li>
                    <li>• Bank transfer (for large amounts)</li>
                    <li>• Digital wallet refunds</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need Help with Your Return?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our customer service team is here to help you with any return-related questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="/help" 
                  className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Help Center
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
