import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const SimpleTest: React.FC = () => {
  console.log('SimpleTest component rendering...');
  
  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Simple Test</Title>
      <Button type="primary">Test Button</Button>
      <p>If you can see this text and button, basic rendering is working.</p>
    </div>
  );
};

export default SimpleTest; 