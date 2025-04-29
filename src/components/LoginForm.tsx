
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from './Logo';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating a login request
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        // For demo purposes, any non-empty email/password will work
        toast({
          title: "Login successful",
          description: "Welcome to BuildSmart",
        });
        onLogin();
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center p-6">
      <div className="flex justify-center mb-4">
        <Logo />
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Login to BuildSmart</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal" 
                onClick={onSignUp}
              >
                Sign Up
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
