import { useEffect, useState } from "react";
import { request } from "../../util/api";
import {
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  // Space,
  Tag,
  Upload,
} from "antd";
import { Button, Table } from "antd";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { config } from "../../util/config";

function ProductPage() {
  const [state, setState] = useState({
    list: [],
    category: [],
    brand: [],
    total: 0,
    loading: false,
    visible: false,
  });

  const [fileList, setFileList] = useState([]);

  const [validate, setValidate] = useState({});

  const [formRef] = Form.useForm();
  const [formSearch] = Form.useForm();

  useEffect(() => {
    getList();
  }, []);

  const getList = async (query_param = "") => {
    // ?category_id=2&brand_id=1&status=1
    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    const res = await request("products?page=1" + query_param, "get");
    if (!res.errors) {
      setState((pre) => ({
        ...pre,
        loading: false,
        list: res.list,
        categories: res.categories,
        brands: res.brands,
        total: res.total,
      }));
    } else {
      message.error(res.message);
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
    }
  };

  const handleBtnNew = () => {
    formRef.setFieldValue("status", 1);
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };
  const handleCloseModal = () => {
    formRef.resetFields();
    setState((pre) => ({
      ...pre,
      visible: false,
    }));
    setFileList([]);
    setValidate({});
  };
  const handleBntDelete = async (data) => {
    try {
      const res = await request(`products/${data.id}`, "DELETE");
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

  const handleEditBtn = (data) => {
    if (data.image) {
      setFileList([
        {
          uid: data.id,
          image: data.image,
          state: "done",
          url: config.image_path + data.image,
        },
      ]);
    }

    formRef.setFieldsValue({
      ...data,
      id: data.id, // using formRef.getFieldValue("id")
    });
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };

  const onFinish = async (items) => {
    setState((pre) => ({
      ...pre,
      loading: true,
    }));

    let formData = new FormData();
    formData.append("product_name", items.product_name);
    formData.append("description", items.description);
    formData.append("quantity", items.quantity);
    formData.append("price", items.price);
    formData.append("status", items.status);
    formData.append("categories_id", items.categories_id);
    formData.append("brands_id", items.brands_id);

    if (items.image && items.image.file) {
      if (items.image.file.originFileObj) {
        formData.append("image", items.image.file.originFileObj);
      } else if (items.image.file?.status == "removed") {
        formData.append("remove_image", items.image.file?.name); // edit then remove iamge and submit
      }
    }

    let url = "products",
      method = "post";
    if (formRef.getFieldValue("id")) {
      url = "products/" + formRef.getFieldValue("id");
      formData.append("_method", "put");
      // method = "put";
    }
    const res = await request(url, method, formData);
    console.log(res);
    if (!res.errors) {
      getList();
      setState((pre) => ({
        ...pre,
        loading: false,
        visible: false,
      }));
      message.success(res.message);
    } else {
      message.error(res.message);
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
      setValidate(res.errors);
      // handle validate
    }
  };

  const handleClearFilter = () => {
    formSearch.resetFields();
    getList("");
  };

  const handleFilter = (item) => {
    let query_param = "";
    if (item && Object.keys(item).length > 0) {
      Object.keys(item).map((key) => {
        //body loop
        if (item[key] && item[key] != "") {
          query_param += "&" + key + "=" + item[key];
        }
      });
    }
    getList(query_param);
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-purple-100 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-purple-700 tracking-tight drop-shadow-sm">
            Products
          </h1>
          <Button
            onClick={handleBtnNew}
            type="primary"
            className="flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            New
          </Button>
        </div>
        <Form form={formSearch} onFinish={handleFilter} className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <Form.Item name={"text_search"} className="m-0">
              <Input.Search
                placeholder="Search"
                className="w-[170px] rounded-lg shadow-sm"
              />
            </Form.Item>
            <Form.Item className="w-[170px] m-0" name={"categories_id"}>
              <Select
                placeholder="Select Category"
                allowClear
                className="rounded-lg shadow-sm"
                options={state.categories?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>
            <Form.Item className="w-[170px] m-0" name={"brands_id"}>
              <Select
                placeholder="Select Brand"
                allowClear
                className="rounded-lg shadow-sm"
                options={state.brands?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>
            <Form.Item className="w-[170px] m-0" name={"status"}>
              <Select
                placeholder="Select Status"
                allowClear
                className="rounded-lg shadow-sm"
                options={[
                  { label: "Active", value: 1 },
                  { label: "InActive", value: 0 },
                ]}
              />
            </Form.Item>
            <Form.Item className="m-0">
              <Button
                onClick={handleClearFilter}
                className="rounded-lg border-gray-300"
              >
                Clear
              </Button>
            </Form.Item>
            <Form.Item className="m-0">
              <Button
                htmlType="submit"
                type="primary"
                className="rounded-lg bg-blue-500 hover:bg-purple-500 transition-all"
              >
                Filter
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
          <Table
            className="rounded-2xl overflow-hidden border border-gray-100"
            dataSource={state.list}
            pagination={false}
            columns={[
              {
                title: <span className="font-bold text-gray-700">Name</span>,
                key: "Name",
                dataIndex: "product_name",
                className: "whitespace-nowrap",
              },
              {
                title: (
                  <span className="font-bold text-gray-700">Description</span>
                ),
                key: "Description",
                dataIndex: "description",
                className: "max-w-xs whitespace-pre-line text-gray-600",
              },
              {
                title: (
                  <span className="font-bold text-gray-700">Category</span>
                ),
                key: "Category",
                dataIndex: "categories",
                render: (categories) => categories.name,
                className: "whitespace-nowrap",
              },
              {
                title: <span className="font-bold text-gray-700">Brand</span>,
                key: "Brand",
                dataIndex: "brands",
                render: (brands) => brands.name,
                className: "whitespace-nowrap",
              },
              {
                title: (
                  <span className="font-bold text-gray-700">Quantity</span>
                ),
                key: "quantity",
                dataIndex: "quantity",
                className: "whitespace-nowrap text-center",
              },
              {
                title: <span className="font-bold text-gray-700">Price</span>,
                key: "price",
                dataIndex: "price",
                className: "whitespace-nowrap text-center",
              },
              {
                title: <span className="font-bold text-gray-700">Image</span>,
                key: "image",
                dataIndex: "image",
                render: (value) =>
                  value ? (
                    <Image
                      width={70}
                      height={60}
                      src={config.image_path + value}
                      alt="value"
                      className="border-2 border-slate-100 rounded-xl shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-[60px] h-[60px] bg-slate-200 rounded-xl" />
                  ),
                className: "text-center",
              },
              {
                title: <span className="font-bold text-gray-700">Status</span>,
                key: "Status",
                dataIndex: "status",
                render: (value) =>
                  value ? (
                    <Tag
                      color="green"
                      className="rounded-full px-3 py-1 text-xs font-semibold bg-green-50 border border-green-200 text-green-700 animate-fade-in"
                    >
                      Actived
                    </Tag>
                  ) : (
                    <Tag
                      color="red"
                      className="rounded-full px-3 py-1 text-xs font-semibold bg-red-50 border border-red-200 text-red-700 animate-fade-in"
                    >
                      InActived
                    </Tag>
                  ),
                className: "text-center",
              },
              {
                key: "Action",
                title: <span className="font-bold text-gray-700">Action</span>,
                align: "center",
                render: (value, data) => (
                  <div className="flex gap-x-2 justify-center">
                    <Button
                      danger
                      onClick={() => handleBntDelete(data)}
                      className="rounded-full border-0 bg-red-100 hover:bg-red-200 text-red-600 shadow-sm transition-all"
                    >
                      <MdDelete size={18} />
                    </Button>
                    <Button
                      onClick={() => handleEditBtn(data)}
                      className="rounded-full border-0 bg-blue-100 hover:bg-blue-200 text-blue-600 shadow-sm transition-all"
                    >
                      <MdEdit size={18} />
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <Modal
        open={state.visible}
        title={formRef.getFieldValue("id") ? "Update" : "New"}
        onCancel={handleCloseModal}
        footer={null}
        className="rounded-2xl"
        bodyStyle={{ borderRadius: 16 }}
      >
        <Form form={formRef} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name={"product_name"}
            rules={[
              {
                required: true,
                message: "Product Name required!",
              },
            ]}
            {...validate.product_name}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            {...validate.description}
          >
            <Input.TextArea placeholder="description" />
          </Form.Item>

          <Form.Item
            label="Category"
            name={"categories_id"}
            rules={[
              {
                required: true,
                message: "Category required!",
              },
            ]}
            {...validate.categories_id}
          >
            <Select
              placeholder="Select category"
              options={state.categories?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Brand"
            name={"brands_id"}
            rules={[
              {
                required: true,
                message: "Brand required!",
              },
            ]}
            {...validate.brands_id}
          >
            <Select
              placeholder="Select Brand"
              options={state.brands?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name={"quantity"}
            rules={[
              {
                required: true,
                message: "Quantity required!",
              },
            ]}
            {...validate.quantity}
          >
            <InputNumber placeholder="Quantity" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Price"
            name={"price"}
            rules={[
              {
                required: true,
                message: "Price required!",
              },
            ]}
            {...validate.price}
          >
            <InputNumber placeholder="Price" className="w-full" />
          </Form.Item>

          <Form.Item label="Image" name={"image"} {...validate.image}>
            <Upload
              listType="picture-card"
              maxCount={1}
              customRequest={(e) => {
                e.onSuccess();
              }}
              fileList={fileList}
              onChange={(e) => {
                setFileList(e.fileList);
              }}
            >
              +
            </Upload>
          </Form.Item>
          <Form.Item label="Status" name={"status"} {...validate.status}>
            <Select
              placeholder="Status"
              options={[
                {
                  label: "Active",
                  value: 1,
                },
                {
                  label: "Inactive",
                  value: 0,
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-x-2">
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                {formRef.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;
