import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Spin } from "antd";

interface CourseDetail {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;  // URL to video in Firebase or S3
  pdfUrl: string;    // URL to PDF in cloud storage
}

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !course) return <Spin size="large" />;

  return (
    <Card title={course.title}>
      <p>{course.description}</p>
      <video controls width="100%" src={course.videoUrl} />
      <a href={course.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
    </Card>
  );
}
