
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'project_manager' | 'contractor' | 'engineer' | 'architect' | 'regulatory';
  profileImage?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  progress: number;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  projectId: string;
  status: 'approved' | 'pending' | 'rejected';
  uploadedBy: string;
  uploadDate: string;
  type: string;
  approvalSteps: ApprovalStep[];
}

export interface ApprovalStep {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'rejected';
  approver?: User;
  date?: string;
  comments?: string;
}
