import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { List, Spin, Typography } from "antd";

const { Title } = Typography;

interface Lesson {
  _id: string;
  title: string;
  videoUrl: string;
}

export default function CoursePlayer() {
  const { id } = useParams<{ id: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/courses/${id}/lessons`);
        setLessons(response.data);
        if (response.data.length > 0) {
          setCurrentVideoUrl(response.data[0].videoUrl);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <Title level={3}>Course Player</Title>

      {currentVideoUrl && (
        <div style={{ marginBottom: "24px" }}>
          <ReactPlayer url={currentVideoUrl} controls width="100%" />
        </div>
      )}

      <List
        header={<Title level={4}>Lessons</Title>}
        bordered
        dataSource={lessons}
        renderItem={(lesson) => (
          <List.Item
            onClick={() => setCurrentVideoUrl(lesson.videoUrl)}
            style={{ cursor: "pointer" }}
          >
            {lesson.title}
          </List.Item>
        )}
      />
    </div>
  );
}
