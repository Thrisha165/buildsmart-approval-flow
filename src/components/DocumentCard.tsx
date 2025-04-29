
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Document } from '@/types';
import StatusBadge from './StatusBadge';
import { FileText } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentCardProps {
  document: Document;
  onClick: (documentId: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onClick }) => {
  // Convert string date to Date object and format it
  const formattedDate = (() => {
    try {
      return format(new Date(document.uploadDate), 'MMM d, yyyy');
    } catch (e) {
      return document.uploadDate;
    }
  })();

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={() => onClick(document.id)}
    >
      <CardContent className="p-4 flex items-center">
        <div className="bg-gray-100 p-3 rounded-lg">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="font-medium text-sm">{document.name}</h3>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <div>
          <StatusBadge status={document.status} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
