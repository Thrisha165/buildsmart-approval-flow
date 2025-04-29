
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';
import DocumentUpload from '@/components/DocumentUpload';
import MobileNavigation from '@/components/MobileNavigation';
import Logo from '@/components/Logo';
import { Project } from '@/types';
import { getMockProjects } from '@/services/mockData';
import { Bell } from 'lucide-react';
import DocumentDetailModal from '@/components/DocumentDetailModal';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await getMockProjects();
      setProjects(data);
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container flex justify-between items-center h-16 px-4">
          <Logo />
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={() => setShowUpload(!showUpload)}>
            {showUpload ? 'View Projects' : 'Upload Document'}
          </Button>
        </div>
        
        {showUpload ? (
          <DocumentUpload />
        ) : (
          <>
            <h2 className="text-lg font-medium mb-4">Active Projects</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-56 bg-gray-100 rounded-lg animate-pulse"></div>
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

            <h2 className="text-lg font-medium mt-8 mb-4">Recent Documents</h2>
            <div className="grid grid-cols-1 gap-3">
              {isLoading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
                ))
              ) : (
                projects.flatMap(project => 
                  project.documents
                    .slice(0, 1)
                    .map(doc => (
                      <div 
                        key={doc.id} 
                        className="bg-white p-3 rounded-lg border flex justify-between items-center cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDocumentClick(project.id, doc.id)}
                      >
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">{project.name}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
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
