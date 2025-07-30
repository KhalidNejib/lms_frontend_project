import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Alert, Card, Button } from 'antd';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth';

interface Block {
  id: string;
  type: string;
  content: string;
}

interface PageData {
  title: string;
  slug: string;
  blocks: Block[];
  lastEdited?: string;
  stats?: any;
  description?: string;
}

const PageViewer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`/api/content/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
          setPage(null);
        } else if (!res.ok) {
          throw new Error('Failed to fetch page');
        } else {
          const data = await res.json();
          setPage(data);
        }
      } catch (err) {
        setNotFound(true);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) return <Spin style={{ margin: 40 }} />;
  if (notFound) return <Alert type="error" message="404 - Page Not Found" showIcon style={{ margin: 40 }} />;
  if (!page) return null;

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 8 }}>
      <Helmet>
        <title>{page.title} | CMS</title>
        {page.description && <meta name="description" content={page.description} />}
      </Helmet>
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24 }}>{page.title}</h1>
      {page.blocks.map(block => (
        <div key={block.id} style={{ marginBottom: 32 }}>
          {block.type === 'heading' && <h2 style={{ fontWeight: 600, fontSize: 24, color: '#2a2a2a' }}>{block.content}</h2>}
          {block.type === 'text' && <p style={{ fontSize: 18, lineHeight: 1.7, color: '#444' }}>{block.content}</p>}
          {block.type === 'image' && block.content && (
            <img src={block.content} alt="block" style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 2px 8px #eee' }} />
          )}
        </div>
      ))}
      {/* Admin info and actions */}
      {user?.role === 'admin' && (
        <Card type="inner" title="Admin Info" style={{ marginTop: 32 }}>
          <div>Last Edited: {page.lastEdited || 'N/A'}</div>
          {/* Add stats, etc. here if available */}
          <Button type="primary" style={{ marginTop: 16 }} onClick={() => navigate(`/cms/content?edit=${page.slug}`)}>
            Edit Page
          </Button>
        </Card>
      )}
    </div>
  );
};

export default PageViewer; 