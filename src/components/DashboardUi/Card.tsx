import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => (
  <div style={{
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: 24,
    marginBottom: 16,
    ...style,
  }}>
    {children}
  </div>
);

export default Card;