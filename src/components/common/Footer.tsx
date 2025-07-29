import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-dark text-light py-4 mt-auto">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <p className="mb-0">&copy; 2024 LMS. All rights reserved.</p>
        </div>
        <div className="col-md-6 text-md-end">
          <a href="#" className="text-light me-3">Privacy Policy</a>
          <a href="#" className="text-light me-3">Terms of Service</a>
          <a href="#" className="text-light">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 