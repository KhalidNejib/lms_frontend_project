import { Table, Tag, Space, Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
// import { getUsers } from '@/services/users';

const { Search } = Input;
const { Option } = Select;

const UserManagement = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = role === 'admin' ? 'red' : role === 'instructor' ? 'blue' : 'green';
        return (
          <Tag color={color} key={role}>
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'published' ? 'green' : status === 'pending' ? 'orange' : 'gray';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link">View</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Search placeholder="Search users" allowClear enterButton={<SearchOutlined />} style={{ width: 300 }} />
          <Select placeholder="Filter by role" allowClear style={{ width: 150 }}>
            <Option value="admin">Admin</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="student">Student</Option>
          </Select>
          <Select placeholder="Filter by status" allowClear style={{ width: 150 }}>
            <Option value="published">Published</Option>
            <Option value="pending">Pending</Option>
            <Option value="draft">Draft</Option>
          </Select>
        </Space>
      </div>
      <Table 
        columns={columns} 
        dataSource={users} 
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
};

export default UserManagement;