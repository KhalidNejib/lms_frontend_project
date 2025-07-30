import React, { useState } from "react";
import {
  Upload,
  Button,
  Card,
  Image,
  message,
  Table,
  Tabs,
 // Popover,
  //Space,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";

const { Title } = Typography;
const { TabPane } = Tabs;

const MediaManager: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUploadChange = async ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    try {
      setLoading(true);
      await axios.post("/upload", formData);
      message.success("Upload successful");
      setFileList([]);
      fetchUploadedMedia();
    } catch (error) {
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedMedia = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/upload/list");
      setUploadedMedia(res.data);
    } catch (error) {
      message.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUploadedMedia();
  }, []);

  const columns = [
    {
      title: "Preview",
      dataIndex: "url",
      key: "preview",
      render: (url: string) => <Image width={100} src={url} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <Card title={<Title level={4}>Media Manager</Title>}>
      <Tabs defaultActiveKey="upload">
        <TabPane tab="Upload Media" key="upload">
          <Upload.Dragger
            multiple
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            style={{ marginBottom: 16 }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to upload</p>
          </Upload.Dragger>
          <Button type="primary" onClick={handleUpload} loading={loading} disabled={!fileList.length}>
            Upload
          </Button>
        </TabPane>
        <TabPane tab="Uploaded Media" key="media">
          <Table
            dataSource={uploadedMedia}
            columns={columns}
            rowKey="id"
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default MediaManager;
