import { API, useResearchSheets } from "../../api/api";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Modal, Table, Space, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AddRearchSheet from "./AddRearchSheet";
import EditResearchSheet from "./EditResearchSheet";
import { Link } from "react-router-dom";

function ResearchSheets() {
  const { researchSheets, isLoading, isError, error, refetch } =
    useResearchSheets();

  if (isLoading) return <IsLoading />;
  if (isError || error) return <IsError error={error} refetch={refetch} />;

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Research Sheet?",
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
      await API.delete(`/api/services/research-sheets/${id}/`);
      message.success("Deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete");
    }
  };

  const columns = [
    {
      title: "Formate Category",
      dataIndex: "formate_category",
      key: "formate_category",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "Formate",
      dataIndex: "formate",
      key: "formate",
    },
    {
      title: "Research Sheet",
      dataIndex: "research_sheet",
      key: "research_sheet",
      render: (text) => (
        <Link to={text} target="_blank" className="text-blue-600 underline">
          View Sheet
        </Link>
      ),
    },
    {
      title: "Content Platform",
      dataIndex: "content_platform",
      key: "content_platform",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EditResearchSheet record={record} refetch={refetch} />

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <AddRearchSheet refetch={refetch} />
      </div>

      <Table
        columns={columns}
        dataSource={researchSheets}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />
    </div>
  );
}

export default ResearchSheets;
