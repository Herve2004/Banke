
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar: string;
  accountNumber: string;
  role: 'USER' | 'ADMIN';
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'DONATION' | 'TRANSFER';
  amount: number;
  recipientName: string;
  date: string;
  category: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface Notification {
  id: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'SECURITY';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isSystem?: boolean;
}

export interface Donation {
  id: string;
  donorId: string;
  recipientName: string;
  amount: number;
  message: string;
  timestamp: string;
}

export interface AIInsight {
  title: string;
  description: string;
  impactScore: number;
}
