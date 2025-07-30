import React, { useState, useEffect } from 'react';
import { Layout, Upload, Button, List, Card, Modal, message, Spin } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';

const { Content } = Layout;

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
}

const MediaLibrary: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Fetch uploaded files from backend
  const fetchUploadedFiles = async () => {
    setLoadingFiles(true);
    try {
      const res = await fetch('/api/upload/list');
      if (!res.ok) throw new Error('Failed to fetch uploaded files');
      const data = await res.json();
      setUploadedFiles(data);
    } catch (err) {
      message.error('Could not load uploaded files.');
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const handleChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    fileList.forEach((file: any) => {
      formData.append('files', file.originFileObj);
    });
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      message.success('Files uploaded successfully!');
      setFileList([]);
      fetchUploadedFiles();
    } catch (err) {
      message.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h1 style={{ margin: 0 }}>Media Library</h1>
            <div>
              <Button
                icon={<ReloadOutlined />}
                style={{ marginRight: 8 }}
                onClick={fetchUploadedFiles}
                disabled={loadingFiles}
              >
                Refresh
              </Button>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
              >
                Upload
              </Button>
            </div>
          </div>
          <Upload.Dragger
            multiple
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false} // Prevent auto upload
            listType="picture-card"
            onPreview={handlePreview}
            style={{ marginBottom: 24 }}
          >
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p className="ant-upload-text">Drag & drop files here, or click to select</p>
          </Upload.Dragger>
          <Modal
            open={previewVisible}
            footer={null}
            onCancel={() => setPreviewVisible(false)}
          >
            <img alt="preview" style={{ width: '100%' }} src={previewImage || ''} />
          </Modal>
          <div style={{ marginTop: 32 }}>
            <h3>Uploaded Files</h3>
            {loadingFiles ? (
              <Spin />
            ) : uploadedFiles.length === 0 ? (
              <p className="text-muted">No files uploaded yet.</p>
            ) : (
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={uploadedFiles}
                renderItem={item => (
                  <List.Item>
 <Card
  cover={
    <img alt={item.name} src={item.url} style={{ height: 120, objectFit: 'cover' }} />
  }
  actions={[
    <EyeOutlined
      key="view"
      onClick={() => {
        setPreviewImage(item.url);
        setPreviewVisible(true);
      }}
    />,
    <DeleteOutlined key="delete" />,
  ]}
/>

                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default MediaLibrary; 