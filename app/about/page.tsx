import React from 'react';
import { Heart, Users, Award, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-emerald-600">F1 Mart</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're passionate about bringing you the freshest, highest-quality groceries 
            delivered right to your doorstep with fresh and fast delivery. Our mission is to make healthy eating 
            convenient and accessible for everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                To revolutionize the way people shop for groceries by providing 
                fresh, organic, and locally-sourced products with unmatched convenience 
                and exceptional customer service.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                To become the leading online grocery platform that connects 
                communities with fresh, sustainable food while supporting local 
                farmers and promoting healthy lifestyles.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Quality First
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We never compromise on the quality of our products
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Customer Focus
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your satisfaction is our top priority
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We strive for excellence in everything we do
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Reliability
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Count on us for timely and reliable delivery
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story */}
        <div className="mb-16">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  FreshMarket was founded in 2020 with a simple yet powerful vision: 
                  to make fresh, healthy groceries accessible to everyone, everywhere. 
                  What started as a small local delivery service has grown into a 
                  comprehensive online grocery platform serving thousands of customers.
                </p>
                <p className="mb-4">
                  Our journey began when our founders noticed the challenges people 
                  faced in accessing fresh, quality groceries, especially during 
                  busy work schedules and challenging times. We saw an opportunity 
                  to bridge this gap through technology and exceptional service.
                </p>
                <p>
                  Today, we partner with local farmers, trusted suppliers, and 
                  certified organic producers to bring you the best selection of 
                  fresh produce, dairy, meat, pantry staples, and specialty items. 
                  Every product in our catalog is carefully curated to meet our 
                  high standards for quality and freshness.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-300">Products</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Cities Served</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Customer Support</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Experience Fresh?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of satisfied customers who trust FreshMarket for their grocery needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/products" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Shop Now
                </a>
                <a 
                  href="/contact" 
                  className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
