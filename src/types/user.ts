export type UserRole = 'student' | 'instructor' | 'admin' | 'content-manager';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'blocked';
  avatarUrl?: string;
} 