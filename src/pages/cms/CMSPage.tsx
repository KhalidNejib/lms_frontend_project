import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, message, Spin } from "antd";
import CMSForm from "../../components/forms/ContentForm";
import CMSPageTable from "./CMSPageTable";
import axios from "axios";
 import type { CMSPage as PageType } from "../../types/CMSPage";

const { Title } = Typography;

const CMSPage: React.FC = () => {
  const [editingPage, setEditingPage] = useState<PageType | null>(null);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<PageType[]>([]);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/content");
      setPages(data);
    } catch {
      message.error("Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleEdit = (page: PageType) => setEditingPage(page);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/content/${id}`);
      message.success("Page deleted");
      fetchPages();
    } catch {
      message.error("Delete failed");
    }
  };

  const handleSubmit = async (values: PageType) => {
    try {
      if (editingPage) {
        await axios.put(`http://localhost:5000/api/content/${editingPage._id}`, values);
        message.success("Page updated");
      } else {
        await axios.post("http://localhost:5000/api/content", values);
        message.success("Page created");
      }
      setEditingPage(null);
      fetchPages();
    } catch {
      message.error("Submit failed");
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} md={8}>
        <Card title={<Title level={4}>{editingPage ? "Edit Page" : "Create Page"}</Title>}>
          <CMSForm onSubmit={handleSubmit} initialValues={editingPage} onCancel={() => setEditingPage(null)} />
        </Card>
      </Col>
      <Col xs={24} md={16}>
        <Card title={<Title level={4}>CMS Pages</Title>}>
          {loading ? <Spin /> : <CMSPageTable pages={pages} onEdit={handleEdit} onDelete={handleDelete} />}
        </Card>
      </Col>
    </Row>
  );
};

export default CMSPage;
