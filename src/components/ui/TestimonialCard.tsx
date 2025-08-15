import React from 'react';
import { Card, Avatar, Typography, Button } from 'antd';

const { Paragraph, Text } = Typography;

interface TestimonialCardProps {
  text: string;
  name: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, name, avatarUrl }) => (
  <Card bordered>
    <Paragraph>"{text}"</Paragraph>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar src={avatarUrl} />
        <Text strong>{name}</Text>
      </div>
      <Button type="default" size="small">Read More</Button>
    </div>
  </Card>
);

export default TestimonialCard;


