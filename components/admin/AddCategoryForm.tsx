'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';

interface AddCategoryFormProps {
  onClose: () => void;
  onCategoryAdded: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onClose, onCategoryAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    slug: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSlugChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      name,
      slug
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get the next available ID
      const { data: existingCategories } = await supabase
        .from('categories')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      const nextId = existingCategories && existingCategories.length > 0 
        ? (parseInt(existingCategories[0].id) + 1).toString()
        : '1';

      const { data, error } = await supabase
        .from('categories')
        .insert([
          {
            id: nextId,
            name: formData.name,
            description: formData.description,
            image: formData.image,
            slug: formData.slug,
            productCount: 0
          }
        ])
        .select();

      if (error) {
        setError(error.message);
        return;
      }

      toast.success('Category added successfully!');
      onCategoryAdded();
    } catch (error) {
      console.error('Add category error:', error);
      setError('Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 bg-gray-800 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Add New Category</CardTitle>
              <CardDescription className="text-gray-300">Add a new category to your store</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Category Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) => handleSlugChange(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-gray-300">Slug (URL-friendly name)</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="category-slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter category description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-500 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Category...
                  </>
                ) : (
                  'Add Category'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategoryForm;
