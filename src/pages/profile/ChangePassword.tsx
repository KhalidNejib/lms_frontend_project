import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// import { changePassword } from '../../services/auth.service'
// import ChangePasswordForm from  "../../components/"

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const mutation = useMutation({
    mutationFn: () => Promise.resolve({ message: 'Password changed successfully' }),
    onSuccess: () => {
      messageApi.success('Password changed successfully');
      setOpen(false);
    },
    onError: () => {
      messageApi.error('Failed to change password');
    },
  });

  const handleSubmit = (values: any) => {
    mutation.mutate();
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={() => setOpen(true)}>
        Change Password
      </Button>
      <Modal
        title="Change Password"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div>Change Password Form Component</div>
      </Modal>
    </>
  );
};

export default ChangePassword;