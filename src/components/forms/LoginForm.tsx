import React,{useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Input,
  Typography,
  Space,
  Divider,
  Alert
} from 'antd';

import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase'; 

import CustomButton from '../ui/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import type { AppDispatch, RootState } from '../../store/store';
import googleIcon from "../../assets/google_icon-icons.webp"

const { Title, Text, Link } = Typography;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [successMessage, setSuccessMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      const response = await dispatch(login(values)).unwrap();
      

      setSuccessMessage('You have logged in successfuly');

      setTimeout(() => {
        if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (response.user.role === 'instructor') {
          navigate('/instructor/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }, 2000);

    } catch (error: any) {
      const msg = error?.message;
      if (msg === 'Please verify your email before logging in.') {
        setSuccessMessage('Please verify your email before logging in.');
        setTimeout(() => {
          navigate('/verifyemail');
        }, 2000);
      } else {
        setSuccessMessage(msg || 'Invalid email or password');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
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
      <Title level={2}>Login</Title>
      <Text type="secondary">Log in to your account</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
          <Form style={{ marginTop: '1rem' }} onSubmit={handleSubmit}>
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <Input
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <Text type="danger">{errors.email}</Text>
                )}
              </div>

              <div>
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
              </div>

              
   

              <CustomButton
                variant="primary"
                size="lg"
                block
                htmlType="submit"
                loading={isSubmitting || isLoading}
                disabled={isSubmitting || isLoading}
              >
                Log In
              </CustomButton>
                  {/* Forgot Password Link */}
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 12 }}>
      <RouterLink to="/forgot-password" style={{ fontSize: 14 }}>
        Forgot Password?
      </RouterLink>
    </div>
    {successMessage && (
                <Alert
                  type={
                    successMessage.toLowerCase().includes('invalid') ||
                    successMessage.toLowerCase().includes('verify')
                      ? 'warning'
                      : 'success'
                  }
                  message={successMessage}
                  showIcon
                  style={{ marginTop: 8 }}
                />
              )}

              <Divider>or</Divider>

              <CustomButton variant="google" size="lg"  block  icon={
    <img
      src={googleIcon}
      alt="Google"
      style={{ width: 18, height: 18 , marginRight:20}}
    />
  } onClick={handleGoogleLogin}>
                Continue with Google
              </CustomButton>

              <Text>
                Don’t have an account? <Link href="/register">Sign Up</Link>
              </Text>
           
            </Space>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default LoginForm;
