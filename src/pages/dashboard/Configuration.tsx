import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Switch, Select, InputNumber, message, Typography, Row, Col } from 'antd';
import { SettingOutlined, SecurityScanOutlined, BellOutlined, SaveOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

const { Title, Text } = Typography;

interface ConfigurationData {
  general: {
    siteName: string;
    contactEmail: string;
    siteDescription: string;
  };
  security: {
    sessionTimeout: number;
    passwordLength: number;
    twoFactor: boolean;
  };
  notifications: {
    emailNotif: boolean;
    pushNotif: boolean;
    courseUpdates: boolean;
  };
}

const ConfigurationPage: React.FC = () => {
  const [generalForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationForm] = Form.useForm();

  const updateConfigurationMutation = useMutation({
    mutationFn: (data: ConfigurationData) => {
      // This would be replaced with actual API call
      return Promise.resolve({ message: 'Configuration updated successfully' });
    },
    onSuccess: () => {
      message.success('Configuration updated successfully!');
    },
    onError: (error: Error) => {
      message.error(error.message || 'Failed to update configuration');
    },
  });

  const handleGeneralSubmit = (values: any) => {
    updateConfigurationMutation.mutate({
      general: values,
      security: securityForm.getFieldsValue(),
      notifications: notificationForm.getFieldsValue(),
    });
  };

  const handleSecuritySubmit = (values: any) => {
    updateConfigurationMutation.mutate({
      general: generalForm.getFieldsValue(),
      security: values,
      notifications: notificationForm.getFieldsValue(),
    });
  };

  const handleNotificationSubmit = (values: any) => {
    updateConfigurationMutation.mutate({
      general: generalForm.getFieldsValue(),
      security: securityForm.getFieldsValue(),
      notifications: values,
    });
  };

  const items = [
    {
      key: '1',
      label: (
        <span>
          <SettingOutlined />
          General Settings
        </span>
      ),
      children: (
        <Card>
          <Form form={generalForm} onFinish={handleGeneralSubmit} layout="vertical">
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Form.Item label="Site Name" name="siteName" rules={[{ required: true }]}>
                  <Input placeholder="Enter site name" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Contact Email" name="contactEmail" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="Enter contact email" size="large" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Site Description" name="siteDescription">
              <Input.TextArea rows={3} placeholder="Enter site description" />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />} 
                size="large"
                loading={updateConfigurationMutation.isPending}
              >
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <SecurityScanOutlined />
          Security
        </span>
      ),
      children: (
        <Card>
          <Form form={securityForm} onFinish={handleSecuritySubmit} layout="vertical">
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Form.Item label="Session Timeout (minutes)" name="sessionTimeout">
                  <InputNumber min={15} max={480} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Password Min Length" name="passwordLength">
                  <InputNumber min={6} max={20} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Two-Factor Authentication" name="twoFactor" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                size="large"
                htmlType="submit"
                loading={updateConfigurationMutation.isPending}
              >
                Save Security Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <BellOutlined />
          Notifications
        </span>
      ),
      children: (
        <Card>
          <Form form={notificationForm} onFinish={handleNotificationSubmit} layout="vertical">
            <Form.Item label="Email Notifications" name="emailNotif" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Push Notifications" name="pushNotif" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Course Updates" name="courseUpdates" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                size="large"
                htmlType="submit"
                loading={updateConfigurationMutation.isPending}
              >
                Save Notification Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <Title level={2}>System Configuration</Title>
      <Text type="secondary">Manage your platform settings and preferences</Text>
      
      <div style={{ marginTop: '24px' }}>
        <Tabs
          items={items}
          size="large"
          tabPosition="top"
          style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default ConfigurationPage; 