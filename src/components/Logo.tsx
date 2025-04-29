
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', animated = false }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center">
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-logo-spin' : ''}`}>
        <div className="absolute inset-0 bg-neon-blue rounded-md rotate-45 neon-border ring-neon-blue"></div>
        <div className="absolute inset-0 bg-background rounded-sm flex items-center justify-center transform rotate-45 scale-[0.6]">
          <div className="bg-neon-blue h-1/2 w-1/2 rounded-sm"></div>
        </div>
      </div>
      <span className="ml-2 font-bold text-xl text-neon-blue neon-text">BuildSmart</span>
    </div>
  );
};

export default Logo;
