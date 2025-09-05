import React from 'react';
import { Truck, Clock, MapPin, Package, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Shipping <span className="text-emerald-600">Information</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fast, reliable, and convenient delivery options to get your fresh groceries 
            delivered right to your doorstep when you need them.
          </p>
        </div>

        {/* Delivery Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Same Day Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Order by 2 PM for same-day delivery
              </p>
              <div className="text-sm text-emerald-600 font-semibold">Available in select cities</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Next Day Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Standard delivery within 24 hours
              </p>
              <div className="text-sm text-emerald-600 font-semibold">Most popular option</div>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="bg-emerald-100 dark:bg-emerald-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Scheduled Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Choose your preferred delivery time
              </p>
              <div className="text-sm text-emerald-600 font-semibold">Plan ahead</div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Areas */}
        <div className="mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-emerald-600" />
                Delivery Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Major Cities</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Mumbai</li>
                    <li>• Delhi</li>
                    <li>• Bangalore</li>
                    <li>• Chennai</li>
                    <li>• Kolkata</li>
                    <li>• Hyderabad</li>
                    <li>• Pune</li>
                    <li>• Ahmedabad</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Metro Areas</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Gurgaon</li>
                    <li>• Noida</li>
                    <li>• Thane</li>
                    <li>• Navi Mumbai</li>
                    <li>• Ghaziabad</li>
                    <li>• Faridabad</li>
                    <li>• Greater Noida</li>
                    <li>• And more...</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Expanding</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    We're constantly expanding our delivery network. Enter your postal code 
                    to check if we deliver to your area.
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      Don't see your city? Contact us and we'll let you know when we're coming to your area!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Process */}
        <div className="mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                How Our Delivery Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Placed</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    You place your order and select delivery time
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Confirmed</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We confirm your order and start preparing
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Out for Delivery</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your order is picked and dispatched
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Delivered</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Fresh groceries delivered to your doorstep
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Fees & Policies */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                <Package className="h-5 w-5 mr-2 text-emerald-600" />
                Delivery Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <span className="text-gray-900 dark:text-white font-medium">Orders over ₹2000</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-900 dark:text-white font-medium">Orders under ₹2000</span>
                  <span className="text-gray-600 dark:text-gray-300">₹415</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-900 dark:text-white font-medium">Same-day delivery</span>
                  <span className="text-gray-600 dark:text-gray-300">₹100 extra</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-900 dark:text-white font-medium">Express delivery (2 hours)</span>
                  <span className="text-gray-600 dark:text-gray-300">₹200 extra</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-emerald-600" />
                Delivery Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Delivery time slots are available from 8 AM to 10 PM
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    We'll send SMS and email notifications for delivery updates
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Someone must be available to receive the delivery
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    We'll attempt delivery twice before returning items
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Contactless delivery options available
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Special Handling */}
        <div className="mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                Special Handling & Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Temperature Control</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Refrigerated items kept at optimal temperature</li>
                    <li>• Frozen items transported in specialized containers</li>
                    <li>• Fresh produce handled with care</li>
                    <li>• Temperature monitoring throughout delivery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Packaging</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Eco-friendly packaging materials</li>
                    <li>• Separate bags for different temperature items</li>
                    <li>• Secure packaging to prevent damage</li>
                    <li>• Reusable bags available on request</li>
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
                Questions About Delivery?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our delivery team is here to help with any questions about shipping, delivery times, or special requests.
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

export default ShippingPage;
