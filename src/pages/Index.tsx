
import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';
import Dashboard from '@/pages/Dashboard';

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  // In a real app, we would check if the user is logged in using a token
  useEffect(() => {
    const checkLogin = localStorage.getItem('isLoggedIn');
    if (checkLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <>
      {authView === 'login' ? (
        <LoginForm 
          onLogin={handleLoginSuccess} 
          onSignUp={() => setAuthView('signup')} 
        />
      ) : (
        <SignUpForm 
          onSignUp={handleLoginSuccess} 
          onLogin={() => setAuthView('login')} 
        />
      )}
    </>
  );
};

export default Index;
