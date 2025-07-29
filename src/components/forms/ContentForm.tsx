import React, { useState } from 'react';

interface ContentFormProps {
  onSubmit: (contentData: any) => void;
  initialData?: any;
}

const ContentForm: React.FC<ContentFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [type, setType] = useState(initialData?.type || 'text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, type });
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Content Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="invalid-feedback">
          Please enter a content title.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">Content Type</label>
        <select
          className="form-select"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="text">Text</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="quiz">Quiz</option>
        </select>
        <div className="invalid-feedback">
          Please select a content type.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          className="form-control"
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="invalid-feedback">
          Please enter content.
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Save Content
      </button>
    </form>
  );
};

export default ContentForm; 