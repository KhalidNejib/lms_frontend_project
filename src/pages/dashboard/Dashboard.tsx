import React from 'react';
import Layout from '../../components/common/Layout';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="container-fluid py-4">
        <h1 className="h2 mb-4">Dashboard</h1>
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Courses
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">12</div>
                  </div>
                  <div className="col-auto">
                    <i className="bi bi-book fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Enrolled Students
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">156</div>
                  </div>
                  <div className="col-auto">
                    <i className="bi bi-people fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Active Sessions
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">8</div>
                  </div>
                  <div className="col-auto">
                    <i className="bi bi-activity fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Completion Rate
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">87%</div>
                  </div>
                  <div className="col-auto">
                    <i className="bi bi-graph-up fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Recent Activities</h6>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>New course enrollment</strong>
                      <br />
                      <small className="text-muted">React Fundamentals - 2 hours ago</small>
                    </div>
                    <span className="badge bg-primary rounded-pill">New</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Quiz completed</strong>
                      <br />
                      <small className="text-muted">JavaScript Basics - 4 hours ago</small>
                    </div>
                    <span className="badge bg-success rounded-pill">Completed</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Assignment submitted</strong>
                      <br />
                      <small className="text-muted">UI/UX Design - 1 day ago</small>
                    </div>
                    <span className="badge bg-warning rounded-pill">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">Create New Course</button>
                  <button className="btn btn-success">View Analytics</button>
                  <button className="btn btn-info">Manage Users</button>
                  <button className="btn btn-warning">Review Submissions</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 