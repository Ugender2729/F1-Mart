'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Loader2, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { signIn } = useAuth();
  const emailAuthEnabled = useMemo(() => process.env.NEXT_PUBLIC_ENABLE_EMAIL_AUTH === 'true', []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'mobileNumber') {
      // Only allow numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check for admin credentials first (keep admin login unchanged)
      const adminMobileNumber = '9398601984';
      const adminPassword = '9381493260';
      
      if (formData.mobileNumber === adminMobileNumber && formData.password === adminPassword) {
        // Set admin session
        localStorage.setItem('admin', JSON.stringify({
          email: `${adminMobileNumber}@admin.mobile`,
          mobileNumber: adminMobileNumber,
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
      
      // Validate mobile number
      if (formData.mobileNumber.length !== 10) {
        setError('Please enter a valid 10-digit mobile number');
        toast.error('Validation Error', {
          description: 'Please enter a valid 10-digit mobile number'
        });
        setLoading(false);
        return;
      }

      // Generate email from mobile number and password from last 6 digits
      const email = `${formData.mobileNumber}@mobile.user`;
      const password = formData.mobileNumber.slice(-6); // Last 6 digits
      
      // Check if password matches last 6 digits
      if (formData.password !== password) {
        setError('Password should be the last 6 digits of your mobile number');
        toast.error('Authentication Error', {
          description: 'Password should be the last 6 digits of your mobile number'
        });
        setLoading(false);
        return;
      }
      
      if (!emailAuthEnabled) {
        setError('Sign in via mobile/OTP is coming soon. Email logins are disabled.');
        toast.info('Authentication disabled', { description: 'Email/password sign in is disabled for now.' });
        setLoading(false);
        return;
      }

      // Handle user sign in with generated credentials (only if enabled)
      const { error } = await signIn(email, password);
      
      if (error) {
        // Provide user-friendly error messages for mobile authentication
        let errorMessage = error.message;
        let errorDescription = error.message;
        
        if (error.message.includes('Email logins are disabled') || 
            error.message.includes('email logins are disabled')) {
          errorMessage = 'Mobile authentication is being set up';
          errorDescription = 'Please try again in a moment. If the issue persists, contact support.';
        } else if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid mobile number or password';
          errorDescription = 'Please check your mobile number and ensure the password is the last 6 digits.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many attempts';
          errorDescription = 'Please wait a moment before trying again.';
        }
        
        setError(errorMessage);
        toast.error('Sign in failed', {
          description: errorDescription
        });
      } else {
        toast.success('Welcome back!', {
          description: 'You have been successfully signed in.'
        });
        router.push('/');
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
          Sign In
        </CardTitle>
        <CardDescription className="text-indigo-100">
          {emailAuthEnabled ? 'Sign in with your mobile number' : 'Email/password sign in is disabled'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="pl-10"
                required
                disabled={!emailAuthEnabled}
              />
            </div>
            <p className="text-xs text-gray-500">
              Enter your 10-digit mobile number (e.g., 9876543210)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Last 6 digits of mobile number"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={!emailAuthEnabled}
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
            <p className="text-xs text-gray-500">
              Password is the last 6 digits of your mobile number
            </p>
          </div>

          {!emailAuthEnabled && (
            <div className="text-sm bg-yellow-50 text-yellow-800 p-3 rounded-md">
              Email/password sign in is disabled. We are adding OTP/Clerk auth soon.
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg" disabled={loading || !emailAuthEnabled}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Admin? Use your admin credentials to access the dashboard.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;

