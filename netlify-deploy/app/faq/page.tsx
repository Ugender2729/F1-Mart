'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'General Questions',
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: 'What is FreshMarket?',
          answer: 'FreshMarket is an online grocery delivery service that brings fresh, high-quality groceries directly to your doorstep. We offer a wide selection of fruits, vegetables, dairy products, meat, pantry essentials, and more from trusted suppliers.'
        },
        {
          question: 'How do I place an order?',
          answer: 'Placing an order is easy! Simply browse our products, add items to your cart, and proceed to checkout. Enter your delivery information, select a payment method, and confirm your order. You\'ll receive a confirmation email with your order details.'
        },
        {
          question: 'What areas do you deliver to?',
          answer: 'We currently deliver to over 50 cities across India, including major metropolitan areas like Mumbai, Delhi, Bangalore, Chennai, Kolkata, and Hyderabad. We\'re constantly expanding our delivery network, so check our website to see if we deliver to your area.'
        },
        {
          question: 'What are your delivery hours?',
          answer: 'We deliver 7 days a week from 8 AM to 10 PM. You can choose from same-day delivery (where available), next-day delivery, or schedule your delivery for a future date that works for you.'
        }
      ]
    },
    {
      title: 'Orders & Delivery',
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          question: 'How can I track my order?',
          answer: 'Once your order is confirmed, you\'ll receive tracking information via email and SMS. You can also track your order in real-time through your account dashboard or by using the order ID provided in your confirmation email.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 30 minutes of placing it, as long as it hasn\'t been processed yet. After that, please contact our customer service team for assistance.'
        },
        {
          question: 'What if I\'m not home during delivery?',
          answer: 'If you\'re not available, our delivery team will leave your groceries in a safe location or with a neighbor (if you\'ve provided instructions). We\'ll send you a photo confirmation and attempt delivery twice before returning items.'
        },
        {
          question: 'Is there a minimum order amount?',
          answer: 'There\'s no minimum order amount, but orders under ₹2000 incur a delivery fee of ₹415. Orders over ₹2000 qualify for free delivery.'
        }
      ]
    },
    {
      title: 'Payment & Billing',
      icon: <Phone className="h-5 w-5" />,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, UPI payments, net banking, digital wallets (Paytm, PhonePe, Google Pay), and cash on delivery (COD). All payments are processed securely through encrypted channels.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, absolutely! We use industry-standard encryption and security measures to protect your payment information. We never store your complete payment details on our servers.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'Yes, we offer a 30-day return policy for most items. If you\'re not satisfied with your purchase, you can return it for a full refund. Some restrictions apply to perishable items.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Refunds are typically processed within 3-5 business days to your original payment method. You\'ll receive an email confirmation once the refund is initiated.'
        }
      ]
    },
    {
      title: 'Account & Support',
      icon: <Mail className="h-5 w-5" />,
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click the "Sign Up" button, enter your email and password, verify your email address, and you\'re ready to start shopping. You can also sign up using your Google or Facebook account.'
        },
        {
          question: 'I forgot my password. How can I reset it?',
          answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach our customer support team through live chat (available 24/7), email (help@freshmarket.com), or phone (1-800-FRESH-01). We also have a comprehensive help center with detailed articles.'
        },
        {
          question: 'Do you have a mobile app?',
          answer: 'Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store for a seamless shopping experience on the go.'
        }
      ]
    }
  ];

  const popularQuestions = [
    'How do I track my order?',
    'What are your delivery charges?',
    'Can I return items?',
    'What payment methods do you accept?',
    'How do I contact support?',
    'Is there a minimum order amount?'
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to common questions about our services, delivery, payments, and more. 
            Can't find what you're looking for? Contact our support team.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
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

        {/* Popular Questions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Questions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularQuestions.map((question, index) => (
              <Card key={index} className="glass-card hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
                      <HelpCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{question}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
          
          {filteredCategories.map((category, categoryIndex) => (
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
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                        {faq.answer}
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
                Can't find the answer you're looking for? Our support team is here to help you 24/7.
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

export default FAQPage;
