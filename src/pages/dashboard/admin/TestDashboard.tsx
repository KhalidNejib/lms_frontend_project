import React from 'react';
import { Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const TestDashboard: React.FC = () => {
  console.log('TestDashboard rendering...');
  
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Test Admin Dashboard</Title>
      <Text>This is a test component to verify basic rendering.</Text>
      
      <Card style={{ marginTop: '16px' }}>
        <Title level={4}>Test Card</Title>
        <Text>If you can see this, the basic routing and layout are working.</Text>
        <br />
        <Button type="primary" style={{ marginTop: '8px' }}>
          Test Button
        </Button>
      </Card>
    </div>
  );
};

export default TestDashboard; 

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   List,
//   Progress,
//   Button,
//   Typography,
//   Row,
//   Col,
//   message,
//   Space,
//   Spin,
//   Alert,
//   Avatar,
//   Statistic,
//   Divider,
//   Tag,
// } from 'antd';
// import {
//   PlayCircleOutlined,
//   UserOutlined,
//   BookOutlined,
//   ClockCircleOutlined,
//   TrophyOutlined,
//   ArrowRightOutlined,
// } from '@ant-design/icons';
// import Breadcrumbs from '../../../components/DashboardUi/Breadcrumbs';
// import { useAppSelector, useAppDispatch } from '../../../store/hooks';
// import {
//   fetchStudentProfile,
//   fetchStudentProgress,
//   fetchStudentActivities,
//   fetchEnrolledCourses,
// } from '../../../store/slices/studentSlice';

// const { Title, Text } = Typography;

// const StudentDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { profile, progress, activities, enrolledCourses, loading, error } = useAppSelector(
//     (state: any) => state.student
//   );

//   useEffect(() => {
//     // Fetch all student data from backend
//     dispatch(fetchStudentProfile ("1"));
//     dispatch(fetchStudentProgress("1"));
//     dispatch(fetchStudentActivities("1"));
//     dispatch(fetchEnrolledCourses("1"));
//   }, [dispatch]);

//   console.log('student profile:', profile);
// console.log('student courses:', enrolledCourses);
// console.log('student Progress:', progress);
// console.log('student activities:', activities);

//   const handleCourseResume = (courseId: string, courseTitle: string) => {
//     message.success(`Resuming ${courseTitle}`);
//     navigate(`/courses/${courseId}/player`);
//   };

//   const handleCourseClick = (courseId: string) => {
//     navigate(`/courses/${courseId}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', padding: '50px' }}>
//         <Spin size="large" />
//         <div style={{ marginTop: '16px' }}>Loading student dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert
//         message="Error"
//         description={error}
//         type="error"
//         showIcon
//         style={{ margin: '24px' }}
//       />
//     );
//   }

//   return (
//     <div style={{ padding: '24px' }}>
//       {/* Breadcrumb */}
//       <Breadcrumbs />

//       {/* Welcome Section */}
//       <Title level={3} style={{ marginBottom: '24px' }}>
//         Welcome Back, {profile?.name?.split(' ')[0] || 'Student'}
//       </Title>

//       {/* Student Progress Overview */}
//       <Card
//         title={
//           <Space>
//             <Title level={4} style={{ margin: 0, color: '#1a365d' }}>
//               Student Progress Overview
//             </Title>
//             <Button
//               type="primary"
//               icon={<BookOutlined />}
//               onClick={() => navigate('/courses')}
//               style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
//             >
//               Browse Courses
//             </Button>
//           </Space>
//         }
//         style={{ marginBottom: '24px' }}
//       >
//         <Row gutter={16}>
//           <Col span={6}>
//             <Statistic
//               title="Overall Progress"
//               value={progress?.overallProgress || 0}
//               suffix="%"
//               valueStyle={{ color: '#3f8600' }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Monthly Progress"
//               value={progress?.monthlyProgress || 0}
//               suffix="%"
//               valueStyle={{ color: '#1890ff' }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Enrolled Courses"
//               value={enrolledCourses?.length || 0}
//               prefix={<BookOutlined />}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Completed Activities"
//               value={activities?.length || 0}
//               prefix={<TrophyOutlined />}
//             />
//           </Col>
//         </Row>

//         {/* Progress Categories */}
//         {progress?.categories && progress.categories.length > 0 && (
//           <>
//             <Divider />
//             <Title level={5}>Progress by Category</Title>
//             <Row gutter={16}>
//                              {progress.categories.map((category: any, index: number) => (
//                  <Col span={12} key={index}>
//                    <div style={{ marginBottom: '16px' }}>
//                      <Text strong>{category.category}</Text>
//                      <Progress
//                        percent={category.percentage}
//                        size="small"
//                        status={category.percentage === 100 ? 'success' : 'active'}
//                      />
//                    </div>
//                  </Col>
//                ))}
//             </Row>
//           </>
//         )}
//       </Card>

//       {/* Enrolled Courses */}
//       <Card
//         title={
//           <Space>
//             <BookOutlined />
//             <Title level={4} style={{ margin: 0 }}>
//               My Enrolled Courses
//             </Title>
//           </Space>
//         }
//         style={{ marginBottom: '24px' }}
//       >
//         {enrolledCourses && enrolledCourses.length > 0 ? (
//           <Row gutter={16}>
//             {enrolledCourses.map((course: any, index: number) => (
//               <Col span={8} key={course.id}>
//                 <Card
//                   hoverable
//                   cover={
//                     <div style={{ height: '120px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <BookOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
//                     </div>
//                   }
//                   actions={[
//                     <Button
//                       type="primary"
//                       icon={<PlayCircleOutlined />}
//                       onClick={() => handleCourseResume(course.id, course.title)}
//                     >
//                       Resume
//                     </Button>,
//                     <Button
//                       icon={<ArrowRightOutlined />}
//                       onClick={() => handleCourseClick(course.id)}
//                     >
//                       View
//                     </Button>
//                   ]}
//                 >
//                   <Card.Meta
//                     title={course.title}
//                     description={
//                       <div>
//                         <Progress
//                           percent={course.progress || 0}
//                           size="small"
//                           status={course.progress === 100 ? 'success' : 'active'}
//                         />
//                         <Text type="secondary">{course.progress || 0}% Complete</Text>
//                       </div>
//                     }
//                   />
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
//             <Text type="secondary">No courses enrolled yet</Text>
//             <br />
//             <Button
//               type="primary"
//               onClick={() => navigate('/courses')}
//               style={{ marginTop: '16px' }}
//             >
//               Browse Courses
//             </Button>
//           </div>
//         )}
//       </Card>

//       {/* Recent Activities */}
//       <Card
//         title={
//           <Space>
//             <ClockCircleOutlined />
//             <Title level={4} style={{ margin: 0 }}>
//               Recent Activities
//             </Title>
//           </Space>
//         }
//       >
//         {activities && activities.length > 0 ? (
//           <List
//             dataSource={activities}
//             renderItem={(activity: any, index: number) => (
//               <List.Item key={index}>
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar
//                       icon={
//                         activity.type === 'course' ? <BookOutlined /> :
//                         activity.type === 'assignment' ? <TrophyOutlined /> :
//                         <ClockCircleOutlined />
//                       }
//                       style={{
//                         backgroundColor:
//                           activity.type === 'course' ? '#1890ff' :
//                           activity.type === 'assignment' ? '#52c41a' :
//                           '#faad14'
//                       }}
//                     />
//                   }
//                   title={activity.title}
//                   description={
//                     <Space>
//                       <Text type="secondary">{activity.timeAgo}</Text>
//                       <Tag color={
//                         activity.type === 'course' ? 'blue' :
//                         activity.type === 'assignment' ? 'green' :
//                         'orange'
//                       }>
//                         {activity.type}
//                       </Tag>
//                     </Space>
//                   }
//                 />
//               </List.Item>
//             )}
//           />
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <ClockCircleOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
//             <Text type="secondary">No recent activities</Text>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default StudentDashboard;


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   List,
//   Progress,
//   Button,
//   Typography,
//   Row,
//   Col,
//   Spin,
//   Alert,
//   Avatar,
//   Statistic,
//   Divider,
//   Tag,
//   Space,
// } from 'antd';
// import {
//   PlayCircleOutlined,
//   BookOutlined,
//   ClockCircleOutlined,
//   TrophyOutlined,
// } from '@ant-design/icons';
// import Breadcrumbs from '../../../components/DashboardUi/Breadcrumbs';
// import { useAppSelector, useAppDispatch } from '../../../store/hooks';
// import {
//   fetchStudentProfile,
//   fetchStudentProgress,
//   fetchStudentActivities,
//   fetchEnrolledCourses,
// } from '../../../store/slices/studentSlice';

// const { Title, Text } = Typography;

// const StudentDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { profile, progress, activities, enrolledCourses, loading, error } = useAppSelector(
//     (state: any) => state.student
//   );

//   useEffect(() => {
//     // Fetch all student data (authenticated user)
//     dispatch(fetchStudentProfile());
//     dispatch(fetchStudentProgress());
//     dispatch(fetchStudentActivities());
//     dispatch(fetchEnrolledCourses());
//   }, [dispatch]);

//   console.log(profile)

//   const handleCourseResume = (courseId: string, courseTitle: string) => {
//     navigate(`/courses/${courseId}/player`);
//   };

//   const handleCourseClick = (courseId: string) => {
//     navigate(`/courses/${courseId}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', padding: '50px' }}>
//         <Spin size="large" tip="Loading student dashboard..." />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert
//         message="Error"
//         description={error}
//         type="error"
//         showIcon
//         style={{ margin: '24px' }}
//       />
//     );
//   }

//   return (
//     <div style={{ padding: '24px' }}>
//       {/* Breadcrumb */}
//       <Breadcrumbs />

//       {/* Welcome Section */}
//       <Title level={3} style={{ marginBottom: '24px' }}>
//         Welcome Back, {profile?.name?.split(' ')[0] || 'Student'}
//       </Title>

//       {/* Student Progress Overview */}
//       <Card
//         title={
//           <Space>
//             <Title level={4} style={{ margin: 0, color: '#1a365d' }}>
//               Student Progress Overview
//             </Title>
//             <Button
//               type="primary"
//               icon={<BookOutlined />}
//               onClick={() => navigate('/courses')}
//               style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
//             >
//               Browse Courses
//             </Button>
//           </Space>
//         }
//         style={{ marginBottom: '24px' }}
//       >
//         <Row gutter={16}>
//           <Col span={6}>
//             <Statistic
//               title="Overall Progress"
//               value={progress?.overallProgress || 0}
//               suffix="%"
//               valueStyle={{ color: '#3f8600' }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Monthly Progress"
//               value={progress?.monthlyProgress || 0}
//               suffix="%"
//               valueStyle={{ color: '#1890ff' }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Enrolled Courses"
//               value={enrolledCourses?.length || 0}
//               prefix={<BookOutlined />}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Completed Activities"
//               value={activities?.length || 0}
//               prefix={<TrophyOutlined />}
//             />
//           </Col>
//         </Row>

//         {/* Progress Categories */}
//         {progress?.categories?.length > 0 && (
//           <>
//             <Divider />
//             <Title level={5}>Progress by Category</Title>
//             <Row gutter={16}>
//               {progress.categories.map((category: any, index: number) => (
//                 <Col span={12} key={index}>
//                   <Text strong>{category.category}</Text>
//                   <Progress
//                     percent={category.percentage}
//                     size="small"
//                     status={category.percentage === 100 ? 'success' : 'active'}
//                   />
//                 </Col>
//               ))}
//             </Row>
//           </>
//         )}
//       </Card>

//       {/* Enrolled Courses */}
//       <Card
//         title={
//           <Space>
//             <BookOutlined />
//             <Title level={4} style={{ margin: 0 }}>
//               My Enrolled Courses
//             </Title>
//           </Space>
//         }
//         style={{ marginBottom: '24px' }}
//       >
//         {enrolledCourses?.length > 0 ? (
//           <Row gutter={16}>
//             {enrolledCourses.map((course: any) => (
//               <Col span={8} key={course.id}>
//                 <Card
//                   hoverable
//                   cover={
//                     <div
//                       style={{
//                         height: '120px',
//                         backgroundColor: '#f0f0f0',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       <BookOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
//                     </div>
//                   }
//                   actions={[
//                     <Button
//                       type="primary"
//                       icon={<PlayCircleOutlined />}
//                       onClick={() => handleCourseResume(course.id, course.title)}
//                     >
//                       Resume
//                     </Button>,
//                     <Button icon={<BookOutlined />} onClick={() => handleCourseClick(course.id)}>
//                       View
//                     </Button>,
//                   ]}
//                 >
//                   <Card.Meta
//                     title={course.title}
//                     description={
//                       <div>
//                         <Progress
//                           percent={course.progress || 0}
//                           size="small"
//                           status={course.progress === 100 ? 'success' : 'active'}
//                         />
//                         <Text type="secondary">{course.progress || 0}% Complete</Text>
//                       </div>
//                     }
//                   />
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
//             <Text type="secondary">No courses enrolled yet</Text>
//             <br />
//             <Button type="primary" onClick={() => navigate('/courses')} style={{ marginTop: '16px' }}>
//               Browse Courses
//             </Button>
//           </div>
//         )}
//       </Card>

//       {/* Recent Activities */}
//       <Card
//         title={
//           <Space>
//             <ClockCircleOutlined />
//             <Title level={4} style={{ margin: 0 }}>
//               Recent Activities
//             </Title>
//           </Space>
//         }
//       >
//         {activities?.length > 0 ? (
//           <List
//             dataSource={activities}
//             renderItem={(activity: any) => (
//               <List.Item key={activity.id}>
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar
//                       icon={
//                         activity.type === 'course' ? <BookOutlined /> :
//                         activity.type === 'assignment' ? <TrophyOutlined /> :
//                         <ClockCircleOutlined />
//                       }
//                       style={{
//                         backgroundColor:
//                           activity.type === 'course' ? '#1890ff' :
//                           activity.type === 'assignment' ? '#52c41a' :
//                           '#faad14',
//                       }}
//                     />
//                   }
//                   title={activity.title}
//                   description={
//                     <Space>
//                       <Text type="secondary">{activity.timeAgo}</Text>
//                       <Tag
//                         color={
//                           activity.type === 'course' ? 'blue' :
//                           activity.type === 'assignment' ? 'green' :
//                           'orange'
//                         }
//                       >
//                         {activity.type}
//                       </Tag>
//                     </Space>
//                   }
//                 />
//               </List.Item>
//             )}
//           />
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <ClockCircleOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
//             <Text type="secondary">No recent activities</Text>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default StudentDashboard;


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   List,
//   Progress,
//   Button,
//   Typography,
//   Row,
//   Col,
//   message,
//   Space,
//   Spin,
//   Alert,
//   Avatar,
//   Statistic,
//   Divider,
//   Tag,
//   Table,
//   Badge,
// } from 'antd';
// import {
//   PlayCircleOutlined,
//   UserOutlined,
//   BookOutlined,
//   ClockCircleOutlined,
//   TrophyOutlined,
//   PlusOutlined,
//   EyeOutlined,
//   EditOutlined,
//   BarChartOutlined,
//   TeamOutlined,
//   FileTextOutlined,
// } from '@ant-design/icons';
// import Breadcrumbs from '../../../components/DashboardUi/Breadcrumbs';
// import { useAppSelector, useAppDispatch } from '../../../store/hooks';
// import {
//   fetchInstructorProfile,
//   fetchInstructorStats,
//   fetchInstructorCourses,
//   fetchEnrollmentTrends,
//   fetchAssessmentResults,
//   fetchInstructorActivities,
// } from '../../../store/slices/instructorSlice';

// const { Title, Text } = Typography;

// const InstructorDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { profile, stats, courses, enrollmentTrends, assessmentResults, activities, loading, error } = useAppSelector(
//     (state: any) => state.instructor
//   );

//   console.log('Instructor profile:', profile);
// console.log('Instructor stats:', stats);
// console.log('Instructor courses:', courses);
// console.log('Enrollment trends:', enrollmentTrends);
// console.log('Assessment results:', assessmentResults);
// console.log('Recent activities:', activities);
// console.log('Loading:', loading);
// console.log('Error:', error);


//   useEffect(() => {
//     // Fetch all instructor data from backend
//     dispatch(fetchInstructorProfile('1'));
//     dispatch(fetchInstructorStats('1'));
//     dispatch(fetchInstructorCourses('1'));
//     dispatch(fetchEnrollmentTrends('1'));
//     dispatch(fetchAssessmentResults('1'));
//     dispatch(fetchInstructorActivities('1'));
//   }, [dispatch]);

//   const handleCourseClick = (courseId: string) => {
//     navigate(`/courses/${courseId}`);
//   };

//   const handleCreateCourse = () => {
//     navigate('/courses/create');
//   };

//   const handleViewAnalytics = (courseId: string) => {
//     navigate(`/courses/${courseId}/analytics`);
//   };

//   const handleEditCourse = (courseId: string) => {
//     navigate(`/courses/${courseId}/edit`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', padding: '50px' }}>
//         <Spin size="large" />
//         <div style={{ marginTop: '16px' }}>Loading instructor dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert
//         message="Error"
//         description={error}
//         type="error"
//         showIcon
//         style={{ margin: '24px' }}
//       />
//     );
//   }

//   return (
//     <div style={{ padding: '24px' }}>
//       {/* Breadcrumb */}
//       <Breadcrumbs />

//       {/* Welcome Section */}
//       <Title level={3} style={{ marginBottom: '24px' }}>
//         Welcome Back, {profile?.name?.split(' ')[0] || 'Instructor'}
//       </Title>

//       {/* Instructor Stats Overview */}
//       <Card
//         title={
//           <Space>
//             <Title level={4} style={{ margin: 0, color: '#1a365d' }}>
//               Instructor Overview
//             </Title>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={handleCreateCourse}
//               style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
//             >
//               Create New Course
//             </Button>
//           </Space>
//         }
//         style={{ marginBottom: '24px' }}
//       >
//         <Row gutter={16}>
//           <Col span={6}>
//             <Statistic
//               title="Total Courses"
//               value={stats?.totalCourses || 0}
//               prefix={<BookOutlined />}
//               valueStyle={{ color: '#1890ff' }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Total Students"
//               value={stats?.totalStudents || 0}
//               prefix={<TeamOutlined />}
//               valueStyle={{ color: '#52c41a' }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Active Courses"
//               value={stats?.activeCourses || 0}
//               prefix={<PlayCircleOutlined />}
//               valueStyle={{ color: '#faad14' }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Total Revenue"
//               value={stats?.totalRevenue || 0}
//               prefix="$"
//               valueStyle={{ color: '#3f8600' }}
//             />
//           </Col>
//         </Row>

//                  {/* Enrollment Trends */}
//          {enrollmentTrends && enrollmentTrends.length > 0 && (
//            <>
//              <Divider />
//              <Title level={5}>Enrollment Trends</Title>
//              <Row gutter={16}>
//                {enrollmentTrends.slice(0, 4).map((trend: any, index: number) => (
//                  <Col span={6} key={index}>
//                    <div style={{ textAlign: 'center' }}>
//                      <Text strong>{trend.month}</Text>
//                      <div style={{ fontSize: '24px', color: '#1890ff', margin: '8px 0' }}>
//                        {trend.enrollments}
//                      </div>
//                      <Progress
//                        percent={trend.growth}
//                        size="small"
//                        status={trend.growth > 0 ? 'success' : 'exception'}
//                      />
//                    </div>
//                  </Col>
//                ))}
//              </Row>
//            </>
//          )}
//       </Card>

//       {/* My Courses */}
//       <Card
//         title={
//           <Space>
//             <BookOutlined />
//             <Title level={4} style={{ margin: 0 }}>
//               My Courses
//             </Title>
//           </Space>
//         }
//         style={{ marginBottom: '24px' }}
//       >
//                  {courses && courses.length > 0 ? (
//            <Row gutter={16}>
//              {courses.map((course: any, index: number) => (
//                <Col span={8} key={index}>
//                 <Card
//                   hoverable
//                   cover={
//                     <div style={{ height: '120px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <BookOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
//                     </div>
//                   }
//                   actions={[
//                     <Button
//                       type="primary"
//                       icon={<EyeOutlined />}
//                       onClick={() => handleCourseClick(course.id)}
//                     >
//                       View
//                     </Button>,
//                     <Button
//                       icon={<BarChartOutlined />}
//                       onClick={() => handleViewAnalytics(course.id)}
//                     >
//                       Analytics
//                     </Button>,
//                     <Button
//                       icon={<EditOutlined />}
//                       onClick={() => handleEditCourse(course.id)}
//                     >
//                       Edit
//                     </Button>
//                   ]}
//                 >
//                   <Card.Meta
//                     title={course.title}
//                     description={
//                       <div>
//                         <Space direction="vertical" style={{ width: '100%' }}>
//                           <div>
//                             <Text type="secondary">Status: </Text>
//                             <Tag color={
//                               course.status === 'Active' ? 'green' :
//                               course.status === 'Draft' ? 'orange' :
//                               'red'
//                             }>
//                               {course.status}
//                             </Tag>
//                           </div>
//                           <div>
//                             <Text type="secondary">Students: {course.studentCount || 0}</Text>
//                           </div>
//                           <div>
//                             <Text type="secondary">Rating: {course.rating || 'N/A'}</Text>
//                           </div>
//                         </Space>
//                       </div>
//                     }
//                   />
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
//             <Text type="secondary">No courses created yet</Text>
//             <br />
//             <Button
//               type="primary"
//               onClick={handleCreateCourse}
//               style={{ marginTop: '16px' }}
//             >
//               Create Your First Course
//             </Button>
//           </div>
//         )}
//       </Card>

//       {/* Assessment Results */}
//       {assessmentResults && assessmentResults.length > 0 && (
//         <Card
//           title={
//             <Space>
//               <TrophyOutlined />
//               <Title level={4} style={{ margin: 0 }}>
//                 Recent Assessment Results
//               </Title>
//             </Space>
//           }
//           style={{ marginBottom: '24px' }}
//         >
//           <Table
//             dataSource={assessmentResults}
//             columns={[
//               {
//                 title: 'Course',
//                 dataIndex: 'courseName',
//                 key: 'courseName',
//               },
//               {
//                 title: 'Assessment',
//                 dataIndex: 'assessmentName',
//                 key: 'assessmentName',
//               },
//               {
//                 title: 'Average Score',
//                 dataIndex: 'averageScore',
//                 key: 'averageScore',
//                 render: (score) => `${score}%`,
//               },
//               {
//                 title: 'Students',
//                 dataIndex: 'studentCount',
//                 key: 'studentCount',
//               },
//               {
//                 title: 'Status',
//                 dataIndex: 'status',
//                 key: 'status',
//                 render: (status) => (
//                   <Badge
//                     status={status === 'Completed' ? 'success' : 'processing'}
//                     text={status}
//                   />
//                 ),
//               },
//             ]}
//             pagination={false}
//             size="small"
//           />
//         </Card>
//       )}

//       {/* Recent Activities */}
//       <Card
//         title={
//           <Space>
//             <ClockCircleOutlined />
//             <Title level={4} style={{ margin: 0 }}>
//               Recent Activities
//             </Title>
//           </Space>
//         }
//       >
//                  {activities && activities.length > 0 ? (
//            <List
//              dataSource={activities}
//              renderItem={(activity: any) => (
//                <List.Item>
//                  <List.Item.Meta
//                    avatar={
//                      <Avatar
//                        icon={
//                          activity.type === 'course' ? <BookOutlined /> :
//                          activity.type === 'assessment' ? <FileTextOutlined /> :
//                          activity.type === 'student' ? <TeamOutlined /> :
//                          <ClockCircleOutlined />
//                        }
//                        style={{
//                          backgroundColor:
//                            activity.type === 'course' ? '#1890ff' :
//                            activity.type === 'assessment' ? '#52c41a' :
//                            activity.type === 'student' ? '#faad14' :
//                            '#722ed1'
//                        }}
//                      />
//                    }
//                    title={activity.title}
//                    description={
//                      <Space>
//                        <Text type="secondary">{activity.timeAgo}</Text>
//                        <Tag color={
//                          activity.type === 'course' ? 'blue' :
//                          activity.type === 'assessment' ? 'green' :
//                          activity.type === 'student' ? 'orange' :
//                          'purple'
//                        }>
//                          {activity.type}
//                        </Tag>
//                      </Space>
//                    }
//                  />
//                </List.Item>
//              )}
//            />
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <ClockCircleOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
//             <Text type="secondary">No recent activities</Text>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default InstructorDashboard; 




// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import {
//   Row,
//   Col,
//   Card,
//   Statistic,
//   Progress,
//   Table,
//   Button,
//   Input,
//   Tag,
//   Avatar,
//   Space,
//   Typography,
//   Modal,
//   Form,
//   message,
//   Spin,
//   Select,
//   Tooltip,
//   Popconfirm,
//   Badge,
// } from 'antd';
// import {
//   UserOutlined,
//   BookOutlined,
//   DollarOutlined,
//   SettingOutlined,
//   EyeOutlined,
//   CrownOutlined,
//   TeamOutlined,
//   UserAddOutlined,
//   LockOutlined,
//   UnlockOutlined,
//   CheckOutlined,
// } from '@ant-design/icons';
// import Breadcrumbs from '../../../components/DashboardUi/Breadcrumbs';
// import userService from '../../../services/user.service';
// import type { User } from '../../../types/user';
// import { useNavigate } from 'react-router-dom';


// const { Text } = Typography;
// const { Search } = Input;
// const { Option } = Select;

// const AdminDashboard: React.FC = () => {
//   const [searchText, setSearchText] = useState('');
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//   const [isCreateUserModalVisible, setIsCreateUserModalVisible] = useState(false);
//   const [isPromoteUserModalVisible, setIsPromoteUserModalVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [createUserForm] = Form.useForm();
//   const [promoteUserForm] = Form.useForm();
//   const queryClient = useQueryClient();
//   const navigate =useNavigate()

//   // Fetch data
//   const { data: stats, isLoading: statsLoading } = useQuery({
//     queryKey: ['adminStats'],
//     queryFn: userService.getDashboardStats,
//   });

//   const { data: systemHealth, isLoading: healthLoading } = useQuery({
//     queryKey: ['systemHealth'],
//     queryFn: userService.getSystemHealth,
//   });

//   //the interface that our backend respond
//   interface User {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     role: 'student' | 'instructor' | 'admin' | 'content-manager';
//     isActive: boolean;
    
//   }
  
//   interface UsersApiResponse {
//     data: User[];
//   }

//   const { data: users, isLoading: usersLoading,  } = useQuery({
//     queryKey: ['users'],
//     queryFn: userService.getAllUsers,

//   });

//   //codes to debug
//   console.log("Users loading:", usersLoading);

// console.log("Users data:", users);

//   const { data: courseApprovals, isLoading: approvalsLoading } = useQuery({
//     queryKey: ['courseApprovals'],
//     queryFn: userService.getCourseApprovals,
//   });


//   // Mutations

//   const createUserMutation = useMutation({
//     mutationFn: (userData: {
//       email: string;
//       password: string;
//       firstName: string;
//       lastName: string;
//       role: string;
//     }) => userService.createUserWithRole(userData),
//     onSuccess: (data) => {
//       console.log('User created successfully:', data); // Debug log
//       message.success('User created successfully!');
//       queryClient.invalidateQueries({ queryKey: ['users'] });

//       // Slight delay to allow message to show before closing modal/resetting form
//       setTimeout(() => {
//         setIsCreateUserModalVisible(false);
//         createUserForm.resetFields();
//       }, 300);
//     },
//     onError: (error: Error) => {
//       message.error(error.message || 'Failed to create user');
//     },
//   });



//   const updateUserStatusMutation = useMutation({
//     mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'blocked' }) =>
//       userService.updateUserStatus(userId, status),
//     onSuccess: () => {
//       message.success('User status updated successfully!');
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//     onError: (error: Error) => {
//       message.error(error.message || 'Failed to update user status');
//     },
//   });

//   const promoteUserMutation = useMutation({
//     mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
//       console.log('Calling promoteUser with:', userId, newRole);
//       const response = await userService.promoteUser(userId, newRole);
//       console.log('Response from promoteUser:', response);
//       return response;
//     },
//     onSuccess: (response) => {
//       console.log('Mutation success response:', response);
//       const updatedUser = response.data;
      
  
//       queryClient.setQueryData(['users'], (oldData: any) => {
        
//         if (!oldData?.data?.users) return oldData;
  
//         const newUsers = oldData.data.users.map((user: any) =>
//           user._id === updatedUser._id ? updatedUser : user
//         );
        
  
//         return {
//           ...oldData,
//           data: {
//             ...oldData.data,
//             users: newUsers,
//           },
//         };
//       });
  
//       message.success('User role updated successfully!');
//       setIsPromoteUserModalVisible(false);
//       setSelectedUser(null);
//     },
//     onError: (error: Error) => {
//       console.error('Mutation error:', error);
//       message.error(error.message || 'Failed to update user role');
//     },
//   });
  

 

//   const approveCourseMutation = useMutation({
//     mutationFn: (courseId: string) => userService.approveCourse(courseId),
//     onSuccess: () => {
//       message.success('Course approved successfully!');
//       queryClient.invalidateQueries({ queryKey: ['courseApprovals'] });
//     },
//     onError: (error: Error) => {
//       message.error(error.message || 'Failed to approve course');
//     },
//   });

//   // Ensure users is an array
//   // Make sure to access users.data if API response is { data: [...] }
//   const usersArray = Array.isArray(users?.data?.users) ? users.data.users : [];

//   // Filter users based on search text (checking full name, email, role)
//   const filteredUsers = usersArray.filter(user => {
//     const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
//     return (
//       fullName.includes(searchText.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchText.toLowerCase()) ||
//       user.role.toLowerCase().includes(searchText.toLowerCase())
//     );
//   });
  
//   // Role stats for dashboard
//   const roleStats = {
//     students: usersArray.filter(u => u.role === 'student').length,
//     instructors: usersArray.filter(u => u.role === 'instructor').length,
//     admins: usersArray.filter(u => u.role === 'admin').length,
//     contentManagers: usersArray.filter(u => u.role === 'content-manager').length,
//   };
  
//   // Table columns
//   const userColumns = [
//     {
//       title: 'User',
//       key: 'name',
//       render: (_: any, record: User) => {
//         const fullName = `${record.firstName} ${record.lastName}`;
//         return (
//           <Space>
//             <Avatar icon={<UserOutlined />} />
//             <div>
//               <div style={{ fontWeight: 'bold' }}>{fullName}</div>
//               <div style={{ fontSize: 12, color: '#666' }}>{record.email}</div>
//             </div>
//           </Space>
//         );
//       },
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role: string) => {
//         const roleConfig = {
//           admin: { color: 'red', icon: <CrownOutlined /> },
//           instructor: { color: 'blue', icon: <BookOutlined /> },
//           'content-manager': { color: 'purple', icon: <SettingOutlined /> },
//           student: { color: 'green', icon: <UserOutlined /> },
//         };
//         const config = roleConfig[role as keyof typeof roleConfig] || { color: 'default', icon: <UserOutlined /> };
  
//         return (
//           <Tag color={config.color} icon={config.icon}>
//             {role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: 'Status',
//       dataIndex: 'isActive', // matches backend
//       key: 'isActive',
//       render: (isActive: boolean) => (
//         <Badge
//           status={isActive ? 'success' : 'error'}
//           text={isActive ? 'Active' : 'Blocked'}
//         />
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_: any, record: User) => (
//         <Space>
//           <Tooltip title="View Details">
//             <Button
//               type="text"
//               size="small"
//               icon={<EyeOutlined />}
//               onClick={() => navigate(`/dashboard/admin/users/${record._id}`)}
//             />
//           </Tooltip>
  
//           <Tooltip title="Promote User">
//             <Button
//               type="text"
//               size="small"
//               icon={<CrownOutlined />}
//               onClick={() => {
//                 setSelectedUser(record);
//                 promoteUserForm.setFieldsValue({ newRole: record.role });
//                 setIsPromoteUserModalVisible(true);
//               }}
//             />
//           </Tooltip>
  
//           <Popconfirm
//             title={`${record.isActive ? 'Block' : 'Activate'} this user?`}
//             onConfirm={() =>
//               updateUserStatusMutation.mutate({
//                 userId: record._id, // use _id here
//                 status: record.isActive ? 'blocked' : 'active',
//               })
//             }
//             okText="Yes"
//             cancelText="No"
//           >
//             <Tooltip title={record.isActive ? 'Block User' : 'Activate User'}>
//               <Button
//                 type="text"
//                 size="small"
//                 icon={record.isActive ? <LockOutlined /> : <UnlockOutlined />}
//                 danger={record.isActive}
//               />
//             </Tooltip>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];
  
//   // Show loading spinner if fetching
//   if (statsLoading || healthLoading || usersLoading || approvalsLoading) {
//     return (
//       <div style={{ textAlign: 'center', padding: 50 }}>
//         <Spin size="large" />
//         <div style={{ marginTop: 16 }}>Loading admin dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Breadcrumbs />

//       <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
//   <Col span={6}>
//     <Card>
//       <Statistic
//         title="Total Users"
//         value={stats?.totalUsers ?? 0}
//         prefix={<UserOutlined />}
//         valueStyle={{ color: '#1890ff' }}
//       />
//     </Card>
//   </Col>
//   <Col span={6}>
//     <Card>
//       <Statistic
//         title="Students"
//         value={stats?.students ?? 0}    // <-- Your backend should send these role counts
//         prefix={<UserOutlined />}
//         valueStyle={{ color: '#52c41a' }}
//       />
//     </Card>
//   </Col>
//   <Col span={6}>
//     <Card>
//       <Statistic
//         title="Instructors"
//         value={stats?.instructors ?? 0}
//         prefix={<BookOutlined />}
//         valueStyle={{ color: '#1890ff' }}
//       />
//     </Card>
//   </Col>
//   <Col span={6}>
//     <Card>
//       <Statistic
//         title="Content Managers"
//         value={stats?.contentManagers ?? 0}
//         prefix={<SettingOutlined />}
//         valueStyle={{ color: '#722ed1' }}
//       />
//     </Card>
//   </Col>
// </Row>

//       <Card title="System Health Monitoring" style={{ marginBottom: 24 }}>
//         <Row gutter={[16, 16]}>
//           <Col span={6}>
//             <Card size="small">
//               <Statistic
//                 title="Server Status"
//                 value={systemHealth?.serverStatus || 0}
//                 suffix="%"
//                 valueStyle={{ color: (systemHealth?.serverStatus || 0) === 100 ? '#3f8600' : '#cf1322' }}
//               />
//               <Progress
//                 percent={systemHealth?.serverStatus || 0}
//                 strokeColor={(systemHealth?.serverStatus || 0) === 100 ? '#3f8600' : '#cf1322'}
//                 showInfo={false}
//                 size="small"
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card size="small">
//               <Statistic
//                 title="API Response Time"
//                 value={systemHealth?.apiResponseTime || 0}
//                 suffix="ms"
//                 valueStyle={{ color: (systemHealth?.apiResponseTime || 0) < 500 ? '#3f8600' : '#faad14' }}
//               />
//               <Progress
//                 percent={Math.min(((systemHealth?.apiResponseTime || 0) / 1000) * 100, 100)}
//                 strokeColor={(systemHealth?.apiResponseTime || 0) < 500 ? '#3f8600' : '#faad14'}
//                 showInfo={false}
//                 size="small"
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card size="small">
//               <Statistic
//                 title="Database Status"
//                 value={systemHealth?.databaseStatus || 0}
//                 suffix="ms"
//                 valueStyle={{ color: (systemHealth?.databaseStatus || 0) < 100 ? '#3f8600' : '#faad14' }}
//               />
//               <Progress
//                 percent={Math.min(((systemHealth?.databaseStatus || 0) / 200) * 100, 100)}
//                 strokeColor={(systemHealth?.databaseStatus || 0) < 100 ? '#3f8600' : '#faad14'}
//                 showInfo={false}
//                 size="small"
//               />
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card size="small">
//               <Statistic
//                 title="Error Rate"
//                 value={systemHealth?.errorRate || 0}
//                 suffix="%"
//                 valueStyle={{ color: (systemHealth?.errorRate || 0) < 5 ? '#3f8600' : '#cf1322' }}
//               />
//               <Progress
//                 percent={systemHealth?.errorRate || 0}
//                 strokeColor={(systemHealth?.errorRate || 0) < 5 ? '#3f8600' : '#cf1322'}
//                 showInfo={false}
//                 size="small"
//               />
//             </Card>
//           </Col>
//         </Row>
//       </Card>

//       <Card
//       title={
//         <Space>
//           <TeamOutlined />
//           User Management
//         </Space>
//       }
//       extra={
//         <Space>
//           <Search
//             placeholder="Search users..."
//             allowClear
//             style={{ width: 300 }}
//             onChange={e => setSearchText(e.target.value)}
//           />
//           <Button
//             type="primary"
//             icon={<UserAddOutlined />}
//             onClick={() => setIsCreateUserModalVisible(true)}
//           >
//             Create User
//           </Button>
//         </Space>
//       }
//       style={{ marginBottom: 24 }}
//     >
//       <Table
//         columns={userColumns}
//         dataSource={filteredUsers}
//         rowKey="_id" // ensure you use _id from backend
//         rowSelection={{
//           selectedRowKeys,
//           onChange: setSelectedRowKeys,
//         }}
//         pagination={{
//           pageSize: 10,
//           showSizeChanger: true,
//           showQuickJumper: true,
//           showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
//         }}
//       />
//     </Card>

//       {/* Course Approval Section */}
//       <Card
//         title={
//           <Space>
//             <BookOutlined />
//             Course Approvals
//           </Space>
//         }
//         style={{ marginBottom: 24 }}
//       >
//         {courseApprovals && courseApprovals.length > 0 ? (
//           <Table
//             columns={[
//               {
//                 title: 'Course',
//                 key: 'course',
//                 render: (_, record) => (
//                   <Space>
//                     <Avatar src={record.imageUrl} icon={<BookOutlined />} />
//                     <div>
//                       <div style={{ fontWeight: 'bold' }}>{record.title}</div>
//                       <div style={{ fontSize: 12, color: '#666' }}>by {record.instructor}</div>
//                     </div>
//                   </Space>
//                 ),
//               },
//               {
//                 title: 'Description',
//                 dataIndex: 'description',
//                 key: 'description',
//                 render: (description: string) => (
//                   <Text ellipsis={{ tooltip: description }} style={{ maxWidth: 300 }}>
//                     {description}
//                   </Text>
//                 ),
//               },
//               {
//                 title: 'Actions',
//                 key: 'actions',
//                 render: (_, record) => (
//                   <Space>
//                     <Button
//                       type="primary"
//                       size="small"
//                       icon={<CheckOutlined />}
//                       onClick={() => approveCourseMutation.mutate(record.id)}
//                       loading={approveCourseMutation.isLoading}
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       danger
//                       size="small"
//                       onClick={() => {
//                         // Add reject functionality here
//                         message.info('Reject functionality coming soon');
//                       }}
//                     >
//                       Reject
//                     </Button>
//                   </Space>
//                 ),
//               },
//             ]}
//             dataSource={courseApprovals}
//             rowKey="id"
//             pagination={false}
//           />
//         ) : (
//           <div style={{ textAlign: 'center', padding: '40px' }}>
//             <BookOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
//             <Text type="secondary">No pending course approvals</Text>
//           </div>
//         )}
//       </Card>

//       {/* Create User Modal */}
//       <Modal
//         title="Create New User"
//         open={isCreateUserModalVisible}
//         onCancel={() => {
//           setIsCreateUserModalVisible(false);
//           createUserForm.resetFields();
//         }}
//         footer={null}
//         width={600}
//       >
//         <Form
//           form={createUserForm}
//           layout="vertical"
//           onFinish={(values) => {
//             console.log('Create User form submitted with:', values);
//             createUserMutation.mutate(values);
//           }}
//         >
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 label="First Name"
//                 name="firstName"
//                 rules={[{ required: true, message: 'Please enter first name' }]}
//               >
//                 <Input placeholder="Enter first name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 label="Last Name"
//                 name="lastName"
//                 rules={[{ required: true, message: 'Please enter last name' }]}
//               >
//                 <Input placeholder="Enter last name" />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: 'Please enter email' },
//               { type: 'email', message: 'Please enter a valid email' }
//             ]}
//           >
//             <Input placeholder="Enter email address" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               { required: true, message: 'Please enter password' },
//               { min: 8, message: 'Password must be at least 8 characters' }
//             ]}
//           >
//             <Input.Password placeholder="Enter password" />
//           </Form.Item>

//           <Form.Item
//             label="Role"
//             name="role"
//             rules={[{ required: true, message: 'Please select a role' }]}
//           >
//             <Select placeholder="Select role">
//               <Option value="student">Student</Option>
//               <Option value="instructor">Instructor</Option>
//               <Option value="content-manager">Content Manager</Option>
//               <Option value="admin">Admin</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
//             <Space>
//               <Button onClick={() => {
//                 setIsCreateUserModalVisible(false);
//                 createUserForm.resetFields();
//               }}>
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={createUserMutation.isLoading} // Fix here (was isPending)
//               >
//                 Create User
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Promote User Modal */}
//       <Modal
//         title={`Promote User: ${selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''}`}
//         open={isPromoteUserModalVisible}
//         onCancel={() => {
//           setIsPromoteUserModalVisible(false);
//           setSelectedUser(null);
//           promoteUserForm.resetFields();
//         }}
//         footer={null}
//         width={500}
//       >
//         <Form
//           form={promoteUserForm}
//           layout="vertical"
//           onFinish={(values) => {
//             if (selectedUser) {
//               console.log('Selected user:', selectedUser);
//               promoteUserMutation.mutate({ userId: selectedUser._id, newRole: values.newRole });
//             }
//           }}
//         >
//           <Form.Item
//             label="New Role"
//             name="newRole"
//             rules={[{ required: true, message: 'Please select a role' }]}
//           >
//             <Select placeholder="Select new role">
//               <Option value="student">Student</Option>
//               <Option value="instructor">Instructor</Option>
//               <Option value="content-manager">Content Manager</Option>
//               <Option value="admin">Admin</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
//             <Space>
//               <Button onClick={() => {
//                 setIsPromoteUserModalVisible(false);
//                 setSelectedUser(null);
//                 promoteUserForm.resetFields();
//               }}>
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={promoteUserMutation.isLoading}
//               >
//                 Promote
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AdminDashboard;

