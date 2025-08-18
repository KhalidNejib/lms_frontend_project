import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Spin,
  Button,
  Tag,
  message,
  Space,
  Badge,
  Select,
  Modal,
  Form,
  Input,
  Progress,
  Table,
  Typography,
  Row,
  Col,
  Statistic,
  Avatar,
  Descriptions,
  Timeline,
  Tooltip,
  Alert,
  Skeleton,
  Empty,
  Tabs,
  Popconfirm,
} from 'antd';
import {
  CrownOutlined,
  LockOutlined,
  UnlockOutlined,
  ProfileOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  BookOutlined,
  HistoryOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import { userService } from '../../services/user.service';

const { Option } = Select;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

interface CourseProgress {
  courseId: string;
  title: string;
  progress: number;
  enrolledAt?: string;
  lastAccessed?: string;
}

interface ActivityLog {
  date: string;
  action: string;
  details?: string;
}

interface AuditRecord {
  date: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'content-manager';
  isActive: boolean;
  avatarUrl?: string;
  createdAt?: string;
  lastLogin?: string;

  coursesProgress?: CourseProgress[];
  activityLogs?: ActivityLog[];
  auditTrail?: AuditRecord[];
}

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isPromoteModalVisible, setPromoteModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<User['role'] | null>(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const formatRole = (role?: string) => {
    if (!role) return 'No Role';
    return role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'instructor':
        return 'blue';
      case 'content-manager':
        return 'purple';
      case 'student':
        return 'green';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Fix here: unwrap user from response.data.user
  const { data, isLoading, error, refetch } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await userService.getUserById(id!);
      if (response.success && response.data && response.data.user) {
        return response.data.user;
      }
      throw new Error(response.message || 'Failed to fetch user data');
    },
    enabled: !!id,
    onSuccess: (userData) => {
      setSelectedRole(userData.role);
      console.log('Fetched user:', userData);
    },
    onError: (err) => {
      console.error('Error fetching user:', err);
    },
  });

  

  // Promote Role Mutation
  const promoteUserMutation = useMutation<
    any,
    Error,
    { userId: string; newRole: User['role'] }
  >({
    mutationFn: ({ userId, newRole }) => userService.promoteUser(userId, newRole),
    onSuccess: () => {
      message.success('User role updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setPromoteModalVisible(false);
    },
    onError: (err) => {
      message.error(err.message || 'Failed to update role');
    },
  });

  // Update Status Mutation
  const updateStatusMutation = useMutation<
    any,
    Error,
    boolean
  >({
    mutationFn: (newStatus) =>
      userService.updateUserStatus(id!, newStatus ? 'active' : 'blocked'),
    onSuccess: () => {
      message.success('User status updated!');
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      message.error(err.message || 'Failed to update status');
    },
  });

  // Update User Info Mutation
  const updateUserInfoMutation = useMutation<
    any,
    Error,
    Partial<User>
  >({
    mutationFn: (updatedData) => userService.updateUser(id!, updatedData),
    onSuccess: () => {
      message.success('User info updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditModalVisible(false);
    },
    onError: (err) => {
      message.error(err.message || 'Failed to update user info');
    },
  });

  if (isLoading) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Skeleton active avatar paragraph={{ rows: 8 }} />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert
          message="Error Loading User Details"
          description="There was an error loading the user details. Please try again."
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '24px' }}>
        <Empty description="User not found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  const courseProgressColumns = [
    {
      title: 'Course',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" status={progress === 100 ? 'success' : 'active'} />
      ),
    },
    {
      title: 'Enrolled',
      dataIndex: 'enrolledAt',
      key: 'enrolledAt',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Last Accessed',
      dataIndex: 'lastAccessed',
      key: 'lastAccessed',
      render: (date: string) => formatDate(date),
    },
  ];

  const activityColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => <Text>{action}</Text>,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (details: string) => details || '-',
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header with Back Button */}
      <div style={{ marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
          Back to Dashboard
        </Button>
      </div>

      {/* User Profile Header */}
      <Card style={{ marginBottom: '24px' }} bodyStyle={{ padding: '32px' }}>
        <Row gutter={24} align="middle">
          <Col>
            <Avatar size={80} src={data.avatarUrl} icon={<UserOutlined />} style={{ border: '4px solid #f0f0f0' }} />
          </Col>
          <Col flex="1">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>
                  {data.firstName} {data.lastName}
                </Title>
                <Space size="large">
                  <Text type="secondary">
                    <MailOutlined style={{ marginRight: '8px' }} />
                    {data.email}
                  </Text>
                  <Tag color={getRoleColor(data.role)} size="large">
                    <CrownOutlined style={{ marginRight: '4px' }} />
                    {formatRole(data.role)}
                  </Tag>
                  <Badge status={data.isActive ? 'success' : 'error'} text={data.isActive ? 'Active' : 'Blocked'} />
                </Space>
              </div>
              <Space>
                <Tooltip title="Promote Role">
                  <Button icon={<CrownOutlined />} onClick={() => setPromoteModalVisible(true)} type="primary">
                    Promote Role
                  </Button>
                </Tooltip>
                <Tooltip title={data.isActive ? 'Block User' : 'Activate User'}>
                  <Popconfirm
                    title={`Are you sure you want to ${data.isActive ? 'block' : 'activate'} this user?`}
                    onConfirm={() => updateStatusMutation.mutate(!data.isActive)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      danger={data.isActive}
                      icon={data.isActive ? <LockOutlined /> : <UnlockOutlined />}
                      loading={updateStatusMutation.isLoading}
                    >
                      {data.isActive ? 'Block User' : 'Activate User'}
                    </Button>
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="Edit User Info">
                  <Button icon={<EditOutlined />} onClick={() => setEditModalVisible(true)}>
                    Edit Info
                  </Button>
                </Tooltip>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>

      {/* User Statistics */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Courses" value={data.coursesProgress?.length || 0} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Status"
              value={data.isActive ? 'Active' : 'Blocked'}
              valueStyle={{ color: data.isActive ? '#52c41a' : '#ff4d4f' }}
              prefix={data.isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Role Level" value={formatRole(data.role)} prefix={<CrownOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Last Activity"
              value={data.lastLogin ? formatDate(data.lastLogin) : 'N/A'}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ fontSize: '14px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Tabs */}
      <Card>
        <Tabs defaultActiveKey="overview" size="large">
          <TabPane tab={<span><ProfileOutlined />Overview</span>} key="overview">
            <Descriptions title="User Information" bordered column={2}>
              <Descriptions.Item label="Full Name">
                {data.firstName} {data.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
              <Descriptions.Item label="Role">
                <Tag color={getRoleColor(data.role)} size="large">
                  {formatRole(data.role)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge status={data.isActive ? 'success' : 'error'} text={data.isActive ? 'Active' : 'Blocked'} />
              </Descriptions.Item>
              <Descriptions.Item label="Created">{formatDate(data.createdAt)}</Descriptions.Item>
              <Descriptions.Item label="Last Login">{formatDate(data.lastLogin)}</Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab={<span><BookOutlined />Course Progress</span>} key="courses">
            {data.coursesProgress && data.coursesProgress.length > 0 ? (
              <Table
                dataSource={data.coursesProgress}
                columns={courseProgressColumns}
                pagination={false}
                rowKey="courseId"
              />
            ) : (
              <Empty description="No courses enrolled" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </TabPane>

          <TabPane tab={<span><HistoryOutlined />Recent Activity</span>} key="activity">
            {data.activityLogs && data.activityLogs.length > 0 ? (
              <Table
                dataSource={data.activityLogs}
                columns={activityColumns}
                pagination={false}
                rowKey={(record, index) => index?.toString() || '0'}
              />
            ) : (
              <Empty description="No recent activity" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </TabPane>

          <TabPane tab={<span><HistoryOutlined />Audit Trail</span>} key="audit">
            {data.auditTrail && data.auditTrail.length > 0 ? (
              <Timeline>
                {data.auditTrail.map((record, index) => (
                  <Timeline.Item key={index} color="blue" dot={<HistoryOutlined />}>
                    <div>
                      <Text strong>{record.field.toUpperCase()}</Text> changed from{' '}
                      <Text delete>{record.oldValue}</Text> to <Text>{record.newValue}</Text>
                      <br />
                      <Text type="secondary">
                        Changed by {record.changedBy} on {formatDate(record.date)}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <Empty description="No audit records" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </TabPane>
        </Tabs>
      </Card>

      {/* Promote Role Modal */}
      <Modal
        title={`Promote User: ${data.firstName} ${data.lastName}`}
        open={isPromoteModalVisible}
        onCancel={() => setPromoteModalVisible(false)}
        footer={null}
        destroyOnClose
        width={500}
      >
        <Form
          layout="vertical"
          initialValues={{ newRole: selectedRole }}
          onFinish={(values: { newRole: User['role'] }) => {
            setSelectedRole(values.newRole);
            promoteUserMutation.mutate({ userId: data._id, newRole: values.newRole });
          }}
        >
          <Form.Item label="Current Role" name="currentRole">
            <Input value={formatRole(data.role)} disabled prefix={<CrownOutlined />} />
          </Form.Item>

          <Form.Item
            label="New Role"
            name="newRole"
            rules={[{ required: true, message: 'Please select a new role' }]}
          >
            <Select size="large">
              <Option value="student">Student</Option>
              <Option value="instructor">Instructor</Option>
              <Option value="content-manager">Content Manager</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setPromoteModalVisible(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={promoteUserMutation.isLoading}
                icon={<CrownOutlined />}
              >
                Promote User
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Info Modal */}
      <Modal
        title={`Edit User Info: ${data.firstName} ${data.lastName}`}
        open={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <Form
          layout="vertical"
          initialValues={{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          }}
          onFinish={(values) => updateUserInfoMutation.mutate(values)}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateUserInfoMutation.isLoading}
                icon={<EditOutlined />}
              >
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDetailPage;
