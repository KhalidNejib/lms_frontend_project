import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import ContentForm from '../../components/forms/ContentForm';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const ContentManager: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);

  const contentItems = [
    { id: 1, title: 'Introduction to React', type: 'video', course: 'React Fundamentals', status: 'published' },
    { id: 2, title: 'Components and Props', type: 'text', course: 'React Fundamentals', status: 'draft' },
    { id: 3, title: 'State Management', type: 'quiz', course: 'React Fundamentals', status: 'published' },
    { id: 4, title: 'Hooks Tutorial', type: 'video', course: 'Advanced React', status: 'published' },
  ];

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'course', label: 'Course' },
    { key: 'status', label: 'Status' },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, row: any) => (
        <div className="btn-group" role="group">
          <button className="btn btn-sm btn-outline-primary">Edit</button>
          <button className="btn btn-sm btn-outline-danger">Delete</button>
        </div>
      ),
    },
  ];

  const handleSubmit = (contentData: any) => {
    console.log('Content submitted:', contentData);
    setShowModal(false);
    setEditingContent(null);
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
              data={contentItems}
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
            initialData={editingContent}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default ContentManager; 