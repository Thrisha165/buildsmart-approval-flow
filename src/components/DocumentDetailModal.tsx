
import React from 'react';
import { Document } from '@/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ApprovalTimeline from './ApprovalTimeline';

interface DocumentDetailModalProps {
  document: Document;
  onClose: () => void;
}

const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-fade-in glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold neon-text text-neon-blue">{document.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <div className="mb-5">
            <h3 className="text-base font-medium text-muted-foreground">Status</h3>
            <div className="mt-2">
              <StatusBadge status={document.status} />
            </div>
          </div>
          
          <div className="mb-5">
            <h3 className="text-base font-medium text-muted-foreground">Document Information</h3>
            <div className="mt-3 text-base rounded-lg border p-4 bg-secondary/20">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Document Type:</div>
                <div className="font-medium">{document.type.charAt(0).toUpperCase() + document.type.slice(1)}</div>
                
                <div className="text-muted-foreground">Upload Date:</div>
                <div className="font-medium">{document.uploadDate}</div>
                
                <div className="text-muted-foreground">Document ID:</div>
                <div className="font-medium truncate">{document.id}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-muted-foreground mb-3">Approval Timeline</h3>
            <ApprovalTimeline steps={document.approvalSteps} />
          </div>
        </div>
        
        <div className="p-4 border-t mt-auto">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={onClose} className="text-base">Close</Button>
            <Button className="text-base">Download</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailModal;
