import React from 'react';
import { FileText, Calendar, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Terms & <span className="text-emerald-600">Conditions</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our service. 
            By using FreshMarket, you agree to be bound by these terms.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Version 1.0</span>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Acceptance of Terms */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <CheckCircle className="h-6 w-6 mr-3 text-emerald-600" />
                1. Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By accessing and using FreshMarket's website, mobile application, or services, 
                you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <Shield className="h-6 w-6 mr-3 text-emerald-600" />
                2. Use License
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Permission is granted to temporarily download one copy of the materials on 
                FreshMarket's website for personal, non-commercial transitory viewing only.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>This is the grant of a license, not a transfer of title</li>
                <li>You may not modify or copy the materials</li>
                <li>You may not use the materials for any commercial purpose or for any public display</li>
                <li>You may not attempt to reverse engineer any software contained on the website</li>
                <li>You may not remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <FileText className="h-6 w-6 mr-3 text-emerald-600" />
                3. Service Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                FreshMarket provides an online platform for ordering groceries and other products 
                for delivery to your specified address.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>We reserve the right to modify or discontinue the service at any time</li>
                <li>Product availability is subject to change without notice</li>
                <li>We strive to provide accurate product information but cannot guarantee 100% accuracy</li>
                <li>Delivery times are estimates and may vary based on location and circumstances</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <Shield className="h-6 w-6 mr-3 text-emerald-600" />
                4. User Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To access certain features of our service, you may be required to create an account.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to terminate accounts that violate these terms</li>
              </ul>
            </CardContent>
          </Card>

          {/* Orders and Payment */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <FileText className="h-6 w-6 mr-3 text-emerald-600" />
                5. Orders and Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Order Process</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>All orders are subject to acceptance by FreshMarket</li>
                    <li>We reserve the right to refuse or cancel any order at our discretion</li>
                    <li>Order confirmation does not guarantee product availability</li>
                    <li>Prices are subject to change without notice</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Payment Terms</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Payment is due at the time of order placement</li>
                    <li>We accept various payment methods as listed on our website</li>
                    <li>All prices are in Indian Rupees (₹) unless otherwise specified</li>
                    <li>Taxes and delivery fees will be calculated and displayed at checkout</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery and Returns */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <FileText className="h-6 w-6 mr-3 text-emerald-600" />
                6. Delivery and Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Delivery</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Delivery times are estimates and may vary</li>
                    <li>Someone must be available to receive the delivery</li>
                    <li>We will attempt delivery twice before returning items</li>
                    <li>Delivery fees apply as per our current pricing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Returns and Refunds</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Returns must be initiated within 30 days of delivery</li>
                    <li>Items must be in original condition and packaging</li>
                    <li>Perishable items may have different return policies</li>
                    <li>Refunds will be processed to the original payment method</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data Protection */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <Shield className="h-6 w-6 mr-3 text-emerald-600" />
                7. Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, 
                which also governs your use of the service.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>We collect and use your information as described in our Privacy Policy</li>
                <li>We implement appropriate security measures to protect your data</li>
                <li>We do not sell your personal information to third parties</li>
                <li>You have the right to access, update, or delete your personal information</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <AlertCircle className="h-6 w-6 mr-3 text-emerald-600" />
                8. Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In no event shall FreshMarket, nor its directors, employees, partners, agents, 
                suppliers, or affiliates, be liable for any indirect, incidental, special, 
                consequential, or punitive damages.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Our liability is limited to the amount you paid for the service</li>
                <li>We are not responsible for any loss or damage to your property</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>Some jurisdictions do not allow the limitation of liability</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <FileText className="h-6 w-6 mr-3 text-emerald-600" />
                9. Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify these terms at any time. We will notify users 
                of any material changes by posting the new terms on this page.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Changes will be effective immediately upon posting</li>
                <li>Your continued use of the service constitutes acceptance of the new terms</li>
                <li>We recommend reviewing these terms periodically</li>
                <li>If you disagree with the changes, you must stop using the service</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-900 dark:text-white">
                <FileText className="h-6 w-6 mr-3 text-emerald-600" />
                10. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p><strong>Email:</strong> legal@freshmarket.com</p>
                <p><strong>Phone:</strong> 1-800-FRESH-01</p>
                <p><strong>Address:</strong> FreshMarket Legal Department, Mumbai, India</p>
                <p><strong>Website:</strong> www.freshmarket.com/contact</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <Card className="glass-card">
            <CardContent className="p-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By using FreshMarket, you acknowledge that you have read and understood 
                these Terms and Conditions and agree to be bound by them.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This document was last updated on January 1, 2025. 
                For the most current version, please visit our website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
