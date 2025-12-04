import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { API } from "../../api/api";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await API.post("/api/auth/change-password/", values);

      if (res.status === 200) {
        message.success("Password changed successfully!");
        form.resetFields();
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          "Password change failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please fill out all required fields correctly.");
  };

  return (
    <div className="text-left mt-4 mx-[-70px]">
      <h2 className="text-[24px] text-center">Change Password</h2>

      <Form
        form={form}
        name="change-password"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        {/* Current Password Field */}
        <div className="mb-4">
          <label className="text-[18px] block mb-1">Current Password:</label>
          <Form.Item
            name="old_password"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
            ]}
          >
            <Input.Password
              className="p-3 text-[16px]"
              placeholder="Enter your current password..."
              visibilityToggle={true}
            />
          </Form.Item>
        </div>

        {/* New Password Field */}
        <div className="mb-4">
          <label className="text-[18px] block mb-1">New Password:</label>
          <Form.Item
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters!",
              },
              {
                pattern: /[A-Z]/,
                message: "Must contain at least one uppercase letter!",
              },
              {
                pattern: /[a-z]/,
                message: "Must contain at least one lowercase letter!",
              },
              {
                pattern: /[0-9]/,
                message: "Must contain at least one number!",
              },
              {
                pattern: /[@$!%*#?&]/,
                message: "Must contain at least one special character!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("old_password") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "New password must be different from current password!"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              className="p-3 text-[16px]"
              placeholder="Enter your new password..."
              visibilityToggle={true}
            />
          </Form.Item>
        </div>

        {/* Confirm Password Field - Fixed Version */}
        <div className="mb-4">
          <label className="text-[18px] block mb-1">Confirm Password:</label>
          <Form.Item
            name="confirm_password"
            dependencies={["new_password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords you entered do not match!")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              className="p-3 text-[16px]"
              placeholder="Confirm your new password..."
              visibilityToggle={true}
            />
          </Form.Item>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-6 text-[18px] font-semibold my-main-button"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default ChangePassword;
