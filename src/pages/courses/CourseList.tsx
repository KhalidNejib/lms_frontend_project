import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Checkbox,
  Input,
  Rate,
  Empty,
  Spin,
  Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./CourseList.css";

const { Meta } = Card;
const CheckboxGroup = Checkbox.Group;

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  category: string;
  instructor: string;
  price: string;
  rating: number;
  level: string;
}

const dummyCourses: Course[] = [
  {
    id: "1",
    title: "React for Beginners",
    thumbnail: "https://reactjs.org/logo-og.png",
    description: "Learn React from scratch with JSX, props, state, and hooks.",
    category: "Frontend",
    instructor: "Jane Doe",
    price: "Free",
    rating: 4.5,
    level: "Beginner",
  },
  {
    id: "2",
    title: "Advanced Node.js",
    thumbnail: "https://nodejs.org/static/images/logo.svg",
    description: "Master Node.js backend development with Express and MongoDB.",
    category: "Backend",
    instructor: "John Smith",
    price: "Paid",
    rating: 4.7,
    level: "Advanced",
  },
  {
    id: "3",
    title: "UI/UX Design Principles",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    description: "Understand the basics of creating intuitive and clean designs.",
    category: "Design",
    instructor: "Emily Lee",
    price: "Free",
    rating: 4.2,
    level: "Beginner",
  },
  {
    id: "4",
    title: "Python for Data Science",
    thumbnail: "https://www.python.org/static/community_logos/python-logo.png",
    description: "Use Python for analysis, visualization, and machine learning.",
    category: "Data Science",
    instructor: "Mike Chen",
    price: "Paid",
    rating: 4.8,
    level: "Intermediate",
  },
  {
    id: "5",
    title: "Advanced CSS Animations",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    description: "Create professional web animations using CSS and keyframes.",
    category: "Frontend",
    instructor: "Jane Doe",
    price: "Paid",
    rating: 4.4,
    level: "Advanced",
  },
  {
    id: "6",
    title: "Intro to Machine Learning",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/4b/ML_logo.svg",
    description: "Discover the basics of machine learning algorithms and models.",
    category: "Data Science",
    instructor: "Emily Lee",
    price: "Free",
    rating: 4.3,
    level: "Beginner",
  },
  {
    id: "7",
    title: "Full-Stack JavaScript",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    description: "Build complete web apps using Node.js, Express, and React.",
    category: "Backend",
    instructor: "John Smith",
    price: "Paid",
    rating: 4.6,
    level: "Intermediate",
  },
  {
    id: "8",
    title: "Intro to HTML & CSS",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    description: "Learn how to create basic webpages using HTML5 and CSS3.",
    category: "Frontend",
    instructor: "Mike Chen",
    price: "Free",
    rating: 4.1,
    level: "Beginner",
  },
  {
    id: "9",
    title: "Java Programming Basics",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    description: "Start coding in Java with variables, loops, and OOP concepts.",
    category: "Backend",
    instructor: "Jane Doe",
    price: "Free",
    rating: 4.2,
    level: "Beginner",
  },
  {
    id: "10",
    title: "Data Visualization with D3.js",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/4f/D3js-logo.svg",
    description: "Learn to build stunning data visuals using the D3.js library.",
    category: "Frontend",
    instructor: "Emily Lee",
    price: "Paid",
    rating: 4.5,
    level: "Advanced",
  },
  {
    id: "11",
    title: "Designing with Adobe XD",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg",
    description: "Design interactive prototypes and wireframes with Adobe XD.",
    category: "Design",
    instructor: "John Smith",
    price: "Paid",
    rating: 4.3,
    level: "Intermediate",
  },
  {
    id: "12",
    title: "SQL for Data Analysis",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
    description: "Query databases and gain insights using SQL statements.",
    category: "Data Science",
    instructor: "Mike Chen",
    price: "Free",
    rating: 4.6,
    level: "Intermediate",
  },
];

const categories = ["Frontend", "Backend", "Design", "Data Science"];
const instructors = ["Jane Doe", "John Smith", "Emily Lee", "Mike Chen"];
const prices = ["Free", "Paid"];
const levels = ["Beginner", "Intermediate", "Advanced"];

const CourseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCourses(dummyCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      (selectedCategories.length === 0 || selectedCategories.includes(course.category)) &&
      (selectedInstructors.length === 0 || selectedInstructors.includes(course.instructor)) &&
      (selectedPrice.length === 0 || selectedPrice.includes(course.price)) &&
      (selectedRating === null || course.rating >= selectedRating) &&
      (selectedLevel.length === 0 || selectedLevel.includes(course.level))
    );
  });

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  return (
    <div className="course-list-wrapper">
  <Input
    prefix={<SearchOutlined />}
    placeholder="Search courses..."
    allowClear
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{ maxWidth: 400, marginBottom: 24 }}
  />

  <Row gutter={[16, 16]}>
    {/* Course Cards Section */}
    <Col xs={24} md={18} lg={19}>  {/* Take up more space for cards */}
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "40px auto" }} />
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {paginatedCourses.length === 0 ? (
              <Col span={24}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span style={{ fontSize: 18 }}>No courses found matching your criteria.</span>}
                  style={{
                    padding: "60px 0",
                    textAlign: "center",
                    margin: "100px auto",
                    transform: "scale(1.2)",
                  }}
                />
              </Col>
            ) : (
              paginatedCourses.map((course, i) => (
                <Col
                  xs={24}  // Take full width (1 per row)
                  sm={12}   // 2 cards per row on small screens
                  md={12}   // 2 cards per row on medium screens
                  lg={12}   // 2 cards per row on large screens
                  key={course.id}
                  className={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                >
                  <Card
                    className="custom-card"
                    hoverable
                    cover={
                      <div className="thumbnail-wrapper">
                        <img src={course.thumbnail} alt={course.title} />
                        <span className="badge">{course.category}</span>
                      </div>
                    }
                  >
                    <Meta title={course.title} description={course.description} />
                    <div style={{ marginTop: 12 }}>
                      <p><strong style={{ fontSize: 15 }}>Instructor:</strong> {course.instructor}</p>
                      <p><strong style={{ fontSize: 15 }}>Price:</strong> {course.price}</p>
                      <Rate allowHalf disabled value={course.rating} />
                    </div>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          {filteredCourses.length > coursesPerPage && (
            <Pagination
              current={currentPage}
              pageSize={coursesPerPage}
              total={filteredCourses.length}
              onChange={setCurrentPage}
              style={{ textAlign: "center", marginTop: 24 }}
            />
          )}
        </>
      )}
    </Col>

    {/* Filter Panel Section (Right) */}
    <Col xs={24} md={6} lg={5}>  {/* Right-most, smaller column for filters */}
      <div className="filter-panel">
        <h4>Course Filters</h4>

        <div className="filter-section">
          <h5>Category</h5>
          <CheckboxGroup
            className="filter-checkbox-group"
            options={categories}
            onChange={(val) => setSelectedCategories(val as string[])}
            value={selectedCategories}
          />
        </div>

        <div className="filter-section">
          <h5>Instructor</h5>
          <CheckboxGroup
            className="filter-checkbox-group"
            options={instructors}
            onChange={(val) => setSelectedInstructors(val as string[])}
            value={selectedInstructors}
          />
        </div>

        <div className="filter-section">
          <h5>Price</h5>
          <CheckboxGroup
            className="filter-checkbox-group"
            options={prices}
            onChange={(val) => setSelectedPrice(val as string[])}
            value={selectedPrice}
          />
        </div>

        <div className="filter-section">
          <h5>Minimum Rating</h5>
          <Rate
            allowHalf
            value={selectedRating || 0}
            onChange={(val) => setSelectedRating(val)}
          />
        </div>

        <div className="filter-section">
          <h5>Level</h5>
          <CheckboxGroup
            className="filter-checkbox-group"
            options={levels}
            onChange={(val) => setSelectedLevel(val as string[])}
            value={selectedLevel}
          />
        </div>
      </div>
    </Col>
  </Row>
</div>

  );
};

export default CourseList;
