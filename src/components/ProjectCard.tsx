
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
      case 'active': return 'bg-neon-blue/20 text-neon-blue';
      case 'on_hold': return 'bg-warning/20 text-warning';
      case 'completed': return 'bg-success/20 text-success';
      default: return 'bg-muted/30 text-muted-foreground';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in glass-panel border border-white/10">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl">{project.name}</h3>
            <p className="text-base text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
          </div>
          <span className={`px-2 py-1 text-sm font-medium rounded-full neon-text ${getStatusBadgeClass(project.status)}`}>
            {project.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-medium">Progress</span>
            <span className="text-base font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-3" />
        </div>
        
        <div className="mt-6 flex">
          <div className="bg-secondary/30 px-4 py-3 rounded-md">
            <p className="text-sm text-muted-foreground">Documents</p>
            <p className="text-xl font-semibold">{totalDocuments}</p>
          </div>
          <div className="bg-warning/20 px-4 py-3 rounded-md ml-3">
            <p className="text-sm text-warning">Pending</p>
            <p className="text-xl font-semibold text-warning">{pendingDocuments}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-secondary/20 border-t">
        <Button 
          variant="outline" 
          className="w-full text-base" 
          onClick={() => onClick(project.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
