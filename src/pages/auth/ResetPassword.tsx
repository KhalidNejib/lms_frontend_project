import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Typography,
  Form as AntForm,
  Input,
  Alert,
  message as antdMessage,
} from 'antd';
import { Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';

import CustomButton from '../../components/ui/CustomButton';
import authService from '../../services/auth.service';

const { Title, Text, Link } = Typography;

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'Must include one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

interface ResetFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const initialValues: ResetFormValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (
    values: ResetFormValues,
    { setSubmitting }: FormikHelpers<ResetFormValues>
  ) => {
    if (!token) {
      messageApi.error('Reset token not found');
      setSubmitting(false);
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, values.password, values.confirmPassword);
      messageApi.success('Password reset successfully.');
      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate('/login');
      }, 5000);
    } catch (error: any) {
      messageApi.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder} {/* Needed for antd message to show */}

      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '32px 24px',
              textAlign: 'center',
            }}
          >
            <Title level={3}>Reset your password</Title>
            <Text type="secondary">Please enter a new password and confirm it</Text>

            <Formik
              initialValues={initialValues}
              validationSchema={ResetPasswordSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <AntForm
                  layout="vertical"
                  onSubmitCapture={handleSubmit} // <== This triggers Formik properly
                  style={{ marginTop: 24 }}
                >
                  <AntForm.Item
                    label="New Password"
                    validateStatus={touched.password && errors.password ? 'error' : ''}
                    help={touched.password && errors.password}
                  >
                    <Input.Password
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="large"
                      placeholder="Enter new password"
                      disabled={loading}
                    />
                  </AntForm.Item>

                  <AntForm.Item
                    label="Confirm Password"
                    validateStatus={
                      touched.confirmPassword && errors.confirmPassword ? 'error' : ''
                    }
                    help={touched.confirmPassword && errors.confirmPassword}
                  >
                    <Input.Password
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="large"
                      placeholder="Confirm new password"
                      disabled={loading}
                    />
                  </AntForm.Item>

                  <AntForm.Item>
                    <CustomButton
                      htmlType="submit"
                      variant="primary"
                      size="lg"
                      block
                      loading={loading || isSubmitting}
                    >
                      Reset Password
                    </CustomButton>
                  </AntForm.Item>

                  {showSuccessAlert && (
                    <Alert
                      message="Your password has been reset successfully. Redirecting to login..."
                      type="success"
                      showIcon
                      style={{ marginBottom: 16 }}
                    />
                  )}

                  <AntForm.Item>
                    <Link
                      onClick={() => navigate('/login')}
                      style={{ color: '#000000', cursor: 'pointer' }}
                    >
                      Back to Login
                    </Link>
                  </AntForm.Item>
                </AntForm>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ResetPassword;
