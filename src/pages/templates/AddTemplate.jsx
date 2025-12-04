import React, { useState } from 'react';
import { API } from '../../api/api';
import { Button, Form, Input, Upload, Modal, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function AddTemplate({ refetch }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('script_pdf', fileList[0].originFileObj);

    setLoading(true);
    try {
      await API.post("/api/services/script-templates/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Template added successfully!');
      handleCancel();
      refetch();
    } catch (error) {
      message.error('Failed to add template. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('You can only upload PDF files!');
    }
    return isPDF;
  };

  const uploadButton = (
    <div className="flex flex-col items-center">
      <UploadOutlined className="text-2xl" />
      <div className="mt-2">Click to upload PDF</div>
    </div>
  );

  return (
    <>
      {/* Button to trigger modal */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        className="flex items-center bg-blue-600 hover:bg-blue-700"
      >
        Add Template
      </Button>

      {/* Main modal for adding template */}
      <Modal
        title="Add New Template"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        {/* PDF Preview Modal */}
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <iframe 
            src={previewImage} 
            style={{ width: '100%', height: '500px' }} 
            title="PDF Preview"
          />
        </Modal>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Template Title"
            rules={[
              { required: true, message: 'Please input the template title!' },
              { max: 100, message: 'Title cannot exceed 100 characters' }
            ]}
          >
            <Input placeholder="Enter template title" size="large" />
          </Form.Item>

          <Form.Item
            label="PDF File"
            required
            rules={[{ required: true, message: 'Please upload a PDF file!' }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              accept=".pdf"
              maxCount={1}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <p className="text-xs text-gray-500 mt-2">
              Only PDF files are accepted. Max file size: 10MB.
            </p>
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Uploading...' : 'Add Template'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

// Helper function to preview files
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default AddTemplate;