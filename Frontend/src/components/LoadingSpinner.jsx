import React from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingSpinner = ({ message = 'Taking a mindful moment...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-full border-4 border-lavender-100 border-t-lavender-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-lavender-600">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-medium text-charcoal-600 tracking-wide">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
