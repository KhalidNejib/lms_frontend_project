import React, { useState } from 'react';
import {
  Form,
  Input,
  Typography,
  Row,
  Col,
  Card,
  message,
  Alert,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import CustomButton from '../../components/ui/CustomButton';

const { Title, Text, Link } = Typography;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // NEW

  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    setEmailSent(false); // reset previous alert

    try {
      await authService.forgotPassword(values.email);
      setEmailSent(true); // show alert
      //hide alert after 5 seconds
      setTimeout(() => {
        setEmailSent(false);
      }, 5000)
      message.success('If the email exists, a reset link has been sent.');
    } catch (error: any) {
      message.error(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}
    >
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <Title level={3}>Forgot your password</Title>
          <Text type="secondary">
            Please enter the email address you'd like your password reset information sent to
          </Text>

          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 24 }}>
            <Form.Item
              label="Enter email address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                size="large"
                type="email"
                placeholder="you@example.com"
                disabled={loading}
              />
            </Form.Item>

          

            <Form.Item>
              <CustomButton
                htmlType="submit"
                variant="primary"
                size="lg"
                block
                loading={loading}
              >
                Request reset link
              </CustomButton>
            </Form.Item>

            {emailSent && (
              <Alert
                message="We have sent a password reset link to your email address."
                type="success"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form.Item>
              <Link onClick={() => navigate('/login')} style={{ color: '#000000' }}>
                Back To Login
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
