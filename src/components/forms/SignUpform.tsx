import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Typography,
  Space,
  Divider,
  Select,
  Checkbox,
  Alert,
} from 'antd';

import { motion } from 'framer-motion';
import CustomButton from '../ui/CustomButton';
import type { AppDispatch, RootState } from '../../store/store';
import { register } from '../../store/authSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase'; 
import googleIcon from "../../assets/google_icon-icons.webp"

const { Title, Text, Link } = Typography;
const { Option } = Select;

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin' | 'content-manager';
}

type RegisterFormValues = RegisterData & { terms: boolean };

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'Must include one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must include one special character'),
  role: Yup.string()
    .oneOf(['admin', 'instructor', 'student', 'content-manager'], 'Select a valid role')
    .required('Role is required'),
  terms: Yup.bool().oneOf([true], 'You must accept the terms'),
});

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [successMessage, setSuccessMessage] = useState<string>('');

  const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    terms: false,
  };

  const handleSubmit = async (values: RegisterFormValues, { setSubmitting }: any) => {
    try {
      const response = await dispatch(register(values)).unwrap();

      setSuccessMessage('Registered successfully. Please check your email to verify your account.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

      setTimeout(() => {
        if (response?.verificationToken) {
          navigate(`/verifyemail?token=${response.verificationToken}`);
        } else {
          navigate('/verifyemail');
        }
      }, 3000); // Delay to let user see the message
    } catch (error: any) {
      setSuccessMessage(error?.message || 'Something went wrong!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  //for continue with google button
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // ✅ Optionally send user info/token to your backend to log in or register
      console.log('Google user:', user);
  
      // Navigate based on user email or role
      navigate('/student/dashboard'); // or wherever is appropriate
    } catch (error: any) {
      console.error('Google login failed:', error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title level={2}>Sign Up</Title>
      <Text type="secondary">Create an account to unlock exclusive features.</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form style={{ marginTop: '1rem' }} onSubmit={handleSubmit}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Input
                name="firstName"
                placeholder="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName && (
                <Text type="danger">{errors.firstName}</Text>
              )}

              <Input
                name="lastName"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName && (
                <Text type="danger">{errors.lastName}</Text>
              )}

              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <Text type="danger">{errors.email}</Text>
              )}

              <Input.Password
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <Text type="danger">{errors.password}</Text>
              )}

              <Select
                placeholder="Select Role"
                value={values.role}
                onChange={(value) => setFieldValue('role', value)}
                onBlur={() => handleBlur({ target: { name: 'role' } })}
              >
                <Option value="student">Student</Option>
                <Option value="instructor">Instructor</Option>
                <Option value="admin">Admin</Option>
                <Option value="content-manager">Content Manager</Option>
              </Select>
              {touched.role && errors.role && (
                <Text type="danger">{errors.role}</Text>
              )}

              <Checkbox
                checked={values.terms}
                onChange={(e) => setFieldValue('terms', e.target.checked)}
              >
                I agree with <Link>Terms</Link> and <Link>Privacy</Link>
              </Checkbox>
              {touched.terms && errors.terms && (
                <Text type="danger">{errors.terms}</Text>
              )}

              <CustomButton
                variant="primary"
                size="lg"
                block
                htmlType="submit"
                loading={isSubmitting || isLoading}
                disabled={isSubmitting || isLoading}
              >
                Sign Up
              </CustomButton>

              {/* ✅ Success or Error message below form */}
              {successMessage && (
                <Alert
                  type={successMessage.includes('successfully') ? 'success' : 'error'}
                  message={successMessage}
                  showIcon
                  style={{ marginTop: '8px' }}
                />
              )}

              <Divider>or</Divider>

              <CustomButton variant="google" size="lg" block   icon={
    <img
      src={googleIcon}
      alt="Google"
      style={{ width: 18, height: 18 , marginRight:20}}
    />
  } onClick={handleGoogleLogin}>
                Continue with Google
              </CustomButton>

              <Text>
                Already have an account? <Link href="/login">Login</Link>
              </Text>
            </Space>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default SignUpForm;
