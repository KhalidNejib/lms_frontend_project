import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import type { CMSPage } from "../../types/CMSPage"

interface Props {
  initialValues?: CMSPage | null;
  onSubmit: (values: CMSPage) => void;
  onCancel?: () => void;
}

const CMSForm: React.FC<Props> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const handleFinish = (values: CMSPage) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Content" name="content">
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Select options={[{ value: "draft" }, { value: "published" }]} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? "Update" : "Create"}
        </Button>
        {initialValues && (
          <Button onClick={onCancel} style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CMSForm;
