import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Spin, Result, Button, message as antdMessage } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, MailOutlined } from '@ant-design/icons';
import authService from '../../services/auth.service';

const { Title, Paragraph } = Typography;

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    token ? 'loading' : 'idle'
  );
  const [message, setMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const hasVerified = useRef(false); // Prevent multiple verification requests

  useEffect(() => {
    const email = localStorage.getItem('pendingVerificationEmail');
    if (email) setUserEmail(email);
  }, []);

  useEffect(() => {
    if (!token || status !== 'loading' || hasVerified.current) return;

    hasVerified.current = true;

    const doVerify = async () => {
      console.log('📩 Sending verification request for token:', token);
      try {
        const data = await authService.verifyEmail(token);
        setMessage(data.message || 'Your email has been verified successfully.');
        setStatus('success');

        setTimeout(() => {
          navigate('/login');
        }, 6000);
      } catch (err: any) {
        setMessage(err.response?.data?.message || 'Verification failed.');
        setStatus('error');
      }
    };

    doVerify();
  }, [token, status, navigate]);

  const handleResend = async () => {
    if (!userEmail) {
      antdMessage.error('Email not found. Please register again.');
      return;
    }

    try {
      setResendLoading(true);
      const response = await authService.resendVerification(userEmail);
      antdMessage.success(response.message || 'Verification email resent successfully.');
    } catch (error: any) {
      antdMessage.error(error.response?.data?.message || 'Failed to resend verification email.');
    } finally {
      setResendLoading(false);
    }
  };

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16 }}>Verifying your email...</Paragraph>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <Result
          icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
          title="Email Verified!"
          subTitle={message}
          extra={
            <Button type="primary" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          }
        />
      );
    }

    if (status === 'error') {
      return (
        <Result
          status="error"
          icon={<CloseCircleTwoTone twoToneColor="#ff4d4f" />}
          title="Verification Failed"
          subTitle={message}
          extra={[
            <Button
              key="resend"
              type="primary"
              style={{ backgroundColor: '#FF9500', borderColor: '#FF9500' }}
              onClick={handleResend}
              loading={resendLoading}
            >
              Resend Verification Email
            </Button>,
            <Button key="signup" danger onClick={() => navigate('/register')}>
              Go to Sign Up
            </Button>,
          ]}
        />
      );
    }

    return (
      <Result
        icon={<MailOutlined style={{ fontSize: 64, color: '#FF9500' }} />}
        title={<span style={{ color: '#FF9500' }}>Check Your Email</span>}
        subTitle="We've sent a verification link to your inbox. Please open your email and click the link to activate your account."
        extra={
          <Button
            type="primary"
            style={{ backgroundColor: '#FF9500', borderColor: '#FF9500' }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        }
      />
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <Title level={2} style={{ textAlign: 'center', color: '#FF9500' }}>
        Email Verification
      </Title>
      {renderContent()}
    </div>
  );
};

export default VerifyEmail;
