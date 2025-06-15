import React, { useState, useEffect } from "react";
import { Card, Upload, Button, message, Form, Input, Avatar } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { config } from "../../util/config";

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [fileList, setFileList] = useState([]);
  const userId = localStorage.getItem("id");
  const userImage = localStorage.getItem("image");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Load user data
    form.setFieldsValue({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone: localStorage.getItem("phone") || "",
      address: localStorage.getItem("address") || "",
    });

    setUser({
      id: userId,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      profile: {
        phone: localStorage.getItem("phone") || "",
        address: localStorage.getItem("address") || "",
        image: userImage,
      }
    });
  }, [form, userId, userImage]);

  const handleUpdateProfile = async (values) => {
    try {
      // API to update profile data
      // Implementation will be added later
      message.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    }
  };

  const handleUploadImage = async (options) => {
    const { file, onSuccess, onError } = options;
    
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      message.info("Uploading profile picture...");
      
      const response = await axios.post(
        `${config.api_url}/api/users/${userId}/profile/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      
      if (response.data) {
        localStorage.setItem("image", response.data.data.image);
        message.success("Profile image updated successfully");
        onSuccess(response, file);
        
        // Force refresh the avatar display
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      
      let errorMessage = "Failed to upload profile image";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      message.error(errorMessage);
      onError(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Profile Information" className="col-span-1">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateProfile}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form>
        </Card>

        <Card title="Profile Image" className="col-span-1">
          <div className="flex flex-col items-center space-y-4">
            {userImage ? (
              <Avatar
                size={150}
                src={`${config.image_path}${userImage}`}
                alt="Profile"
              />
            ) : (
              <Avatar size={150} icon={<UserOutlined />} />
            )}
            
            <Upload
              customRequest={handleUploadImage}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              maxCount={1}
              showUploadList={false}
            >
              <Button 
                icon={<UploadOutlined />} 
                loading={loading}
              >
                Upload Profile Image
              </Button>
            </Upload>
            {loading && <p>Uploading... Please wait.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage; 