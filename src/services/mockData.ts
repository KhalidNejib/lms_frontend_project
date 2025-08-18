import type { User } from '../types/user';
import type { UserStats, SystemHealth, CourseApproval } from './user.service';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    avatarUrl: undefined,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    role: 'student',
    status: 'active',
    avatarUrl: undefined,
  },
  {
    id: '3',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'instructor',
    status: 'active',
    avatarUrl: undefined,
  },
  {
    id: '4',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'instructor',
    status: 'blocked',
    avatarUrl: undefined,
  },
  {
    id: '5',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    role: 'student',
    status: 'blocked',
    avatarUrl: undefined,
  },
];

// Mock Stats
export const mockStats: UserStats = {
  totalUsers: 3568,
  totalEnrollments: 1235,
  monthlyRevenue: 28340,
};

// Mock System Health
export const mockSystemHealth: SystemHealth = {
  serverStatus: 100,
  apiResponseTime: 320,
  databaseStatus: 24,
  errorRate: 15,
};

// Mock Course Approvals
export const mockCourseApprovals: CourseApproval[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    instructor: 'James Wilson',
    description: 'Teaches advanced state management techniques and performance optimization strategies for React applications.',
    imageUrl: '',
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    instructor: 'Alex Johnson',
    description: 'Introduction to machine learning algorithms and their practical applications in real-world scenarios.',
    imageUrl: '',
  },
];

// Mock current user for profile
export const mockCurrentUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  status: 'active',
  avatarUrl: undefined,
}; 