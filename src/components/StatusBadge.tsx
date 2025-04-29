
import React from 'react';
import { ApprovalStatus, getStatusClass, getStatusText } from '@/utils/status-utils';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ApprovalStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <span 
      className={cn(
        "px-2 py-1 text-sm font-medium rounded-full border neon-text",
        getStatusClass(status),
        className
      )}
    >
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;
