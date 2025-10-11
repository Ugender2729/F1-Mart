'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, 
  AlertTriangle, 
  PackageX, 
  TrendingUp, 
  RefreshCw,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useStockManagement } from '@/hooks/useStockManagement';
import { StockWarning } from '@/components/ui/stock-warning';

export function StockManagement() {
  const {
    stockSummary,
    lowStockProducts,
    loading,
    error,
    fetchStockSummary,
    fetchLowStockProducts,
    updateProductStock
  } = useStockManagement();

  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);

  const handleEditStock = (productId: string, currentStock: number) => {
    setEditingProduct(productId);
    setEditStock(currentStock);
  };

  const handleSaveStock = async (productId: string) => {
    const result = await updateProductStock(productId, editStock);
    if (result.error) {
      console.error('Failed to update stock:', result.error);
    } else {
      setEditingProduct(null);
      setEditStock(0);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditStock(0);
  };

  const refreshData = () => {
    fetchStockSummary();
    fetchLowStockProducts();
  };

  if (loading && !stockSummary) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading stock data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Stock Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and manage product inventory levels
          </p>
        </div>
        <Button onClick={refreshData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stock Summary Cards */}
      {stockSummary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockSummary.total_products}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stockSummary.in_stock_count}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stockSummary.low_stock_count}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <PackageX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stockSummary.out_of_stock_count}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Low Stock Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Low Stock Products
          </CardTitle>
          <CardDescription>
            Products that need restocking attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No low stock products found!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <StockWarning 
                        product={product} 
                        size="sm"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category} • {product.unit}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {editingProduct === product.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(Number(e.target.value))}
                          className="w-20"
                          min="0"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveStock(product.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {product.stock} {product.unit}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditStock(product.id, product.stock)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Rules Information */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Warning Rules</CardTitle>
          <CardDescription>
            Automatic stock warnings are triggered based on these rules:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm">
                <strong>Regular Products:</strong> Low stock warning when less than 10 items
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm">
                <strong>Powder Products:</strong> Low stock warning when less than 10kg
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">
                <strong>Out of Stock:</strong> When stock reaches 0
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



