import React, { useState } from "react";
import { API } from "../../api/api";
import { Button, Form, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function AddResearchSheet({ refetch }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      await API.post("/api/services/research-sheets/", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      message.success("Research sheet added successfully!");
      handleCancel();
      refetch?.();
    } catch (error) {
      message.error("Failed to add research sheet");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Add Research Sheet
      </Button>

      <Modal
        title="Add New Research Sheet"
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        destroyOnClose
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
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input placeholder="Enter formate category" size="large" />
          </Form.Item>

          <Form.Item
            name="industry"
            label="Industry"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input placeholder="Enter industry" size="large" />
          </Form.Item>

          <Form.Item
            name="formate"
            label="Formate"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input placeholder="Enter formate" size="large" />
          </Form.Item>

          <Form.Item
            name="research_sheet"
            label="Research Sheet URL"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input placeholder="https://example.com/my-sheet" size="large" />
          </Form.Item>

          <Form.Item
            name="content_platform"
            label="Content Platform"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input placeholder="Enter platform name" size="large" />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Add Research Sheet"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddResearchSheet;
