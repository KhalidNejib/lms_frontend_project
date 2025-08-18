import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  List,
  Progress,
  Button,
  Typography,
  Row,
  Col,
  Spin,
  Alert,
  Avatar,
  Statistic,
  Divider,
  Tag,
  Space,
} from 'antd';
import {
  PlayCircleOutlined,
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import Breadcrumbs from '../../../components/DashboardUi/Breadcrumbs';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  fetchStudentProfile,
  fetchStudentProgress,
  fetchStudentActivities,
  fetchEnrolledCourses,
 
} from '../../../store/slices/studentSlice';
import type { RootState } from '../../../store/store';

const { Title, Text } = Typography;

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    profile,
    progress,
    activities, 
    enrolledCourses,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.student);

  // Fetch all student data
  useEffect(() => {
    dispatch(fetchStudentProfile());
    dispatch(fetchStudentProgress());
    dispatch(fetchStudentActivities());
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  console.log(profile);
  console.log(progress);
  console.log(activities);
  console.log(enrolledCourses);
  

  const handleCourseResume = (courseId: string) => {
    navigate(`/courses/${courseId}/player`);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="Loading student dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: '24px' }}
      />
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumbs />

      {/* Welcome */}
      <Title level={3} style={{ marginBottom: '24px' }}>
        Welcome Back, {profile?.name?.split(' ')[0] || 'Student'}
      </Title>

      {/* Progress Overview */}
      <Card
        title={
          <Space>
            <Title level={4} style={{ margin: 0, color: '#1a365d' }}>
              Student Progress Overview
            </Title>
            <Button
              type="primary"
              icon={<BookOutlined />}
              onClick={() => navigate('/courses')}
              style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
            >
              Browse Courses
            </Button>
          </Space>
        }
        style={{ marginBottom: '24px' }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="Overall Progress"
              value={progress?.overallProgress || 0}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Monthly Progress"
              value={progress?.monthlyProgress || 0}
              suffix="%"
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Enrolled Courses"
              value={enrolledCourses?.length || 0}
              prefix={<BookOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Completed Activities"
              value={activities?.length || 0}
              prefix={<TrophyOutlined />}
            />
          </Col>
        </Row>

        {/* Progress Categories */}
        {progress?.categories?.length ? (
          <>
            <Divider />
            <Title level={5}>Progress by Category</Title>
            <Row gutter={16}>
              {progress.categories.map((cat, i) => (
                <Col span={12} key={i}>
                  <Text strong>{cat.category}</Text>
                  <Progress
                    percent={cat.percentage}
                    size="small"
                    status={cat.percentage === 100 ? 'success' : 'active'}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : null}
      </Card>

      {/* Enrolled Courses */}
      <Card
        title={
          <Space>
            <BookOutlined />
            <Title level={4} style={{ margin: 0 }}>
              My Enrolled Courses
            </Title>
          </Space>
        }
        style={{ marginBottom: '24px' }}
      >
        {enrolledCourses?.length ? (
          <Row gutter={16}>
            {enrolledCourses.map((course: EnrolledCourse) => (
              <Col span={8} key={course.id}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: '120px',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BookOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </div>
                  }
                  actions={[
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      onClick={() => handleCourseResume(course.id)}
                    >
                      Resume
                    </Button>,
                    <Button
                      icon={<ArrowRightOutlined />}
                      onClick={() => handleCourseClick(course.id)}
                    >
                      View
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={course.title}
                    description={
                      <>
                        <Progress
                          percent={course.progress || 0}
                          size="small"
                          status={course.progress === 100 ? 'success' : 'active'}
                        />
                        <Text type="secondary">{course.progress || 0}% Complete</Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
            <Text type="secondary">No courses enrolled yet</Text>
            <br />
            <Button type="primary" onClick={() => navigate('/courses')} style={{ marginTop: '16px' }}>
              Browse Courses
            </Button>
          </div>
        )}
      </Card>

      {/* Recent Activities */}
      <Card
        title={
          <Space>
            <ClockCircleOutlined />
            <Title level={4} style={{ margin: 0 }}>
              Recent Activities
            </Title>
          </Space>
        }
      >
        {activities?.length ? (
          <List
            dataSource={activities}
            renderItem={(activity: StudentActivity) => (
              <List.Item key={activity.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={
                        activity.type === 'course'
                          ? <BookOutlined />
                          : activity.type === 'assignment'
                          ? <TrophyOutlined />
                          : <ClockCircleOutlined />
                      }
                      style={{
                        backgroundColor:
                          activity.type === 'course'
                            ? '#1890ff'
                            : activity.type === 'assignment'
                            ? '#52c41a'
                            : '#faad14',
                      }}
                    />
                  }
                  title={activity.title}
                  description={
                    <Space>
                      <Text type="secondary">{activity.timeAgo}</Text>
                      <Tag
                        color={
                          activity.type === 'course'
                            ? 'blue'
                            : activity.type === 'assignment'
                            ? 'green'
                            : 'orange'
                        }
                      >
                        {activity.type}
                      </Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <ClockCircleOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
            <Text type="secondary">No recent activities</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentDashboard;
















