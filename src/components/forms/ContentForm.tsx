
import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import type { CMSPage } from "../../types/CMSPage";

interface Props {
  initialValues?: CMSPage | null;
  onSubmit: (values: CMSPage & { file?: File | null }) => void;
  onCancel?: () => void;
}


const CMSForm: React.FC<Props> = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
    setSelectedFile(null);
  }, [initialValues]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFinish = (values: CMSPage) => {
    onSubmit({ ...values, file: selectedFile });
    form.resetFields();
    setSelectedFile(null);
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
      <Form.Item label="File" name="file">
        <input type="file" onChange={handleFileChange} />
        {selectedFile && <span style={{ marginLeft: 8 }}>{selectedFile.name}</span>}
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
