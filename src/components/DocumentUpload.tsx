
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Check } from 'lucide-react';

const DocumentUpload: React.FC = () => {
  const [documentName, setDocumentName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentName || !file) {
      toast({
        title: "Missing information",
        description: "Please provide a document name and select a file",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload process
    setUploading(true);
    let progressValue = 0;
    
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);
      
      if (progressValue >= 100) {
        clearInterval(interval);
        setUploading(false);
        setIsComplete(true);
        toast({
          title: "Upload complete",
          description: "Your document has been submitted for approval",
        });
      }
    }, 300);
  };

  const resetForm = () => {
    setDocumentName('');
    setDescription('');
    setFile(null);
    setProgress(0);
    setIsComplete(false);
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">Submit New Document</h2>
      
      {isComplete ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-success/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h3 className="font-medium text-lg">Document Submitted!</h3>
          <p className="text-muted-foreground mb-4">Your document has been submitted for approval.</p>
          <Button onClick={resetForm}>Submit Another Document</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="documentName" className="text-sm font-medium">Document Name</label>
            <Input 
              id="documentName" 
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              disabled={uploading}
              placeholder="e.g. Structural Drawings - Phase 1"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={uploading}
              placeholder="Briefly describe this document"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">Document File</label>
            <div className="border border-dashed rounded-lg p-6 text-center">
              {file ? (
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={() => setFile(null)}
                    disabled={uploading}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-1">Drag and drop your file here, or</p>
                  <Input 
                    id="file" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <label htmlFor="file">
                    <Button type="button" variant="outline" disabled={uploading}>
                      Browse Files
                    </Button>
                  </label>
                </>
              )}
            </div>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Uploading...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={uploading || !documentName || !file}
          >
            {uploading ? "Uploading..." : "Submit Document"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default DocumentUpload;
