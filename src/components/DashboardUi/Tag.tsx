import React from 'react';

interface TagProps {
  color: string;
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ color, children }) => (
  <span style={{
    background: color,
    color: '#fff',
    borderRadius: 8,
    padding: '2px 8px',
    fontSize: 12,
    marginRight: 4,
  }}>
    {children}
  </span>
);

export default Tag;