
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from './Logo';
import { useToast } from '@/hooks/use-toast';

interface SignUpFormProps {
  onSignUp: () => void;
  onLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating a sign up request
    setTimeout(() => {
      setIsLoading(false);
      if (name && email && password && role) {
        toast({
          title: "Account created",
          description: "Welcome to BuildSmart",
        });
        onSignUp();
      } else {
        toast({
          title: "Sign up failed",
          description: "Please fill out all fields",
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
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input 
                id="name" 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project_manager">Project Manager</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                  <SelectItem value="engineer">Engineer</SelectItem>
                  <SelectItem value="architect">Architect</SelectItem>
                  <SelectItem value="regulatory">Regulatory Authority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal" 
                onClick={onLogin}
              >
                Log In
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
