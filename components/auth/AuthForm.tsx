'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { signUp, signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signin') {
        // Check for admin credentials first
        const adminEmail = 'ugenderdharavath967@gmail.com';
        const adminPassword = '9398601984';
        
        if (formData.email === adminEmail && formData.password === adminPassword) {
          // Set admin session
          localStorage.setItem('admin', JSON.stringify({
            email: adminEmail,
            isAdmin: true,
            loginTime: new Date().toISOString()
          }));
          toast.success('Admin access granted!', {
            description: 'Welcome to the admin dashboard.'
          });
          router.push('/admin');
          setLoading(false);
          return;
        }
        
        // Handle regular user sign in
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          setError(error.message);
          toast.error('Sign in failed', {
            description: error.message
          });
        } else {
          toast.success('Welcome back!', {
            description: 'You have been successfully signed in.'
          });
          router.push('/');
        }
      } else {
        // Handle sign up
        // Validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          toast.error('Validation Error', {
            description: 'Passwords do not match'
          });
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          toast.error('Validation Error', {
            description: 'Password must be at least 6 characters'
          });
          setLoading(false);
          return;
        }

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          setError('First name and last name are required');
          toast.error('Validation Error', {
            description: 'First name and last name are required'
          });
          setLoading(false);
          return;
        }

        // Create user with metadata
        const userData = {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim()
        };

        const { error } = await signUp(formData.email, formData.password, userData);
        
        if (error) {
          setError(error.message);
          toast.error('Registration failed', {
            description: error.message
          });
        } else {
          // Success - show success popup and redirect
          toast.success('Account created successfully!', {
            description: 'You have been automatically signed in.',
            duration: 3000
          });
          
          // Clear form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          
          // Redirect to home page after successful registration
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error('Error', {
        description: errorMessage
      });
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-2xl">
      <CardHeader className="text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </CardTitle>
        <CardDescription className="text-indigo-100">
          {mode === 'signin' 
            ? 'Sign in to your account' 
            : 'Create a new account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              mode === 'signin' ? 'Sign In' : 'Sign Up'
            )}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={onToggleMode}
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;

