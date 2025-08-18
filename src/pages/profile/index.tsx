import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  Tabs,
  Form as AntForm,
  Input,
  Button,
  Upload,
  Avatar,
  message,
  Spin,
  Modal,
  Space,
  Typography,
  Divider,
} from 'antd';
import type { TabsProps } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  UploadOutlined,
  SaveOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import userService, { type ProfileUpdateData, type PasswordUpdateData } from '../../services/user.service';

const { Title, Text } = Typography;

// Validation schemas
const profileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ProfilePage: React.FC = () => {
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  // Fetch current user data
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: userService.getCurrentUser,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileUpdateData) => userService.updateProfile(data),
    onSuccess: () => {
      message.success('Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      message.error(error.message || 'Failed to update profile');
    },
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: (data: PasswordUpdateData) => userService.updatePassword(data),
    onSuccess: () => {
      message.success('Password updated successfully!');
      setIsPasswordModalVisible(false);
    },
    onError: (error: Error) => {
      message.error(error.message || 'Failed to update password');
    },
  });

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: (formData: FormData) => userService.uploadAvatar(formData),
    onSuccess: () => {
      message.success('Avatar uploaded successfully!');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: Error) => {
      message.error(error.message || 'Failed to upload avatar');
    },
  });

  const handleAvatarUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
      await uploadAvatarMutation.mutateAsync(formData);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileSubmit = (values: ProfileUpdateData) => {
    updateProfileMutation.mutate(values);
  };

  const handlePasswordSubmit = (values: PasswordUpdateData) => {
    updatePasswordMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Text type="danger">Error loading profile: {error.message}</Text>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Text type="danger">No user data found</Text>
      </div>
    );
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined />
          Profile Information
        </span>
      ),
      children: (
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Avatar Section */}
            <div style={{ textAlign: 'center' }}>
              <Avatar
                size={120}
                src={user.avatarUrl}
                icon={<UserOutlined />}
                style={{ marginBottom: '16px' }}
              />
              <div>
                <Upload
                  beforeUpload={(file) => {
                    handleAvatarUpload(file);
                    return false; // Prevent default upload
                  }}
                  showUploadList={false}
                  accept="image/*"
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploading}
                    disabled={uploading}
                  >
                    Upload Avatar
                  </Button>
                </Upload>
              </div>
            </div>

            <Divider />

            {/* Profile Form */}
            <Formik
              initialValues={{
                name: user.name,
                email: user.email,
              }}
              validationSchema={profileSchema}
              onSubmit={handleProfileSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <AntForm.Item
                    label="Full Name"
                    validateStatus={errors.name && touched.name ? 'error' : ''}
                    help={errors.name && touched.name ? errors.name : ''}
                  >
                    <Field
                      as={Input}
                      name="name"
                      placeholder="Enter your full name"
                      size="large"
                    />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Email Address"
                    validateStatus={errors.email && touched.email ? 'error' : ''}
                    help={errors.email && touched.email ? errors.email : ''}
                  >
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      size="large"
                    />
                  </AntForm.Item>

                  <AntForm.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={isSubmitting}
                      size="large"
                      block
                    >
                      Update Profile
                    </Button>
                  </AntForm.Item>
                </Form>
              )}
            </Formik>
          </Space>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <LockOutlined />
          Change Password
        </span>
      ),
      children: (
        <Card>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <KeyOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>Change Your Password</Title>
            <Text type="secondary">
              Click the button below to change your password securely.
            </Text>
            <div style={{ marginTop: '24px' }}>
              <Button
                type="primary"
                size="large"
                icon={<LockOutlined />}
                onClick={() => setIsPasswordModalVisible(true)}
              >
                Change Password
              </Button>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <Title level={2}>My Profile</Title>
      <Text type="secondary">Manage your account settings and profile information</Text>
      
      <div style={{ marginTop: '24px' }}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          size="large"
          tabPosition="top"
          style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px' }}
        />
      </div>

      {/* Password Change Modal */}
      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        footer={null}
        width={500}
      >
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={passwordSchema}
          onSubmit={handlePasswordSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <AntForm.Item
                label="Current Password"
                validateStatus={errors.currentPassword && touched.currentPassword ? 'error' : ''}
                help={errors.currentPassword && touched.currentPassword ? errors.currentPassword : ''}
              >
                <Field
                  as={Input.Password}
                  name="currentPassword"
                  placeholder="Enter your current password"
                  size="large"
                />
              </AntForm.Item>

              <AntForm.Item
                label="New Password"
                validateStatus={errors.newPassword && touched.newPassword ? 'error' : ''}
                help={errors.newPassword && touched.newPassword ? errors.newPassword : ''}
              >
                <Field
                  as={Input.Password}
                  name="newPassword"
                  placeholder="Enter your new password"
                  size="large"
                />
              </AntForm.Item>

              <AntForm.Item
                label="Confirm New Password"
                validateStatus={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                help={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
              >
                <Field
                  as={Input.Password}
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  size="large"
                />
              </AntForm.Item>

              <AntForm.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                <Space>
                  <Button onClick={() => setIsPasswordModalVisible(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Update Password
                  </Button>
                </Space>
              </AntForm.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ProfilePage;