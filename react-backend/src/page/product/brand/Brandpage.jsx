import {
  message,
  Breadcrumb,
  Button,
  Select,
  Table,
  Row,
  Modal,
  Form,
  Col,
  Input,
} from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { request } from "../../../util/api";
import { useEffect, useState } from "react";
// Removed from the top level and will be moved inside the Brandpage function

const breadcrumbItems = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Brand", href: "/products/brand" },
];

function Brandpage() {
  const [validate, setValidate] = useState({});
  const [state, setState] = useState({
    list: [],
    total: 0,
    loading: false,
    visible: false,
    isEditing: false,
    currentBrand: null,
  });

  const [formRef] = Form.useForm();

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await request("brands", "get", {});
      if (res && res.list) {
        setState((pre) => ({
          ...pre,
          list: res.list,
          total: res.count || res.list.length,
          loading: false,
        }));
      } else {
        message.error("Failed to fetch brand list");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      message.error("Failed to fetch brand list");
    }
  };

  const handleBtnNew = () => {
    formRef.resetFields();
    setState({
      ...state,
      visible: true,
      isEditing: false,
      currentBrand: null,
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
    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    let param = {
      ...items,
      status: items.status === "Active" ? 1 : 0,
    };
    let url = "brands";
    let method = "post";
    if (formRef.getFieldValue("id")) {
      url = `brands/${formRef.getFieldValue("id")}`;
      method = "put";
    }
    const res = await request(url, method, param);
    // console.log(res);
    if (!res.errors) {
      getList();
      setState((pre) => ({
        ...pre,
        loading: false,
        visible: false,
      }));
      message.success(res.message || "Add successful");
    } else {
      message.error(res.message);
      setValidate(res.errors);
    }
  };

  const handleEditBtn = (data) => {
    formRef.setFieldsValue({
      ...data,
      status: data.status === 1 ? "Active" : "Inactive", 
      id: data.id,
    });
    setState({
      ...state,
      visible: true,
      isEditing: true,
      currentBrand: data,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await request(`brands/${id}`, "DELETE");
      if (!res.errors) {
        message.success("Deleted successfully!");
        getList();
      } else {
        message.error(res.message);
      }
    } catch {
      message.error("An error occurred while deleting.");
    }
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-4" />
      <div className="flex justify-between items-center pb-2">
        <div>
          <h1 className="text-lg">Brands: {state.total}</h1>
        </div>
        <div>
          <Button onClick={handleBtnNew} type="primary">
            Add New {""}
          </Button>
        </div>
      </div>
      <Table
        dataSource={state.list.map((item) => ({ ...item, key: item.id }))}
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
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "code",
            title: "Code",
            dataIndex: "code",
          },
          {
            key: "",
            title: "Form Country",
            dataIndex: "from_country",
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
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
            render: (value, data) => (
              <div className="space-x-2 flex ">
                <Button
                  style={{ color: "blue", border: "1px solid blue" }}
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
        title={state.isEditing ? "Edit Brand" : "New Brand"}
        open={state.visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish} form={formRef}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
                {...validate.name}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your Code!",
                  },
                ]}
                {...validate.code}
              >
                <Input placeholder="Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Form Country"
                name="from_country"
                rules={[
                  {
                    required: true,
                    message: "Please input your From Country!",
                  },
                ]}
                {...validate.from_country}
              >
                <Input placeholder="Form Country" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description" />
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
                {state.isEditing ? "Update" : "Add"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Brandpage;
