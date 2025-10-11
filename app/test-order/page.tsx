'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TestOrderPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDatabaseConnection = async () => {
    setLoading(true);
    try {
      // Test 1: Check connection
      const { data: connectionTest, error: connectionError } = await supabase
        .from('orders')
        .select('count')
        .limit(1);

      if (connectionError) {
        setResult({
          status: 'error',
          message: 'Database connection failed',
          error: connectionError
        });
        return;
      }

      // Test 2: Try to create a test order
      const testOrder = {
        user_id: null, // Guest order
        customer_name: 'Test Customer',
        customer_email: 'test@example.com',
        customer_phone: '1234567890',
        items: [
          {
            product: {
              id: 'test-1',
              name: 'Test Product',
              price: 100
            },
            quantity: 1
          }
        ],
        subtotal: 100,
        discount: 0,
        delivery_fee: 50,
        tax: 18,
        total: 168,
        status: 'confirmed',
        payment_method: 'cod',
        delivery_address: {
          street: 'Test Street',
          city: 'Test City',
          state: 'Test State',
          postalCode: '123456'
        }
      };

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([testOrder])
        .select()
        .single();

      if (orderError) {
        setResult({
          status: 'error',
          message: 'Failed to create test order',
          error: orderError,
          details: orderError.message
        });
        return;
      }

      // Test 3: Fetch the created order
      const { data: fetchedOrder, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderData.id)
        .single();

      if (fetchError) {
        setResult({
          status: 'warning',
          message: 'Order created but fetch failed',
          createdOrder: orderData,
          error: fetchError
        });
        return;
      }

      // Test 4: Delete the test order
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderData.id);

      setResult({
        status: 'success',
        message: 'All tests passed! Orders can be created and retrieved.',
        createdOrder: orderData,
        fetchedOrder: fetchedOrder,
        deleted: !deleteError
      });

    } catch (error) {
      setResult({
        status: 'error',
        message: 'Unexpected error',
        error: error
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        setResult({
          status: 'error',
          message: 'Failed to fetch orders',
          error: error
        });
        return;
      }

      setResult({
        status: 'success',
        message: `Found ${data.length} recent orders`,
        orders: data
      });

    } catch (error) {
      setResult({
        status: 'error',
        message: 'Unexpected error',
        error: error
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Order Database Test
        </h1>

        <div className="space-y-4 mb-8">
          <Button
            onClick={testDatabaseConnection}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Run Database Connection Test'}
          </Button>

          <Button
            onClick={fetchRecentOrders}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? 'Fetching...' : 'Fetch Recent Orders'}
          </Button>
        </div>

        {result && (
          <Card className="p-6 bg-white dark:bg-gray-800">
            <div className={`mb-4 p-4 rounded-lg ${
              result.status === 'success' ? 'bg-green-100 dark:bg-green-900' :
              result.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
              'bg-red-100 dark:bg-red-900'
            }`}>
              <h2 className={`text-xl font-bold ${
                result.status === 'success' ? 'text-green-800 dark:text-green-200' :
                result.status === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
                'text-red-800 dark:text-red-200'
              }`}>
                {result.status === 'success' ? '✅ Success' :
                 result.status === 'warning' ? '⚠️ Warning' :
                 '❌ Error'}
              </h2>
              <p className={`mt-2 ${
                result.status === 'success' ? 'text-green-700 dark:text-green-300' :
                result.status === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                'text-red-700 dark:text-red-300'
              }`}>
                {result.message}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Details:
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

