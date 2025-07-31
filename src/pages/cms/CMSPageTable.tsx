// src/pages/cms/CMSPageTable.tsx
import React from "react";
import { Table, Space, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CMSPage } from "../../types/CMSPage";

interface Props {
  pages: CMSPage[];
  onEdit: (page: CMSPage) => void;
  onDelete: (id: string) => void;
}

const CMSPageTable: React.FC<Props> = ({ pages, onEdit, onDelete }) => {
  const columns: ColumnsType<CMSPage> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "published" ? "green" : "orange"}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record._id!)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={pages} columns={columns} rowKey="_id" />;
};

export default CMSPageTable;
