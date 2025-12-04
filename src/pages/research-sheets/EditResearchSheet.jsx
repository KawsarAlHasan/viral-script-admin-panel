import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { API } from "../../api/api";

const { TextArea } = Input;

function EditResearchSheet({ record, refetch }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
    form.setFieldsValue(record); // Load old data
  };

  const closeModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await API.patch(`/api/services/research-sheets/${record.id}/`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      message.success("Research sheet updated successfully!");
      closeModal();
      refetch();
    } catch (error) {
      console.error(error);
      message.error("Failed to update. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" icon={<EditOutlined />} onClick={openModal}>
        Edit
      </Button>

      <Modal
        title="Edit Research Sheet"
        open={visible}
        onCancel={closeModal}
        footer={null}
        width={600}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="formate_category"
            label="Formate Category"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Formate category" />
          </Form.Item>

          <Form.Item
            name="industry"
            label="Industry"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Industry" />
          </Form.Item>

          <Form.Item
            name="formate"
            label="Formate"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Formate" />
          </Form.Item>

          <Form.Item
            name="research_sheet"
            label="Research Sheet URL"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="https://example.com/my-sheet" />
          </Form.Item>

          <Form.Item
            name="content_platform"
            label="Content Platform"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Platform" />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
              size="large"
            >
              {loading ? "Updating..." : "Update Research Sheet"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditResearchSheet;
