import React, { useState } from 'react';
import Layout from '../../components/common/Layout';

const MediaLibrary: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const mediaItems = [
    { id: 1, name: 'react-intro.mp4', type: 'video', size: '45.2 MB', uploaded: '2024-01-15' },
    { id: 2, name: 'javascript-basics.pdf', type: 'pdf', size: '2.1 MB', uploaded: '2024-01-14' },
    { id: 3, name: 'ui-design-guide.png', type: 'image', size: '1.8 MB', uploaded: '2024-01-13' },
    { id: 4, name: 'course-overview.mp4', type: 'video', size: '128.5 MB', uploaded: '2024-01-12' },
    { id: 5, name: 'assignment-template.docx', type: 'document', size: '0.5 MB', uploaded: '2024-01-11' },
  ];

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return 'bi bi-camera-video';
      case 'pdf': return 'bi bi-file-pdf';
      case 'image': return 'bi bi-image';
      case 'document': return 'bi bi-file-text';
      default: return 'bi bi-file';
    }
  };

  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2">Media Library</h1>
          <div className="btn-group" role="group">
            <button className="btn btn-primary">
              <i className="bi bi-upload me-2"></i>
              Upload Files
            </button>
            <button className="btn btn-outline-danger" disabled={selectedFiles.length === 0}>
              <i className="bi bi-trash me-2"></i>
              Delete Selected
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="card shadow">
              <div className="card-header">
                <h6 className="card-title mb-0">Filters</h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">File Type</label>
                  <select className="form-select">
                    <option value="">All Types</option>
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Range</label>
                  <input type="date" className="form-control mb-2" />
                  <input type="date" className="form-control" />
                </div>
                <button className="btn btn-outline-primary w-100">Apply Filters</button>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-header">
                <h6 className="card-title mb-0">Media Files</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {mediaItems.map((item) => (
                    <div key={item.id} className="col-md-4 col-lg-3 mb-3">
                      <div className={`card h-100 ${selectedFiles.includes(item.id.toString()) ? 'border-primary' : ''}`}>
                        <div className="card-body text-center">
                          <div className="form-check position-absolute top-0 start-0 m-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedFiles.includes(item.id.toString())}
                              onChange={() => handleFileSelect(item.id.toString())}
                            />
                          </div>
                          <i className={`${getFileIcon(item.type)} fa-3x text-muted mb-2`}></i>
                          <h6 className="card-title small">{item.name}</h6>
                          <p className="card-text small text-muted">
                            {item.size} • {item.uploaded}
                          </p>
                          <div className="btn-group btn-group-sm w-100" role="group">
                            <button className="btn btn-outline-primary">View</button>
                            <button className="btn btn-outline-secondary">Download</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MediaLibrary; 