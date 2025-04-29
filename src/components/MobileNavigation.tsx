
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Bell, User, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Plus, label: 'Add', path: '/upload', primary: true },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-card/90 backdrop-blur-md z-10">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 relative",
                isActive ? "text-neon-blue neon-text" : "text-muted-foreground",
                item.primary && "-mt-5"
              )}
              onClick={() => navigate(item.path)}
            >
              {item.primary ? (
                <div className="rounded-full bg-neon-blue text-background p-3 shadow-lg neon-border ring-neon-blue">
                  <item.icon className="h-6 w-6" />
                </div>
              ) : (
                <>
                  <item.icon className="h-6 w-6" />
                  <span className="text-sm mt-1">{item.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
