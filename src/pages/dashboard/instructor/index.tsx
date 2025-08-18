// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   List,
//   Button,
//   Typography,
//   Row,
//   Col,
//   Spin,
//   Alert,
//   Avatar,
//   Statistic,
//   Space,
//   Tooltip,
//   Rate,
//   Tag,
//   Table,
//   Badge,

// } from "antd";
// import {
//   PlayCircleOutlined,
//   BookOutlined,
//   ClockCircleOutlined,
//   TrophyOutlined,
//   PlusOutlined,
//   EyeOutlined,
//   EditOutlined,
//   BarChartOutlined,
//   TeamOutlined,
//   FileTextOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import { Column } from "@ant-design/charts";
// import Breadcrumbs from "../../../components/DashboardUi/Breadcrumbs";
// import { useAppSelector, useAppDispatch } from "../../../store/hooks";
// import {
//   fetchInstructorProfile,
//   fetchInstructorStats,
//   fetchInstructorCourses,
//   fetchEnrollmentTrends,
//   fetchAssessmentResults,
//   fetchInstructorActivities,
// } from "../../../store/slices/instructorSlice";

// const { Title, Text } = Typography;

// const InstructorDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const {
//     profile,
//     stats,
//     courses,
//     enrollmentTrends,
//     assessmentResults,
//     activities,
//     loading,
//     error,
//   } = useAppSelector((state: any) => state.instructor);

//   useEffect(() => {
//     dispatch(fetchInstructorProfile("1"));
//     dispatch(fetchInstructorStats("1"));
//     dispatch(fetchInstructorCourses("1"));
//     dispatch(fetchEnrollmentTrends("1"));
//     dispatch(fetchAssessmentResults("1"));
//     dispatch(fetchInstructorActivities("1"));
//   }, [dispatch]);

//   // ---------------- Handle Course Actions ----------------
//   const handleCourseClick = (courseId: string) => navigate(`/courses/${courseId}`);
//   const handleCreateCourse = () => navigate("/courses/create");
//   const handleViewAnalytics = (courseId: string) => navigate(`/courses/${courseId}/analytics`);
//   const handleEditCourse = (courseId: string) => navigate(`/courses/${courseId}/edit`);

//   // Submit a draft course for admin approval
//   const handleSubmitForApproval = async (courseId: string) => {
//     try {
//       const res = await fetch(`/api/courses/${courseId}/submit`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//       });
//       if (res.ok) {
//         // Refetch courses to update UI
//         dispatch(fetchInstructorCourses("1"));
//       } else {
//         const data = await res.json();
//         console.error("Error submitting for approval:", data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <Spin size="large" />
//         <div style={{ marginTop: "16px" }}>Loading instructor dashboard...</div>
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
//         style={{ margin: "24px" }}
//       />
//     );
//   }

//   // Compute enrollment growth
//   const enrollmentWithGrowth = enrollmentTrends.map((trend: any, index: number) => {
//     const prevEnrollments = index > 0 ? enrollmentTrends[index - 1].enrollments : 0;
//     const growth = prevEnrollments
//       ? Math.round(((trend.enrollments - prevEnrollments) / prevEnrollments) * 100)
//       : 0;
//     return { ...trend, growth };
//   });

//   const enrollmentChartConfig = {
//     data: enrollmentWithGrowth,
//     xField: "month",
//     yField: "enrollments",
//     columnWidthRatio: 0.5,
//     color: ({ growth }: any) => (growth >= 0 ? "#52c41a" : "#f5222d"),
//     label: { position: "top", style: { fill: "#595959", fontSize: 12 } },
//     xAxis: { label: { autoHide: true } },
//     tooltip: {
//       formatter: (datum: any) => ({
//         name: "Enrollments",
//         value: `${datum.enrollments} (${datum.growth >= 0 ? "+" : ""}${datum.growth}%)`,
//       }),
//     },
//   };

//   // Helper to display status tag with colors
//   const renderStatusTag = (status: string) => {
//     let color = "default";
//     switch (status.toLowerCase()) {
//       case "draft":
//         color = "orange";
//         break;
//       case "pending":
//         color = "blue";
//         break;
//       case "approved":
//         color = "green";
//         break;
//       case "rejected":
//         color = "red";
//         break;
//       default:
//         color = "default";
//     }
//     return <Tag color={color}>{status}</Tag>;
//   };

//   return (
//     <div style={{ padding: "24px" }}>
//       <Breadcrumbs />

//       <Title level={3} style={{ marginBottom: "24px" }}>
//         Welcome Back, {profile?.name?.split(" ")[0] || "Instructor"}
//       </Title>

//       {/* Stats Overview */}
//       <Card
//         title={
//           <Row justify="space-between" align="middle">
//             <Title level={4} style={{ margin: 0, color: "#1a365d" }}>
//               Instructor Overview
//             </Title>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={handleCreateCourse}
//               style={{ backgroundColor: "#ff6b35", borderColor: "#ff6b35" }}
//             >
//               Create New Course
//             </Button>
//           </Row>
//         }
//         style={{ marginBottom: "24px", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
//       >
//         <Row gutter={16}>
//           <Col span={6}>
//             <Statistic
//               title="Total Courses"
//               value={stats?.totalCourses || 0}
//               prefix={<BookOutlined style={{ color: "#1890ff", fontSize: 20 }} />}
//               valueStyle={{ color: "#1890ff" }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Total Students"
//               value={stats?.totalEnrollments || 0}
//               prefix={<TeamOutlined style={{ color: "#52c41a", fontSize: 20 }} />}
//               valueStyle={{ color: "#52c41a" }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Active Courses"
//               value={stats?.activeCourses || 0}
//               prefix={<PlayCircleOutlined style={{ color: "#faad14", fontSize: 20 }} />}
//               valueStyle={{ color: "#faad14" }}
//             />
//           </Col>
//           <Col span={6}>
//             <Statistic
//               title="Total Revenue"
//               value={stats?.totalRevenue || 0}
//               prefix="$"
//               valueStyle={{ color: "#3f8600" }}
//             />
//           </Col>
//         </Row>
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
//         style={{ marginBottom: "24px" }}
//       >
//         {courses && courses.length > 0 ? (
//           <Row gutter={[16, 16]}>
//             {courses.map((course: any) => (
//               <Col key={course.id} xs={24} sm={24} md={12} lg={12} xl={8}>
//                 <Card
//                   hoverable
//                   cover={
//                     <div
//                       style={{
//                         height: "150px",
//                         backgroundColor: "#f0f0f0",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <BookOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
//                     </div>
//                   }
//                   actions={[
//                     <Space wrap style={{ width: "100%", justifyContent: "center" }}>
//                       <Tooltip title="View Course">
//                         <Button
//                           type="primary"
//                           icon={<EyeOutlined />}
//                           onClick={() => handleCourseClick(course.id)}
//                         >
//                           View
//                         </Button>
//                       </Tooltip>
//                       <Tooltip title="View Analytics">
//                         <Button icon={<BarChartOutlined />} onClick={() => handleViewAnalytics(course.id)}>
//                           Analytics
//                         </Button>
//                       </Tooltip>
//                       <Tooltip title="Edit Course">
//                         <Button icon={<EditOutlined />} onClick={() => handleEditCourse(course.id)}>
//                           Edit
//                         </Button>
//                       </Tooltip>
//                       {course.status.toLowerCase() === "draft" && (
//                         <Tooltip title="Submit this draft course for approval">
//                           <Button
//                             type="dashed"
//                             icon={<UploadOutlined />}
//                             onClick={() => handleSubmitForApproval(course.id)}
//                           >
//                             Submit for Approval
//                           </Button>
//                         </Tooltip>
//                       )}
//                     </Space>,
//                   ]}
//                 >
//                   <Card.Meta
//                     title={
//                       <Tooltip title={course.title}>
//                         <Text strong ellipsis style={{ width: "100%" }}>
//                           {course.title}
//                         </Text>
//                       </Tooltip>
//                     }
//                     description={
//                       <Space direction="vertical" style={{ width: "100%" }}>
//                         <div>
//                           <Text type="secondary">Status: </Text>
//                           {renderStatusTag(course.status)}
//                         </div>
//                         <div>
//                           <Text type="secondary">Students: {course.studentCount || 0}</Text>
//                         </div>
//                         <div>
//                           <Text type="secondary">Rating: </Text>
//                           {course.rating ? <Rate disabled defaultValue={course.rating} /> : "N/A"}
//                         </div>
//                       </Space>
//                     }
//                   />
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         ) : (
//           <div style={{ textAlign: "center", padding: "40px" }}>
//             <BookOutlined style={{ fontSize: "48px", color: "#d9d9d9", marginBottom: "16px" }} />
//             <Text type="secondary">No courses created yet</Text>
//             <br />
//             <Button type="primary" onClick={handleCreateCourse} style={{ marginTop: "16px" }}>
//               Create Your First Course
//             </Button>
//           </div>
//         )}
//       </Card>

//         {/* Assessment Results */}
//         {assessmentResults && assessmentResults.length > 0 && (
//         <Card
//           title={
//             <Space>
//               <TrophyOutlined />
//               <Title level={4} style={{ margin: 0 }}>
//                 Recent Assessment Results
//               </Title>
//             </Space>
//           }
//           style={{ marginBottom: "24px" }}
//         >
//           <Table
//             dataSource={assessmentResults}
//             columns={[
//               { title: "Course", dataIndex: "courseName", key: "courseName" },
//               { title: "Assessment", dataIndex: "assessmentName", key: "assessmentName" },
//               {
//                 title: "Average Score",
//                 dataIndex: "averageScore",
//                 key: "averageScore",
//                 render: (score) => `${score}%`,
//               },
//               { title: "Students", dataIndex: "studentCount", key: "studentCount" },
//               {
//                 title: "Status",
//                 dataIndex: "status",
//                 key: "status",
//                 render: (status) => <Badge status={status === "Completed" ? "success" : "processing"} text={status} />,
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
//         {activities && activities.length > 0 ? (
//           <List
//             dataSource={activities}
//             renderItem={(activity: any) => (
//               <List.Item>
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar
//                       icon={
//                         activity.type === "course"
//                           ? <BookOutlined />
//                           : activity.type === "assessment"
//                           ? <FileTextOutlined />
//                           : activity.type === "student"
//                           ? <TeamOutlined />
//                           : <ClockCircleOutlined />
//                       }
//                       style={{
//                         backgroundColor:
//                           activity.type === "course"
//                             ? "#1890ff"
//                             : activity.type === "assessment"
//                             ? "#52c41a"
//                             : activity.type === "student"
//                             ? "#faad14"
//                             : "#722ed1",
//                       }}
//                     />
//                   }
//                   title={activity.title}
//                   description={
//                     <Space>
//                       <Text type="secondary">{activity.timeAgo}</Text>
//                       <Tag
//                         color={
//                           activity.type === "course"
//                             ? "blue"
//                             : activity.type === "assessment"
//                             ? "green"
//                             : activity.type === "student"
//                             ? "orange"
//                             : "purple"
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
//           <div style={{ textAlign: "center", padding: "40px" }}>
//             <ClockCircleOutlined style={{ fontSize: "48px", color: "#d9d9d9", marginBottom: "16px" }} />
//             <Text type="secondary">No recent activities</Text>
//           </div>
//         )}
//       </Card>

//       {/* Enrollment Trends at the Bottom */}
//       {enrollmentWithGrowth.length > 0 && (
//         <Card
//           title="📊 Enrollment Trends (Last 6 Months)"
//           bodyStyle={{ padding: "16px 24px" }}
//           style={{
//             borderRadius: 12,
//             boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
//             marginTop: 24,
//           }}
//         >
//           <div style={{ height: 240 }}>
//             <Column {...enrollmentChartConfig} />
//           </div>
//         </Card>
//       )}
// </div>
//   );
// };

// export default InstructorDashboard;



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  List,
  Button,
  Typography,
  Row,
  Col,
  Spin,
  Alert,
  Avatar,
  Statistic,
  Space,
  Tooltip,
  Rate,
  Tag,
  Table,
  Badge,
  message,
} from "antd";
import {
  PlayCircleOutlined,
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  BarChartOutlined,
  TeamOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Column } from "@ant-design/charts";
import Breadcrumbs from "../../../components/DashboardUi/Breadcrumbs";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  fetchInstructorProfile,
  fetchInstructorStats,
  fetchInstructorCourses,
  fetchEnrollmentTrends,
  fetchAssessmentResults,
  fetchInstructorActivities,
} from "../../../store/slices/instructorSlice";
import { instructorDashboardService } from "../../../services/dashboard.service";

const { Title, Text } = Typography;

const InstructorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    profile,
    stats,
    courses,
    enrollmentTrends,
    assessmentResults,
    activities,
    loading,
    error,
  } = useAppSelector((state: any) => state.instructor);

  useEffect(() => {
    dispatch(fetchInstructorProfile("1"));
    dispatch(fetchInstructorStats("1"));
    dispatch(fetchInstructorCourses("1"));
    dispatch(fetchEnrollmentTrends("1"));
    dispatch(fetchAssessmentResults("1"));
    dispatch(fetchInstructorActivities("1"));
  }, [dispatch]);

  // ---------------- Handle Course Actions ----------------
  const handleCourseClick = (courseId: string) => navigate(`/courses/${courseId}`);
  const handleCreateCourse = () => navigate("/courses/create");
  const handleViewAnalytics = (courseId: string) => navigate(`/courses/${courseId}/analytics`);
  const handleEditCourse = (courseId: string) => navigate(`/courses/${courseId}/edit`);

  // ---------------- Submit Draft Course for Approval ----------------
  const handleSubmitForApproval = async (courseId: string) => {
    try {
      await instructorDashboardService.submitCourseForApproval(courseId);
      dispatch(fetchInstructorCourses("1")); // Refresh course list
      message.success("Course submitted for approval successfully!");
    } catch (err: any) {
      console.error("Error submitting course for approval:", err.message || err);
      message.error("Failed to submit course for approval");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>Loading instructor dashboard...</div>
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
        style={{ margin: "24px" }}
      />
    );
  }

  // Compute enrollment growth
  const enrollmentWithGrowth = enrollmentTrends.map((trend: any, index: number) => {
    const prevEnrollments = index > 0 ? enrollmentTrends[index - 1].enrollments : 0;
    const growth = prevEnrollments
      ? Math.round(((trend.enrollments - prevEnrollments) / prevEnrollments) * 100)
      : 0;
    return { ...trend, growth };
  });

  const enrollmentChartConfig = {
    data: enrollmentWithGrowth,
    xField: "month",
    yField: "enrollments",
    columnWidthRatio: 0.5,
    color: ({ growth }: any) => (growth >= 0 ? "#52c41a" : "#f5222d"),
    label: { position: "top", style: { fill: "#595959", fontSize: 12 } },
    xAxis: { label: { autoHide: true } },
    tooltip: {
      formatter: (datum: any) => ({
        name: "Enrollments",
        value: `${datum.enrollments} (${datum.growth >= 0 ? "+" : ""}${datum.growth}%)`,
      }),
    },
  };

  // Helper to display status tag with colors
  const renderStatusTag = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft": return <Tag color="orange">draft</Tag>;
      case "pending": return <Tag color="blue">pending</Tag>;
      case "approved": return <Tag color="green">approved</Tag>;
      case "rejected": return <Tag color="red">rejected</Tag>;
      default: return <Tag>{status}</Tag>;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Breadcrumbs />

      <Title level={3} style={{ marginBottom: "24px" }}>
        Welcome Back, {profile?.name?.split(" ")[0] || "Instructor"}
      </Title>

      {/* Stats Overview */}
      <Card
        title={
          <Row justify="space-between" align="middle">
            <Title level={4} style={{ margin: 0, color: "#1a365d" }}>
              Instructor Overview
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateCourse}
              style={{ backgroundColor: "#ff6b35", borderColor: "#ff6b35" }}
            >
              Create New Course
            </Button>
          </Row>
        }
        style={{ marginBottom: "24px", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="Total Courses"
              value={stats?.totalCourses || 0}
              prefix={<BookOutlined style={{ color: "#1890ff", fontSize: 20 }} />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Total Students"
              value={stats?.totalEnrollments || 0}
              prefix={<TeamOutlined style={{ color: "#52c41a", fontSize: 20 }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Active Courses"
              value={stats?.activeCourses || 0}
              prefix={<PlayCircleOutlined style={{ color: "#faad14", fontSize: 20 }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Total Revenue"
              value={stats?.totalRevenue || 0}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
            />
          </Col>
        </Row>
      </Card>

      {/* My Courses */}
      <Card
        title={
          <Space>
            <BookOutlined />
            <Title level={4} style={{ margin: 0 }}>
              My Courses
            </Title>
          </Space>
        }
        style={{ marginBottom: "24px" }}
      >
        {courses && courses.length > 0 ? (
          <Row gutter={[16, 16]}>
            {courses.map((course: any) => (
              <Col key={course.id} xs={24} sm={24} md={12} lg={12} xl={8}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: "150px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BookOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
                    </div>
                  }
                  actions={[
                    <Space wrap style={{ width: "100%", justifyContent: "center" }}>
                      <Tooltip title="View Course">
                        <Button
                          type="primary"
                          icon={<EyeOutlined />}
                          onClick={() => handleCourseClick(course.id)}
                        >
                          View
                        </Button>
                      </Tooltip>
                      <Tooltip title="View Analytics">
                        <Button icon={<BarChartOutlined />} onClick={() => handleViewAnalytics(course.id)}>
                          Analytics
                        </Button>
                      </Tooltip>
                      <Tooltip title="Edit Course">
                        <Button icon={<EditOutlined />} onClick={() => handleEditCourse(course.id)}>
                          Edit
                        </Button>
                      </Tooltip>
                      {course.status.toLowerCase() === "draft" && (
                        <Tooltip title="Submit this draft course for approval">
                          <Button
                            type="dashed"
                            icon={<UploadOutlined />}
                            onClick={() => handleSubmitForApproval(course.id)}
                          >
                            Submit for Approval
                          </Button>
                        </Tooltip>
                      )}
                    </Space>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Tooltip title={course.title}>
                        <Text strong ellipsis style={{ width: "100%" }}>
                          {course.title}
                        </Text>
                      </Tooltip>
                    }
                    description={
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <div>
                          <Text type="secondary">Status: </Text>
                          {renderStatusTag(course.status)}
                        </div>
                        <div>
                          <Text type="secondary">Students: {course.studentCount || 0}</Text>
                        </div>
                        <div>
                          <Text type="secondary">Rating: </Text>
                          {course.rating ? <Rate disabled defaultValue={course.rating} /> : "N/A"}
                        </div>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <BookOutlined style={{ fontSize: "48px", color: "#d9d9d9", marginBottom: "16px" }} />
            <Text type="secondary">No courses created yet</Text>
            <br />
            <Button type="primary" onClick={handleCreateCourse} style={{ marginTop: "16px" }}>
              Create Your First Course
            </Button>
          </div>
        )}
      </Card>

      {/* Assessment Results */}
      {assessmentResults && assessmentResults.length > 0 && (
        <Card
          title={
            <Space>
              <TrophyOutlined />
              <Title level={4} style={{ margin: 0 }}>
                Recent Assessment Results
              </Title>
            </Space>
          }
          style={{ marginBottom: "24px" }}
        >
          <Table
            dataSource={assessmentResults}
            columns={[
              { title: "Course", dataIndex: "courseName", key: "courseName" },
              { title: "Assessment", dataIndex: "assessmentName", key: "assessmentName" },
              {
                title: "Average Score",
                dataIndex: "averageScore",
                key: "averageScore",
                render: (score) => `${score}%`,
              },
              { title: "Students", dataIndex: "studentCount", key: "studentCount" },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (status) => <Badge status={status === "Completed" ? "success" : "processing"} text={status} />,
              },
            ]}
            pagination={false}
            size="small"
          />
        </Card>
      )}

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
        {activities && activities.length > 0 ? (
          <List
            dataSource={activities}
            renderItem={(activity: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={
                        activity.type === "course"
                          ? <BookOutlined />
                          : activity.type === "assessment"
                          ? <FileTextOutlined />
                          : activity.type === "student"
                          ? <TeamOutlined />
                          : <ClockCircleOutlined />
                      }
                      style={{
                        backgroundColor:
                          activity.type === "course"
                            ? "#1890ff"
                            : activity.type === "assessment"
                            ? "#52c41a"
                            : activity.type === "student"
                            ? "#faad14"
                            : "#722ed1",
                      }}
                    />
                  }
                  title={activity.title}
                  description={
                    <Space>
                      <Text type="secondary">{activity.timeAgo}</Text>
                      <Tag
                        color={
                          activity.type === "course"
                            ? "blue"
                            : activity.type === "assessment"
                            ? "green"
                            : activity.type === "student"
                            ? "orange"
                            : "purple"
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
          <div style={{ textAlign: "center", padding: "40px" }}>
            <ClockCircleOutlined style={{ fontSize: "48px", color: "#d9d9d9", marginBottom: "16px" }} />
            <Text type="secondary">No recent activities</Text>
          </div>
        )}
      </Card>

      {/* Enrollment Trends */}
      {enrollmentWithGrowth.length > 0 && (
        <Card
          title="📊 Enrollment Trends (Last 6 Months)"
          bodyStyle={{ padding: "16px 24px" }}
          style={{ borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", marginTop: 24 }}
        >
          <div style={{ height: 240 }}>
            <Column {...enrollmentChartConfig} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default InstructorDashboard;






