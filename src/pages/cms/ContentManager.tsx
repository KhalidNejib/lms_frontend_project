import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import Layout from '../../components/common/Layout'
import ContentForm from '../../components/forms/ContentForm';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const ContentManager: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const { content, uploadFile, fetchContent, createContent } = useContent();

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'course', label: 'Course' },
    { key: 'status', label: 'Status' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_value: any, _row: any) => (
        <div className="btn-group" role="group">
          <button className="btn btn-sm btn-outline-primary">Edit</button>
          <button className="btn btn-sm btn-outline-danger">Delete</button>
        </div>
      ),
    },
  ];

  const handleSubmit = async (contentData: any) => {
    try {
      // If file is present, upload it first
      let fileUrl = undefined;
      if (contentData.file) {
        const uploadResult = await uploadFile(contentData.file, contentData.type || 'document');
        fileUrl = uploadResult?.url || uploadResult?.fileUrl;
      }
      // Prepare data for content creation (add fileUrl if present)
      const payload = { ...contentData };
      if (fileUrl) payload.fileUrl = fileUrl;
      // Save metadata and fileUrl to backend (MongoDB)
      await createContent(payload);
      fetchContent();
      setShowModal(false);
      setEditingContent(null);
    } catch (err) {
      // handle error (show notification, etc.)
      console.error('Error uploading/creating content:', err);
    }
  };

  const handleEdit = (content: any) => {
    setEditingContent(content);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2">Content Manager</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Content
          </button>
        </div>

        <div className="card shadow">
          <div className="card-header">
            <h5 className="card-title mb-0">All Content</h5>
          </div>
          <div className="card-body">
            <DataTable
              data={content}
              columns={columns}
              onRowClick={handleEdit}
              striped
              hover
              bordered
            />
          </div>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingContent(null);
          }}
          title={editingContent ? 'Edit Content' : 'Add New Content'}
          size="lg"
        >
          <ContentForm
            onSubmit={handleSubmit}
            initialValues={editingContent}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default ContentManager; 