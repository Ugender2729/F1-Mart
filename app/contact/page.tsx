'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Get in <span className="text-emerald-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions, feedback, or need support, 
            our team is here to help you with all your grocery needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">1-800-FRESH-01</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">help@freshmarket.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Service Area</h3>
                    <p className="text-gray-600 dark:text-gray-300">Available in 50+ cities</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Check your area for delivery availability</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Customer Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">24/7 Online Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Live chat available on our website</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a href="/faq" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white">Frequently Asked Questions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Find answers to common questions</p>
                  </a>
                  <a href="/help" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white">Help Center</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive help articles</p>
                  </a>
                  <a href="/shipping" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white">Shipping Information</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Delivery times and policies</p>
                  </a>
                  <a href="/returns" className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-white">Returns & Refunds</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Our return policy and process</p>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-h-[120px]"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Other Ways to Reach Us
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Mail className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      For general inquiries and support
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Phone className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      For urgent issues and immediate help
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Available 24/7 on our website
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
