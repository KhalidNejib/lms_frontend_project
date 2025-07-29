import React from 'react';
import LoginForm from '../../components/forms/LoginForm';

const Login: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="card-title">Sign in to your account</h2>
                <p className="text-muted">Enter your credentials to access your account</p>
              </div>
              <LoginForm onSubmit={handleLogin} />
              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account? <a href="#" className="text-decoration-none">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 