import { Drawer, Button, Form, Input, Select, message } from "antd";
import { useState } from "react";
import axios from "axios";

const { Option } = Select;

const CreatePageDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await axios.post("http://localhost:5000/content", values);
      message.success("Page created successfully!");
      setVisible(false);
      form.resetFields();
    } catch (err) {
      message.error("Failed to create page!");
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        + Create New Page
      </Button>

      <Drawer
        title="Create CMS Page"
        width={400}
        onClose={() => setVisible(false)}
        open={visible}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Page Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input placeholder="example: about-us" />
          </Form.Item>

          <Form.Item name="body" label="Content Body" rules={[{ required: true }]}>
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CreatePageDrawer;
