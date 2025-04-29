
export type ApprovalStatus = 'approved' | 'pending' | 'rejected';

export const getStatusClass = (status: ApprovalStatus): string => {
  switch (status) {
    case 'approved':
      return 'status-approved';
    case 'pending':
      return 'status-pending';
    case 'rejected':
      return 'status-rejected';
    default:
      return 'status-pending';
  }
};

export const getStatusText = (status: ApprovalStatus): string => {
  switch (status) {
    case 'approved':
      return 'Approved';
    case 'pending':
      return 'Pending';
    case 'rejected':
      return 'Rejected';
    default:
      return 'Pending';
  }
};
