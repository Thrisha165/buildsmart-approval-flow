
import { Project, Document, ApprovalStep, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@buildsmart.com',
    role: 'project_manager',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily@buildsmart.com',
    role: 'engineer',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    name: 'Michael Wilson',
    email: 'michael@buildsmart.com',
    role: 'contractor',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '4',
    name: 'Sarah Davis',
    email: 'sarah@buildsmart.com',
    role: 'regulatory',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const createApprovalSteps = (documentId: string, status: 'approved' | 'pending' | 'rejected'): ApprovalStep[] => {
  const steps: ApprovalStep[] = [
    {
      id: `${documentId}-step1`,
      name: 'Initial Review',
      status: 'approved',
      approver: mockUsers[0],
      date: '2023-04-15',
      comments: 'Looks good, proceeding to engineering review',
    },
    {
      id: `${documentId}-step2`,
      name: 'Engineering Review',
      status: status === 'rejected' ? 'rejected' : 'approved',
      approver: mockUsers[1],
      date: '2023-04-18',
      comments: status === 'rejected' ? 'Structural calculations need revision' : 'Engineering aspects meet requirements',
    },
    {
      id: `${documentId}-step3`,
      name: 'Regulatory Approval',
      status: status === 'approved' ? 'approved' : 'pending',
      approver: status === 'approved' ? mockUsers[3] : undefined,
      date: status === 'approved' ? '2023-04-25' : undefined,
      comments: status === 'approved' ? 'All regulatory requirements satisfied' : undefined,
    },
  ];
  
  return steps;
};

const createDocuments = (projectId: string): Document[] => [
  {
    id: `${projectId}-doc1`,
    name: 'Foundation Plans',
    projectId,
    status: 'approved',
    uploadedBy: mockUsers[0].id,
    uploadDate: '2023-04-10',
    type: 'blueprint',
    approvalSteps: createApprovalSteps(`${projectId}-doc1`, 'approved'),
  },
  {
    id: `${projectId}-doc2`,
    name: 'Electrical Schematics',
    projectId,
    status: 'pending',
    uploadedBy: mockUsers[2].id,
    uploadDate: '2023-04-12',
    type: 'schematic',
    approvalSteps: createApprovalSteps(`${projectId}-doc2`, 'pending'),
  },
  {
    id: `${projectId}-doc3`,
    name: 'Plumbing Layout',
    projectId,
    status: 'rejected',
    uploadedBy: mockUsers[2].id,
    uploadDate: '2023-04-14',
    type: 'layout',
    approvalSteps: createApprovalSteps(`${projectId}-doc3`, 'rejected'),
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Riverside Office Complex',
    description: 'A modern office complex with 12 stories and underground parking',
    status: 'active',
    progress: 45,
    documents: createDocuments('1'),
  },
  {
    id: '2',
    name: 'Highland Residential Towers',
    description: 'Two residential towers with shared amenities',
    status: 'active',
    progress: 30,
    documents: createDocuments('2'),
  },
  {
    id: '3',
    name: 'Greenfield Shopping Center',
    description: 'A mixed-use shopping center with restaurants and entertainment',
    status: 'on_hold',
    progress: 15,
    documents: createDocuments('3'),
  },
  {
    id: '4',
    name: 'Harbor Bridge Renovation',
    description: 'Structural renovation and expansion of the harbor bridge',
    status: 'active',
    progress: 60,
    documents: createDocuments('4'),
  },
];

export const getMockProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 800);
  });
};

export const getMockProject = (id: string): Promise<Project | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === id);
      resolve(project);
    }, 500);
  });
};

export const getMockDocument = (projectId: string, documentId: string): Promise<Document | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === projectId);
      const document = project?.documents.find(d => d.id === documentId);
      resolve(document);
    }, 500);
  });
};
