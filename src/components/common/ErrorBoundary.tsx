import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Typography } from 'antd';

const { Text } = Typography;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Alert
            message="Something went wrong"
            description={
              <div>
                <Text>An error occurred while rendering this component.</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {this.state.error?.message}
                </Text>
              </div>
            }
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
          <Button 
            type="primary" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 