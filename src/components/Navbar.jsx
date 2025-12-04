import React, { useState } from "react";
import { Avatar, Dropdown, Button, Drawer, Badge, Space, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { signOutAdmin, useAdminProfile } from "../api/api";

const Navbar = ({ showDrawer }) => {
  const { admin, isLoading, isError, error, refetch } = useAdminProfile();
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleSignOut = () => {
    signOutAdmin();
    navigate("/login");
  };

  const profileMenuItems = [
    {
      key: "profile",
      label: (
        <Link to="/profile" className="flex items-center gap-2 px-1 py-2">
          <UserOutlined /> Profile
        </Link>
      ),
    },
    {
      key: "settings",
      label: (
        <Link to="/settings" className="flex items-center gap-2 px-1 py-2">
          <SettingOutlined /> Settings
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <span
          onClick={handleSignOut}
          className="flex items-center gap-2 px-1 py-2 hover:bg-gray-100"
        >
          <LogoutOutlined /> Logout
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <header className="w-full bg-[#FFFFFF] shadow-sm fixed top-0 z-50 py-[6px]">
        <div className="mx-2 lg:ml-[30px] lg:mr-24">
          <div className="flex items-center justify-between h-16">
            <Skeleton.Avatar active size="large" shape="circle" />
          </div>
        </div>
      </header>
    );
  }

  if (isError) {
    return (
      <header className="w-full bg-[#FFFFFF] shadow-sm fixed top-0 z-50 py-[6px]">
        <div className="mx-2 lg:ml-[30px] lg:mr-24">
          <div className="flex items-center justify-between h-16">
            <span className="text-red-500">Error loading profile</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-[#FFFFFF] shadow-sm fixed top-0 z-50 py-[6px]">
      <div className="mx-2 lg:ml-[30px] lg:mr-24">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <Button
              type="text"
              className="md:hidden mr-2"
              icon={<MenuOutlined className="text-lg" />}
              onClick={showDrawer}
            />

            <button className="flex items-center space-x-1 lg:space-x-2 xl:space-x-3 logo-container cursor-pointer lg:mr-4">
              <div className="relative hidden lg:block">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white transform -rotate-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                </div>
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-[#00ff8c] rounded-full animate-pulse"
                  style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                ></div>
              </div>
              <div className="mt-3">
                <h2 className="text-2xl font-bold logo-gradient leading-tight">
                  ViralScript
                  <span className="text-[#ff3898]">Library</span>
                </h2>
              </div>
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Dropdown
              menu={{ items: profileMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
              overlayClassName="w-48"
            >
              <Space className="cursor-pointer hover:opacity-80 transition-opacity">
                {admin?.profile_image ? (
                  <Avatar
                    src={<img src={admin.profile_image} alt="profile" />}
                    size="large"
                    className="border border-gray-300"
                  />
                ) : (
                  <Avatar
                    icon={<UserOutlined />}
                    size="large"
                    className="border border-gray-300"
                  />
                )}
                <span className="hidden md:inline-block font-medium">
                  {admin?.full_name || "Admin"}
                </span>
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>

      <Drawer
        title="Notifications"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={300}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4">
          <p>No new notifications</p>
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;