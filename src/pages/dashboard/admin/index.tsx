import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Table,
  Button,
  Input,
  Tag,
  Avatar,
  Space,
  Typography,
  Modal,
  Form,
  message,
  Spin,
  Select,
  Tooltip,
  Popconfirm,
  Badge,
} from 'antd';
import {
  UserOutlined,
  BookOutlined,
  DollarOutlined,
  SettingOutlined,
  EyeOutlined,
  CrownOutlined,
  TeamOutlined,
  UserAddOutlined,
  LockOutlined,
  UnlockOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import Breadcrumbs from '../../../components/DashboardUi/Breadcrumbs';
import userService from '../../../services/user.service';
import type { User } from '../../../types/user';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const AdminDashboard: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isCreateUserModalVisible, setIsCreateUserModalVisible] = useState(false);
  const [isPromoteUserModalVisible, setIsPromoteUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [createUserForm] = Form.useForm();
  const [promoteUserForm] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch data
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: userService.getDashboardStats,
  });

  const { data: systemHealth, isLoading: healthLoading } = useQuery({
    queryKey: ['systemHealth'],
    queryFn: userService.getSystemHealth,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
  });

  const { data: courseApprovals, isLoading: approvalsLoading } = useQuery({
    queryKey: ['courseApprovals'],
    queryFn: userService.getCourseApprovals,
  });

  // Mutations
  const createUserMutation = useMutation({
    mutationFn: (userData: { email: string; password: string; firstName: string; lastName: string; role: string }) =>
      userService.createUserWithRole(userData),
    onSuccess: () => {
      message.success('User created successfully!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setTimeout(() => {
        setIsCreateUserModalVisible(false);
        createUserForm.resetFields();
      }, 300);
    },
    onError: (error: Error) => message.error(error.message || 'Failed to create user'),
  });

  const updateUserStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'blocked' }) =>
      userService.updateUserStatus(userId, status),
    onSuccess: () => {
      message.success('User status updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => message.error(error.message || 'Failed to update user status'),
  });

  const promoteUserMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      const response = await userService.promoteUser(userId, newRole);
      return response;
    },
    onSuccess: (response) => {
      const updatedUser = response.data;
      queryClient.setQueryData(['users'], (oldData: any) => {
        if (!oldData?.data?.users) return oldData;
        const newUsers = oldData.data.users.map((user: any) => (user._id === updatedUser._id ? updatedUser : user));
        return { ...oldData, data: { ...oldData.data, users: newUsers } };
      });
      message.success('User role updated successfully!');
      setIsPromoteUserModalVisible(false);
      setSelectedUser(null);
    },
    onError: (error: Error) => message.error(error.message || 'Failed to update user role'),
  });

  const approveCourseMutation = useMutation({
    mutationFn: (courseId: string) => userService.approveCourse(courseId),
    onSuccess: () => {
      message.success('Course approved successfully!');
      queryClient.invalidateQueries({ queryKey: ['courseApprovals'] });
    },
    onError: (error: Error) => message.error(error.message || 'Failed to approve course'),
  });

  const rejectCourseMutation = useMutation({
    mutationFn: (courseId: string) => userService.rejectCourse(courseId),
    onSuccess: () => {
      message.success('Course rejected successfully!');
      queryClient.invalidateQueries({ queryKey: ['courseApprovals'] });
    },
    onError: (error: Error) => message.error(error.message || 'Failed to reject course'),
  });

  // Users array & filtered
  const usersArray = Array.isArray(users?.data?.users) ? users.data.users : [];
  const filteredUsers = usersArray.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase()) || user.role.toLowerCase().includes(searchText.toLowerCase());
  });

  // User table columns
  const userColumns = [
    {
      title: 'User',
      key: 'name',
      render: (_: any, record: User) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.firstName} {record.lastName}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const roleConfig = {
          admin: { color: 'red', icon: <CrownOutlined /> },
          instructor: { color: 'blue', icon: <BookOutlined /> },
          'content-manager': { color: 'purple', icon: <SettingOutlined /> },
          student: { color: 'green', icon: <UserOutlined /> },
        };
        const config = roleConfig[role as keyof typeof roleConfig] || { color: 'default', icon: <UserOutlined /> };
        return <Tag color={config.color} icon={config.icon}>{role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => <Badge status={isActive ? 'success' : 'error'} text={isActive ? 'Active' : 'Blocked'} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => navigate(`/dashboard/admin/users/${record._id}`)} />
          </Tooltip>
          <Tooltip title="Promote User">
            <Button type="text" size="small" icon={<CrownOutlined />} onClick={() => { setSelectedUser(record); promoteUserForm.setFieldsValue({ newRole: record.role }); setIsPromoteUserModalVisible(true); }} />
          </Tooltip>
          <Popconfirm title={`${record.isActive ? 'Block' : 'Activate'} this user?`} onConfirm={() => updateUserStatusMutation.mutate({ userId: record._id, status: record.isActive ? 'blocked' : 'active' })} okText="Yes" cancelText="No">
            <Tooltip title={record.isActive ? 'Block User' : 'Activate User'}>
              <Button type="text" size="small" icon={record.isActive ? <LockOutlined /> : <UnlockOutlined />} danger={record.isActive} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (statsLoading || healthLoading || usersLoading || approvalsLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs />

      {/* Dashboard Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}><Card><Statistic title="Total Users" value={stats?.totalUsers ?? 0} prefix={<UserOutlined />} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Students" value={stats?.students ?? 0} prefix={<UserOutlined />} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Instructors" value={stats?.instructors ?? 0} prefix={<BookOutlined />} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Content Managers" value={stats?.contentManagers ?? 0} prefix={<SettingOutlined />} valueStyle={{ color: '#722ed1' }} /></Card></Col>
      </Row>

      {/* System Health */}
      <Card title="System Health Monitoring" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col span={6}><Card size="small"><Statistic title="Server Status" value={systemHealth?.serverStatus || 0} suffix="%" valueStyle={{ color: (systemHealth?.serverStatus || 0) === 100 ? '#3f8600' : '#cf1322' }} /><Progress percent={systemHealth?.serverStatus || 0} strokeColor={(systemHealth?.serverStatus || 0) === 100 ? '#3f8600' : '#cf1322'} showInfo={false} size="small" /></Card></Col>
          <Col span={6}><Card size="small"><Statistic title="API Response Time" value={systemHealth?.apiResponseTime || 0} suffix="ms" valueStyle={{ color: (systemHealth?.apiResponseTime || 0) < 500 ? '#3f8600' : '#faad14' }} /><Progress percent={Math.min(((systemHealth?.apiResponseTime || 0)/1000)*100,100)} strokeColor={(systemHealth?.apiResponseTime || 0) < 500 ? '#3f8600' : '#faad14'} showInfo={false} size="small" /></Card></Col>
          <Col span={6}><Card size="small"><Statistic title="Database Status" value={systemHealth?.databaseStatus || 0} suffix="ms" valueStyle={{ color: (systemHealth?.databaseStatus || 0) < 100 ? '#3f8600' : '#faad14' }} /><Progress percent={Math.min(((systemHealth?.databaseStatus || 0)/200)*100,100)} strokeColor={(systemHealth?.databaseStatus || 0) < 100 ? '#3f8600' : '#faad14'} showInfo={false} size="small" /></Card></Col>
          <Col span={6}><Card size="small"><Statistic title="Error Rate" value={systemHealth?.errorRate || 0} suffix="%" valueStyle={{ color: (systemHealth?.errorRate || 0) < 5 ? '#3f8600' : '#cf1322' }} /><Progress percent={systemHealth?.errorRate || 0} strokeColor={(systemHealth?.errorRate || 0) < 5 ? '#3f8600' : '#cf1322'} showInfo={false} size="small" /></Card></Col>
        </Row>
      </Card>

      {/* User Management */}
      <Card title={<Space><TeamOutlined /> User Management</Space>} extra={<Space><Search placeholder="Search users..." allowClear style={{ width: 300 }} onChange={e => setSearchText(e.target.value)} /><Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsCreateUserModalVisible(true)}>Create User</Button></Space>} style={{ marginBottom: 24 }}>
        <Table columns={userColumns} dataSource={filteredUsers} rowKey="_id" rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }} pagination={{ pageSize: 10, showSizeChanger: true }} />
      </Card>

      {/* Course Approvals */}
<Card title={<Space><BookOutlined /> Course Approvals</Space>} style={{ marginBottom: 24 }}>
  {courseApprovals && courseApprovals.length > 0 ? (
    <Table
      columns={[
        {
          title: 'Course',
          key: 'course',
          render: (_, record) => (
            <Space>
              <Avatar src={record.imageUrl} icon={<BookOutlined />} />
              <div>
                <div style={{ fontWeight: 'bold' }}>{record.title}</div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  by {record.instructor?.firstName} {record.instructor?.lastName}
                </div>
              </div>
            </Space>
          ),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render: (description: string) => (
            <Text ellipsis={{ tooltip: description }} style={{ maxWidth: 300 }}>
              {description}
            </Text>
          ),
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (_, record) => (
            <Space>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => approveCourseMutation.mutate(record._id)}
                loading={approveCourseMutation.isLoading}
              >
                Approve
              </Button>
              <Button
                danger
                size="small"
                icon={<CloseOutlined />}
                onClick={() => rejectCourseMutation.mutate(record._id)}
                loading={rejectCourseMutation.isLoading}
              >
                Reject
              </Button>
            </Space>
          ),
        },
      ]}
      dataSource={courseApprovals}
      rowKey="_id"
      pagination={false}
    />
  ) : (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
      <Text type="secondary">No pending course approvals</Text>
    </div>
  )}
</Card>

      {/* Create User Modal */}
      <Modal title="Create New User" open={isCreateUserModalVisible} onCancel={() => { setIsCreateUserModalVisible(false); createUserForm.resetFields(); }} footer={null} width={600}>
        <Form form={createUserForm} layout="vertical" onFinish={values => createUserMutation.mutate(values)}>
          <Row gutter={16}>
            <Col span={12}><Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}><Input placeholder="Enter first name" /></Form.Item></Col>
            <Col span={12}><Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}><Input placeholder="Enter last name" /></Form.Item></Col>
          </Row>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}><Input placeholder="Enter email address" /></Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }, { min: 8, message: 'Password must be at least 8 characters' }]}><Input.Password placeholder="Enter password" /></Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select a role' }]}><Select placeholder="Select role"><Option value="student">Student</Option><Option value="instructor">Instructor</Option><Option value="content-manager">Content Manager</Option><Option value="admin">Admin</Option></Select></Form.Item>
          <Form.Item style={{ textAlign: 'right' }}><Space><Button onClick={() => { setIsCreateUserModalVisible(false); createUserForm.resetFields(); }}>Cancel</Button><Button type="primary" htmlType="submit" loading={createUserMutation.isLoading}>Create User</Button></Space></Form.Item>
        </Form>
      </Modal>

      {/* Promote User Modal */}
      <Modal title={`Promote User: ${selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''}`} open={isPromoteUserModalVisible} onCancel={() => { setIsPromoteUserModalVisible(false); setSelectedUser(null); promoteUserForm.resetFields(); }} footer={null} width={500}>
        <Form form={promoteUserForm} layout="vertical" onFinish={values => { if (selectedUser) promoteUserMutation.mutate({ userId: selectedUser._id, newRole: values.newRole }); }}>
          <Form.Item label="New Role" name="newRole" rules={[{ required: true, message: 'Please select a role' }]}><Select placeholder="Select new role"><Option value="student">Student</Option><Option value="instructor">Instructor</Option><Option value="content-manager">Content Manager</Option><Option value="admin">Admin</Option></Select></Form.Item>
          <Form.Item style={{ textAlign: 'right' }}><Space><Button onClick={() => { setIsPromoteUserModalVisible(false); setSelectedUser(null); promoteUserForm.resetFields(); }}>Cancel</Button><Button type="primary" htmlType="submit" loading={promoteUserMutation.isLoading}>Promote</Button></Space></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;



