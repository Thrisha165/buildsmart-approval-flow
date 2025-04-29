
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{document.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <div className="mt-1">
              <StatusBadge status={document.status} />
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Document Information</h3>
            <div className="mt-2 text-sm rounded-lg border p-3 bg-muted/30">
              <div className="grid grid-cols-2 gap-1">
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
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Approval Timeline</h3>
            <ApprovalTimeline steps={document.approvalSteps} />
          </div>
        </div>
        
        <div className="p-4 border-t mt-auto">
          <Button className="w-full" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailModal;
