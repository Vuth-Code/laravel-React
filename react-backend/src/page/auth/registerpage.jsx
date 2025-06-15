import { Button, Checkbox, Form, Input, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function RegisterPage() {
  const onFinish = (values) => {
    alert(JSON.stringify(values));
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="font-bold text-4xl mb-4">Sigu Up</h1>
          <Form
            name="login"
            size="large"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm-password"
              rules={[
                {
                  required: true,
                  message: "Please input your Comfirm Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Sign Up
              </Button>
              or <a href="/login">Login now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
