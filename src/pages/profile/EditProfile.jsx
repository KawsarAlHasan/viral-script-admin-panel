import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { API } from "../../api/api";

function EditProfile({ admin, refetch }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Set initial form values when admin data changes
  useEffect(() => {
    if (admin) {
      form.setFieldsValue({
        full_name: admin.full_name,
        email: admin.email,
        phone_number: admin.phone_number,
      });
    }
  }, [admin, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const res = await API.put("/api/auth/profile/", values);
      console.log(res);
      if (res.status === 200) {
        message.success("Profile updated successfully!");
        refetch();
      }
    } catch (error) {
      message.error("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please fill out all required fields correctly.");
  };

  return (
    <div className="text-left mt-4 mx-[-100px]">
      <h2 className="text-[24px] text-center">Edit Your Profile</h2>

      <Form
        form={form}
        name="edit-profile"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        {/* Full Name Field */}
        <div className="">
          <label className="text-[18px] block mb-1">Full Name:</label>
          <Form.Item
            name="full_name"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input
              className="p-3 text-[16px]"
              placeholder="Enter your full name..."
            />
          </Form.Item>
        </div>

        {/* Email Field */}
        <div className="">
          <label className="text-[18px] block mb-1">Email address:</label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              type="email"
              className="p-3"
              placeholder="Enter your email..."
            />
          </Form.Item>
        </div>

        {/* Phone Number Field */}
        <div className="">
          <label className="text-[18px] block mb-1">Phone Number:</label>
          <Form.Item
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input
              className="p-3 text-[16px]"
              placeholder="Enter your phone number..."
            />
          </Form.Item>
        </div>

        {/* Submit Button */}
        <div className="">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-6 text-[18px] font-semibold my-main-button"
              loading={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;
