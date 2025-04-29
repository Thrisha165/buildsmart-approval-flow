
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Project } from '@/types';
import { Button } from './ui/button';

interface ProjectCardProps {
  project: Project;
  onClick: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const pendingDocuments = project.documents.filter(doc => doc.status === 'pending').length;
  const totalDocuments = project.documents.length;
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(project.status)}`}>
            {project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="mt-4 flex">
          <div className="bg-gray-50 px-3 py-2 rounded-md">
            <p className="text-xs text-gray-500">Documents</p>
            <p className="text-lg font-semibold">{totalDocuments}</p>
          </div>
          <div className="bg-yellow-50 px-3 py-2 rounded-md ml-2">
            <p className="text-xs text-yellow-700">Pending</p>
            <p className="text-lg font-semibold text-yellow-700">{pendingDocuments}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 border-t">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onClick(project.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
