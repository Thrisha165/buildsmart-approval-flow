
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Check, FileType, X } from 'lucide-react';

const DocumentUpload: React.FC = () => {
  const [documentName, setDocumentName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (limit to 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File too large. Maximum size is 10MB.");
        return;
      }
      
      // Auto-fill document name from filename if empty
      if (!documentName) {
        // Remove extension from filename
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
        setDocumentName(fileName);
      }
      
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check file size
      if (droppedFile.size > 10 * 1024 * 1024) {
        setError("File too large. Maximum size is 10MB.");
        return;
      }
      
      if (!documentName) {
        const fileName = droppedFile.name.replace(/\.[^/.]+$/, "");
        setDocumentName(fileName);
      }
      
      setFile(droppedFile);
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
    setError(null);
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
    setError(null);
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="rounded-lg border bg-card/80 backdrop-blur-sm p-6 glass-panel">
      <h2 className="text-xl font-semibold mb-4 neon-text text-neon-blue">Submit New Document</h2>
      
      {isComplete ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-success/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-border ring-success">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h3 className="font-medium text-xl">Document Submitted!</h3>
          <p className="text-muted-foreground mb-6 text-lg">Your document has been submitted for approval.</p>
          <Button onClick={resetForm} className="px-6 py-2 text-lg">Submit Another Document</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="documentName" className="text-base font-medium">Document Name</label>
            <Input 
              id="documentName" 
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              disabled={uploading}
              placeholder="e.g. Structural Drawings - Phase 1"
              className="text-lg py-6"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-base font-medium">Description</label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={uploading}
              placeholder="Briefly describe this document"
              rows={3}
              className="text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-base font-medium">Document File</label>
            <div 
              className={`border border-dashed rounded-lg p-6 text-center ${
                error ? 'border-destructive' : 'hover:border-primary'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={openFileSelector}
            >
              {file ? (
                <div className="py-4">
                  <div className="flex items-center justify-center mb-3">
                    <FileType className="h-12 w-12 text-primary" />
                  </div>
                  <p className="font-medium text-lg">{file.name}</p>
                  <p className="text-base text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm" 
                    className="mt-4" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4 mr-2" /> Change File
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-neon-blue mb-3" />
                  <p className="text-lg text-muted-foreground mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-muted-foreground">Supported files: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                </>
              )}
              <Input 
                ref={fileInputRef}
                id="file" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                disabled={uploading}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
            {error && (
              <p className="text-destructive text-sm mt-1">{error}</p>
            )}
          </div>
          
          {uploading && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base">Uploading...</span>
                <span className="text-base font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full text-lg py-6" 
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
