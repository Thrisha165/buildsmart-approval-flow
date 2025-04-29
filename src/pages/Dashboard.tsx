
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';
import DocumentUpload from '@/components/DocumentUpload';
import MobileNavigation from '@/components/MobileNavigation';
import Logo from '@/components/Logo';
import { Project } from '@/types';
import { getMockProjects } from '@/services/mockData';
import { Bell, X } from 'lucide-react';
import DocumentDetailModal from '@/components/DocumentDetailModal';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; text: string; date: string }[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getMockProjects();
      setProjects(data);
      setIsLoading(false);
      
      // Generate mock notifications based on pending documents
      const mockNotifications = data.flatMap(project => 
        project.documents
          .filter(doc => doc.status === 'pending')
          .map(doc => ({
            id: doc.id,
            text: `Document "${doc.name}" is awaiting your approval.`,
            date: new Date().toISOString(),
            projectId: project.id
          }))
      );
      
      setNotifications(mockNotifications);
    };
    
    loadProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    // In a real app, this would navigate to a project detail page
    console.log(`View project: ${projectId}`);
  };

  const handleDocumentClick = (projectId: string, documentId: string) => {
    setSelectedProjectId(projectId);
    setSelectedDocId(documentId);
  };

  const getSelectedDocument = () => {
    if (!selectedProjectId || !selectedDocId) return null;
    const project = projects.find(p => p.id === selectedProjectId);
    return project?.documents.find(d => d.id === selectedDocId);
  };
  
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const handleNotificationClick = (notification: any) => {
    setSelectedProjectId(notification.projectId);
    setSelectedDocId(notification.id);
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-20">
        <div className="container flex justify-between items-center h-16 px-4">
          <Logo />
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-neon-orange rounded-full"></span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Notifications Panel */}
        {showNotifications && (
          <div className="absolute right-4 mt-2 w-80 bg-card rounded-md shadow-lg border z-30 overflow-hidden glass-panel">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-medium text-base">Notifications</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setShowNotifications(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className="p-3 border-b hover:bg-secondary/40 cursor-pointer flex justify-between"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="text-sm pr-2">{notification.text}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 ml-2 flex-shrink-0" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-2 border-t">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full text-sm"
                  onClick={() => {
                    setNotifications([]);
                    toast({
                      title: "All notifications cleared"
                    });
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold neon-text text-neon-blue">Dashboard</h1>
          <Button 
            onClick={() => setShowUpload(!showUpload)}
            className="text-base"
          >
            {showUpload ? 'View Projects' : 'Upload Document'}
          </Button>
        </div>
        
        {showUpload ? (
          <DocumentUpload />
        ) : (
          <>
            <h2 className="text-xl font-medium mb-4">Active Projects</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-56 bg-card/50 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => handleProjectClick(project.id)} 
                  />
                ))}
              </div>
            )}

            <h2 className="text-xl font-medium mt-8 mb-4">Recent Documents</h2>
            <div className="grid grid-cols-1 gap-3">
              {isLoading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-card/50 rounded-lg animate-pulse"></div>
                ))
              ) : (
                projects.flatMap(project => 
                  project.documents
                    .slice(0, 1)
                    .map(doc => (
                      <div 
                        key={doc.id} 
                        className="bg-card/80 backdrop-blur-sm p-3 rounded-lg border flex justify-between items-center cursor-pointer hover:bg-card"
                        onClick={() => handleDocumentClick(project.id, doc.id)}
                      >
                        <div>
                          <p className="font-medium text-base">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{project.name}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-sm font-medium neon-text ${
                          doc.status === 'approved' ? 'bg-success/20 text-success' : 
                          doc.status === 'pending' ? 'bg-warning/20 text-warning' : 
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </div>
                      </div>
                    ))
                )
              )}
            </div>
          </>
        )}
      </main>
      
      {/* Document Detail Modal */}
      {getSelectedDocument() && (
        <DocumentDetailModal 
          document={getSelectedDocument()!} 
          onClose={() => {
            setSelectedDocId(null);
            setSelectedProjectId(null);
          }}
        />
      )}

      {/* Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default Dashboard;
