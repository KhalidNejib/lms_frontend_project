import React, { useState } from 'react';
import { Layout, Table, Button, Modal, message, Spin, Form, Input, Select, Upload as AntdUpload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useContent } from '../../hooks/useContent';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';

const { Content } = Layout;
const { Option } = Select;

const ContentManager: React.FC = () => {
  const {
    content,
    isLoading,
    error,
    createContent,
    updateContent,
    deleteContent,
    fetchContent,
  } = useContent();

  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [form] = Form.useForm();
  const [editorVisible, setEditorVisible] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Course', dataIndex: 'courseId', key: 'courseId' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={e => {
              e.stopPropagation();
              handleEdit(record);
            }}
          >Edit</Button>
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            onClick={e => {
              e.stopPropagation();
              handleDelete(record.id);
            }}
          >Delete</Button>
        </>
      ),
    },
  ];

  const handleSubmit = async (values: any) => {
    setActionLoading(true);
    try {
      if (editingContent) {
        await updateContent(editingContent.id, values);
        message.success('Content updated successfully!');
      } else {
        await createContent(values);
        message.success('Content created successfully!');
      }
      setShowModal(false);
      setEditingContent(null);
      fetchContent();
      form.resetFields();
    } catch (err) {
      message.error('Operation failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (content: any) => {
    setEditingContent(content);
    setShowModal(true);
    form.setFieldsValue(content);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this content?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        setActionLoading(true);
        try {
          await deleteContent(id);
          message.success('Content deleted successfully!');
          fetchContent();
        } catch (err) {
          message.error('Delete failed.');
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  const handleAdd = () => {
    setShowModal(true);
    setEditingContent(null);
    form.resetFields();
  };

  // Drag-and-drop sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Add block
  const handleAddBlock = (type: string) => {
    setBlocks([...blocks, { id: uuidv4(), type, content: '' }]);
  };

  // Drag-and-drop handlers
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  // Block content editing
  const handleBlockChange = (id: string, value: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: value } : b));
  };

  // Image block upload
  const handleImageUpload = (id: string, file: any) => {
    // For demo, just use local preview
    const url = URL.createObjectURL(file);
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: url } : b));
    return false; // Prevent auto upload
  };

  // Save page structure to backend
  const handleSavePage = async () => {
    setSaving(true);
    try {
      // Example: POST to /api/content (adjust as needed)
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks }),
      });
      if (!res.ok) throw new Error('Save failed');
      message.success('Page saved successfully!');
      setEditorVisible(false);
      setBlocks([]);
    } catch (err) {
      message.error('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h1 style={{ margin: 0 }}>Content Manager</h1>
            <div>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginRight: 8 }}>
                Add Content
              </Button>
              <Button onClick={() => setEditorVisible(true)}>
                Open Page Editor
              </Button>
            </div>
          </div>
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <Table
              dataSource={content}
              columns={columns}
              rowKey="id"
              onRow={record => ({
                onClick: () => handleEdit(record),
              })}
              bordered
            />
          )}
          {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
          <Modal
            open={showModal}
            title={editingContent ? 'Edit Content' : 'Add New Content'}
            onCancel={() => {
              setShowModal(false);
              setEditingContent(null);
              form.resetFields();
            }}
            footer={null}
            destroyOnClose
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={editingContent || { type: 'text' }}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Content Title"
                name="title"
                rules={[{ required: true, message: 'Please enter a content title.' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Content Type"
                name="type"
                rules={[{ required: true, message: 'Please select a content type.' }]}
              >
                <Select>
                  <Option value="text">Text</Option>
                  <Option value="video">Video</Option>
                  <Option value="pdf">PDF</Option>
                  <Option value="quiz">Quiz</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please enter content.' }]}
              >
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={actionLoading} block>
                  Save Content
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            open={editorVisible}
            title="Page Editor (Drag-and-Drop)"
            onCancel={() => setEditorVisible(false)}
            footer={null}
            width={800}
          >
            <div style={{ marginBottom: 16 }}>
              <Button onClick={() => handleAddBlock('heading')} style={{ marginRight: 8 }}>Add Heading</Button>
              <Button onClick={() => handleAddBlock('text')} style={{ marginRight: 8 }}>Add Text</Button>
              <Button onClick={() => handleAddBlock('image')}>Add Image</Button>
              <Button type={previewMode ? 'default' : 'primary'} style={{ marginLeft: 16 }} onClick={() => setPreviewMode(!previewMode)}>
                {previewMode ? 'Edit Mode' : 'Live Preview'}
              </Button>
            </div>
            {!previewMode ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  {blocks.map((block, idx) => (
                    <div key={block.id} style={{ marginBottom: 12, padding: 16, border: '1px solid #eee', borderRadius: 6, background: '#fafafa' }}>
                      <strong>{block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block</strong>
                      <div style={{ marginTop: 8 }}>
                        {block.type === 'heading' && (
                          <Input
                            placeholder="Heading text"
                            value={block.content}
                            onChange={e => handleBlockChange(block.id, e.target.value)}
                            style={{ fontWeight: 'bold', fontSize: 18 }}
                          />
                        )}
                        {block.type === 'text' && (
                          <Input.TextArea
                            placeholder="Paragraph text"
                            value={block.content}
                            onChange={e => handleBlockChange(block.id, e.target.value)}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />
                        )}
                        {block.type === 'image' && (
                          <AntdUpload
                            showUploadList={false}
                            beforeUpload={file => handleImageUpload(block.id, file)}
                          >
                            <Button>Upload Image</Button>
                          </AntdUpload>
                        )}
                        {block.type === 'image' && block.content && (
                          <img src={block.content} alt="block" style={{ marginTop: 8, maxWidth: 200, maxHeight: 120, borderRadius: 4 }} />
                        )}
                      </div>
                    </div>
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <div style={{ background: '#f6f6f6', padding: 16, borderRadius: 8 }}>
                {blocks.map((block, idx) => (
                  <div key={block.id} style={{ marginBottom: 18 }}>
                    {block.type === 'heading' && (
                      <h2>{block.content}</h2>
                    )}
                    {block.type === 'text' && (
                      <p>{block.content}</p>
                    )}
                    {block.type === 'image' && block.content && (
                      <img src={block.content} alt="block" style={{ maxWidth: 300, maxHeight: 180, borderRadius: 4 }} />
                    )}
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Button type="primary" onClick={handleSavePage} loading={saving} disabled={blocks.length === 0}>
                Save Page
              </Button>
            </div>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default ContentManager; 