import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Avatar } from 'antd';
import type { Student } from '../../store/slices/studentSlice';

const { TextArea } = Input;

interface ProfileFormProps {
  initialValues: Student;
  onSubmit: (values: Student) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number')
      .required('Phone number is required'),
    department: Yup.string()
      .min(2, 'Department must be at least 2 characters')
      .required('Department is required'),
    bio: Yup.string()
      .max(500, 'Bio must be less than 500 characters'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, isSubmitting, handleChange, handleBlur }) => (
        <Form>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar size={100} src={values.avatar} />
            <h3 style={{ marginTop: 16 }}>{values.name}</h3>
            <p style={{ color: '#666' }}>Student ID: {values.studentId}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
                Full Name *
              </label>
              <Field
                as={Input}
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                status={errors.name && touched.name ? 'error' : ''}
              />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
                Email *
              </label>
              <Field
                as={Input}
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                status={errors.email && touched.email ? 'error' : ''}
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
                Phone *
              </label>
              <Field
                as={Input}
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your phone number"
                status={errors.phone && touched.phone ? 'error' : ''}
              />
              <ErrorMessage name="phone" component="div" />
            </div>

            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
                Department *
              </label>
              <Field
                as={Input}
                name="department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your department"
                status={errors.department && touched.department ? 'error' : ''}
              />
              <ErrorMessage name="department" component="div" />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
              Bio
            </label>
            <Field
              as={TextArea}
              name="bio"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about yourself"
              rows={3}
              status={errors.bio && touched.bio ? 'error' : ''}
            />
            <ErrorMessage name="bio" component="div" />
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading || isSubmitting}
              disabled={Object.keys(errors).length > 0}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm; 