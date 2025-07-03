import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'hero' | 'footer';
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to MakerStack. Check your inbox for confirmation.",
      });
      
      setTimeout(() => {
        setEmail('');
        setIsSuccess(false);
      }, 3000);
      
    } catch (error) {
      setError('Something went wrong. Please try again.');
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-xl ${className}`}>
        <Check className="h-5 w-5 text-green-600 mr-2" />
        <span className="text-green-800 font-medium">Successfully subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${
              variant === 'hero' 
                ? 'bg-white/70 backdrop-blur-sm border border-gray-300 rounded-xl h-12' 
                : 'bg-white border border-gray-300 rounded-xl h-12'
            } ${error ? 'border-red-500' : ''}`}
            disabled={isLoading}
            aria-invalid={!!error}
            aria-describedby={error ? 'email-error' : undefined}
          />
          {error && (
            <div id="email-error" className="flex items-center mt-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 rounded-xl font-medium transition-all duration-300 shadow-xl hover:shadow-2xl h-12 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Subscribing...
            </div>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Subscribe
            </>
          )}
        </Button>
      </div>
      {!error && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          No spam. Unsubscribe at any time.
        </p>
      )}
    </form>
  );
};

export default NewsletterSignup;