import { useEffect, useState } from "react";
import { request } from "../../util/api";
import {
  message,
  Table,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Col,
  Row,
  Breadcrumb,
} from "antd";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { HomeOutlined } from '@ant-design/icons';

function CustomerPage() {
  const [state, setState] = useState({
    visible: false,
    list: [],
    total: 0,
    loading: false,
    isEditing: false,
    currentCustomer: null,
  });

  useEffect(() => {
    getList();
  }, []);

  const [validate, setValidate] = useState({
    // firstname: {
    //   help: "Firstname Invalid",
    //   validateStatus: "error",
    //   hasFeedback: true,
    // },
    // lastname: {
    //   help: "Lastname Invalid",
    //   validateStatus: "error",
    //   hasFeedback: true,
    // },
    // dob: false,
    // email: false,
    // tel: {
    //   help: "Telephone Alrady Exist",
    //   validateStatus: "error",
    //   hasFeedback: true,
    // },
    // address: false,
    // status: false,
  });

  const [formRef] = Form.useForm();

  const getList = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const res = await request("customers", "get", {});
      if (res) {
        setState((pre) => ({
          ...pre,
          list: res.list || [],
          total: res.count || 0,
          loading: false
        }));
      } else {
        console.error("Unexpected response structure:", res);
        message.error("Failed to fetch customer list");
        setState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
      message.error("Failed to fetch customer list");
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleBtnNew = () => {
    formRef.resetFields();
    setState({
      ...state,
      visible: true,
      isEditing: false,
      currentCustomer: null,
    });
  };

  const handleCloseModal = () => {
    formRef.resetFields();
    setState((pre) => ({
      ...pre,
      visible: false,
      currentCustomer: null,
    }));
  };

  const handleFinish = async (items) => {
    let data = {
      ...items,
      status: items.status === "Active" ? 1 : 0,
    };

    let url = "customers";
    let method = "post";
    if (formRef.getFieldValue("id")) {
      url = `customers/${formRef.getFieldValue("id")}`;
      method = "put";
    }
    const res = await request(url, method, data);

    if (res.success) {
      await getList();
      message.success(res.message || "Operation successful");
      handleCloseModal();
    } else {
      if (res.errors) {
        setValidate(res.errors);
      }
      message.error(res.message || "Operation failed");
    }
  };

  const handleEditBtn = (data) => {
    formRef.setFieldsValue({
      ...data,
      status: data.status === 1 ? "Active" : "Inactive", // Convert numeric status to string
    });
    setState({
      ...state,
      visible: true,
      isEditing: true,
      currentCustomer: data,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await request(`customers/${id}`, "delete", {});
      message.success(res.message || "Customer deleted successfully");
      getList();
    } catch (error) {
      console.error("Error deleting customer:", error);
      message.error(error.message);
    }
  };

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      href: '/',
    },
    {
      title: 'Customers',
      href: '/customers',
    },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-4" />
      <div className="flex justify-between items-center pb-2">
        <div>
          <h1 className="text-lg">Customers: {state.total}</h1>
        </div>
        <div>
          <Button onClick={handleBtnNew} type="primary">
            Add {""}
          </Button>
        </div>
      </div>
      <Table
        loading={state.loading}
        dataSource={Array.isArray(state.list) ? state.list.map((item) => ({ ...item, key: item.id })) : []}
        columns={[
          {
            key: "id",
            title: "ID",
            dataIndex: "id",
            render: (value) => (
              <div className="font-bold text-red-300">{value}</div>
            ),
          },
          {
            key: "firstname",
            title: "First Name",
            dataIndex: "firstname",
          },
          {
            key: "lastname",
            title: "Last Name",
            dataIndex: "lastname",
          },
          {
            key: "dob",
            title: "DOB",
            dataIndex: "dob",
          },
          {
            key: "email",
            title: "Email",
            dataIndex: "email",
          },
          {
            key: "tel",
            title: "Tel",
            dataIndex: "tel",
          },
          {
            key: "address",
            title: "Address",
            dataIndex: "address",
          },
          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (value) =>
              value == 1 ? (
                <p className="text-green-500">Active</p>
              ) : (
                <p className="text-red-500">Inactive</p>
              ),
          },
          {
            key: "Action",
            title: "Action",
            render: (_, data) => (
              <div className="space-x-2 flex ">
                <Button
                style={
                  { color: "blue", border: "1px solid blue" }
                }
                  onClick={() => {
                    handleEditBtn(data);
                  }}
                >
                  <MdEdit />
                </Button>
                <Button
                  danger
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete ?")) {
                      handleDelete(data.id);
                    }
                  }}
                >
                  <MdDelete />
                </Button>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={state.isEditing ? "Edit Customer" : "New Customer"}
        open={state.visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish} form={formRef}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
                {...validate.firstname}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Please input your DOB!",
                  },
                ]}
              >
                <Input placeholder="DOB" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
                {...validate.lastname}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Tel"
            name="tel"
            rules={[
              {
                required: true,
                message: "Please input your Tel!",
              },
            ]}
            {...validate.tel}
          >
            <Input placeholder="Tel" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please input your Status!",
              },
            ]}
          >
            <Select placeholder="Status">
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-x-2">
              <Button onClick={handleCloseModal} type="default">
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerPage;
