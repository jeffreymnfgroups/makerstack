import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm relative animate-in fade-in-0 slide-in-from-top-4 duration-200 mx-auto">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">Sign In</div>
          <div className="text-gray-500 text-sm">Dummy sign-in for demo purposes</div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <Button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition-all duration-200 mt-2"
          >
            Sign In
          </Button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-900 text-sm underline"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 