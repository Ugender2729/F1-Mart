'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, BookOpen, MessageCircle, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <BookOpen className="h-5 w-5" />,
      articles: [
        {
          title: 'How to create an account',
          content: 'Creating an account is easy! Click the "Sign Up" button in the top right corner, enter your email and password, and verify your email address. You\'ll then be able to start shopping immediately.'
        },
        {
          title: 'How to place your first order',
          content: 'Browse our products, add items to your cart, and proceed to checkout. Enter your delivery address, select a delivery time, and complete your payment. Your order will be confirmed via email.'
        },
        {
          title: 'Understanding delivery areas',
          content: 'We deliver to over 50 cities across the country. Enter your postal code on our homepage to check if we deliver to your area. We\'re constantly expanding our delivery network.'
        }
      ]
    },
    {
      title: 'Account & Profile',
      icon: <MessageCircle className="h-5 w-5" />,
      articles: [
        {
          title: 'How to update your profile',
          content: 'Go to your account settings by clicking on your profile icon. You can update your personal information, delivery addresses, and payment methods at any time.'
        },
        {
          title: 'Managing your addresses',
          content: 'Add multiple delivery addresses for home, work, or other locations. You can set a default address and easily switch between them during checkout.'
        },
        {
          title: 'Password and security',
          content: 'Keep your account secure by using a strong password and enabling two-factor authentication. You can change your password anytime in your account settings.'
        }
      ]
    },
    {
      title: 'Orders & Delivery',
      icon: <Phone className="h-5 w-5" />,
      articles: [
        {
          title: 'Tracking your order',
          content: 'Once your order is confirmed, you\'ll receive tracking information via email and SMS. You can also track your order in real-time through your account dashboard.'
        },
        {
          title: 'Delivery time slots',
          content: 'We offer flexible delivery time slots throughout the day. Choose from same-day delivery (where available) or schedule for a future date that works for you.'
        },
        {
          title: 'What if I\'m not home?',
          content: 'If you\'re not available, our delivery team will leave your groceries in a safe location or with a neighbor (if you\'ve provided instructions). We\'ll send you a photo confirmation.'
        }
      ]
    },
    {
      title: 'Payment & Billing',
      icon: <Mail className="h-5 w-5" />,
      articles: [
        {
          title: 'Accepted payment methods',
          content: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted channels.'
        },
        {
          title: 'Understanding your bill',
          content: 'Your bill includes the cost of items, applicable taxes, delivery fees (if any), and any discounts applied. Free delivery is available on orders over ₹2000.'
        },
        {
          title: 'Refund process',
          content: 'Refunds are processed within 3-5 business days to your original payment method. You\'ll receive an email confirmation once the refund is initiated.'
        }
      ]
    }
  ];

  const popularArticles = [
    'How to track my order?',
    'What are your delivery charges?',
    'How do I return an item?',
    'Can I modify my order after placing it?',
    'What payment methods do you accept?',
    'How do I contact customer support?'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Help <span className="text-emerald-600">Center</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to your questions and get the support you need for a seamless shopping experience.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-gray-300 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Get instant help from our support team</p>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Speak directly with our support team</p>
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                1-800-FRESH-01
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Send us a detailed message</p>
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="glass-card hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
                      <BookOpen className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{article}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Categories */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
          
          {helpCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl text-gray-900 dark:text-white">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
                    {category.icon}
                  </div>
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.articles.map((article, articleIndex) => (
                    <AccordionItem key={articleIndex} value={`item-${categoryIndex}-${articleIndex}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium text-gray-900 dark:text-white">{article.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                        {article.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16">
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
