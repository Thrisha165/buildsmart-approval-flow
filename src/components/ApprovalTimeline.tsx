
import React from 'react';
import { ApprovalStep } from '@/types';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface ApprovalTimelineProps {
  steps: ApprovalStep[];
}

const ApprovalTimeline: React.FC<ApprovalTimelineProps> = ({ steps }) => {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isCompleted = step.status === 'approved' || step.status === 'rejected';
        
        let iconClassName = 'w-10 h-10 flex items-center justify-center rounded-full';
        if (step.status === 'approved') {
          iconClassName += ' bg-success/20 text-success neon-border ring-success';
        } else if (step.status === 'rejected') {
          iconClassName += ' bg-destructive/20 text-destructive neon-border ring-destructive';
        } else {
          iconClassName += ' border-2 border-dashed border-muted-foreground text-muted-foreground';
        }

        return (
          <div key={step.id} className="relative">
            <div className="flex items-start">
              <div className={iconClassName}>
                {step.status === 'approved' && <Check className="w-5 h-5" />}
                {step.status === 'rejected' && <X className="w-5 h-5" />}
                {step.status === 'pending' && <span className="w-2.5 h-2.5 bg-muted-foreground rounded-full"></span>}
              </div>
              <div className="ml-4">
                <div className="font-medium text-lg">{step.name}</div>
                
                {isCompleted ? (
                  <div className="mt-2 text-base">
                    <div className="flex items-center text-muted-foreground">
                      <span>
                        {step.status === 'approved' ? 'Approved' : 'Rejected'} by {step.approver?.name}
                      </span>
                    </div>
                    {step.date && (
                      <div className="text-base text-muted-foreground mt-1">
                        {format(new Date(step.date), 'MMM d, yyyy')}
                      </div>
                    )}
                    {step.comments && (
                      <div className="mt-3 p-3 bg-secondary/20 rounded text-base">
                        {step.comments}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-2 text-base text-muted-foreground">Waiting for approval</div>
                )}
              </div>
            </div>
            
            {!isLast && (
              <div className="absolute left-5 top-10 h-16 w-px bg-muted-foreground/20"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ApprovalTimeline;
