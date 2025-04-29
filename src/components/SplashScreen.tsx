
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { Button } from './ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
      <div className="flex flex-col items-center justify-center">
        <Logo size="lg" animated={true} />
        <h1 className="mt-4 text-2xl font-bold animate-fade-in-delay-1">BuildSmart</h1>
        <p className="mt-2 text-gray-500 animate-fade-in-delay-2">Streamlining Construction Approvals</p>
      </div>
      
      {!loading && (
        <div className="mt-10 animate-fade-in">
          <Button onClick={onComplete} className="px-8">
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
