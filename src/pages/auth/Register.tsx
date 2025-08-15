import React, { useRef } from 'react';
import { Row, Col, Typography, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import  SignUpForm from "../../components/forms/SignUpform"
import TestimonialCard from '../../components/ui/TestimonialCard';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

const testimonials = [
  {
    text: 'The course gave me a great foundation. Interactive, supportive, and well-paced!',
    name: 'Sarah L.',
    avatarUrl: 'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Sarah',
  },
  {
    text: 'Loved the hands-on projects. It boosted my confidence in real-world work.',
    name: 'Daniel R.',
    avatarUrl: 'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Daniel',
  },
];

const SignUpPage: React.FC = () => {
  const carouselRef = useRef<any>(null); // Carousel ref to control slides

  return (
    <div style={{ padding: '3rem 1rem', background: '#fafafa', minHeight: '100vh' }}>
      <Row
        gutter={[32, 32]}
        justify="center"
        align="middle"
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title level={3}>Students Testimonials</Title>
            <Paragraph type="secondary">
              Real stories from our students. Read how our LMS changed their learning journey.
            </Paragraph>

            <Carousel autoplay dots ref={carouselRef}>
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
            </Carousel>

            {/* Arrows under the carousel */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                marginTop: 16,
              }}
            >
              <button
                onClick={() => carouselRef.current?.prev()}
                style={arrowButtonStyle}
              >
                <LeftOutlined />
              </button>
              <button
                onClick={() => carouselRef.current?.next()}
                style={arrowButtonStyle}
              >
                <RightOutlined />
              </button>
            </div>
          </motion.div>
        </Col>

        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ background: '#fff', padding: '2rem', borderRadius: 8 }}
          >
          <SignUpForm/>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

const arrowButtonStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1px solid #d9d9d9',
  background: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
};

export default SignUpPage;










