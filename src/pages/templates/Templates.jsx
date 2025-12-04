import React, { useState } from "react";
import { API, useTemplates } from "../../api/api";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Input, Modal, Table, Tag, Space, Button, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AddTemplate from "./AddTemplate";
import dayjs from "dayjs";

const { Search } = Input;

function Templates() {
  const { templatesData, isLoading, isError, error, refetch } = useTemplates();
  const [searchText, setSearchText] = useState("");

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError || error) {
    return <IsError error={error} refetch={refetch} />;
  }

  const filteredData = templatesData?.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this template?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      const responce = await API.delete(
        `/api/services/script-templates/${id}/`
      );

      message.success("Template deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete template. Please try again.");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "PDF",
      dataIndex: "script_pdf",
      key: "script_pdf",
      render: (url) => (
        <Tag color="blue" className="cursor-pointer hover:underline">
          <a href={url} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => dayjs(date).format("DD MMM YYYY, hh:mm A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {/* <Button
            icon={<EyeOutlined />}
            onClick={() => window.open(record.script_pdf, "_blank")}
            className="flex items-center"
          >
            View
          </Button> */}
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.id)}
            className="flex items-center"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Search
            placeholder="Search templates..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <AddTemplate refetch={refetch} />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          className="border rounded"
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
}

export default Templates;
