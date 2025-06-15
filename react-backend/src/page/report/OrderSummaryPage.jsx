import { useEffect, useState } from "react";
import { request } from "../../util/api";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
  Descriptions,
  Divider,
  Row,
  Col,
  Card,
  Statistic,
} from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { MdRemoveRedEye, MdEdit } from "react-icons/md";

function OrderSummaryPage() {
  const [state, setState] = useState({
    list: [],
    total: 0,
    loading: false,
    detailVisible: false,
    currentOrder: null,
    editVisible: false,
    statusCounts: {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      total: 0,
    },
    paymentStatusCounts: {
      pending: 0,
      paid: 0,
      failed: 0,
      refunded: 0,
    },
  });

  const [formSearch] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async (query_param = "") => {
    setState((pre) => ({
      ...pre,
      loading: true,
    }));

    try {
      const res = await request("orders?page=1" + query_param, "get");
      if (!res.errors) {
        // Calculate status counts
        const statusCounts = {
          pending: 0,
          processing: 0,
          shipped: 0,
          delivered: 0,
          cancelled: 0,
          total: res.list.length,
        };

        const paymentStatusCounts = {
          pending: 0,
          paid: 0,
          failed: 0,
          refunded: 0,
        };

        res.list.forEach(order => {
          if (Object.prototype.hasOwnProperty.call(statusCounts, order.status)) {
            statusCounts[order.status]++;
          }

          if (Object.prototype.hasOwnProperty.call(paymentStatusCounts, order.payment_status)) {
            paymentStatusCounts[order.payment_status]++;
          }
        });

        setState((pre) => ({
          ...pre,
          loading: false,
          list: res.list,
          total: res.count,
          statusCounts,
          paymentStatusCounts,
        }));
      } else {
        message.error(res.message || "Failed to fetch orders");
        setState((pre) => ({
          ...pre,
          loading: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to fetch orders");
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
    }
  };

  const handleFilter = (values) => {
    let query = "";
    if (values.text_search) {
      query += "&search=" + values.text_search;
    }
    if (values.payment_status) {
      query += "&payment_status=" + values.payment_status;
    }
    if (values.order_status) {
      query += "&status=" + values.order_status;
    }
    getOrderList(query);
  };

  const handleViewDetails = (order) => {
    setState((pre) => ({
      ...pre,
      detailVisible: true,
      currentOrder: order,
    }));
  };

  const handleCloseModal = () => {
    setState((pre) => ({
      ...pre,
      detailVisible: false,
      currentOrder: null,
    }));
  };

  const handleEditBtn = (order) => {
    editForm.setFieldsValue({
      id: order.id,
      status: order.status,
      payment_status: order.payment_status,
    });

    setState((pre) => ({
      ...pre,
      editVisible: true,
      currentOrder: order,
    }));
  };

  const handleCloseEditModal = () => {
    editForm.resetFields();
    setState((pre) => ({
      ...pre,
      editVisible: false,
      currentOrder: null,
    }));
  };

  const handleUpdateOrder = async (values) => {
    try {
      const res = await request(`orders/${values.id}`, "put", {
        status: values.status,
        payment_status: values.payment_status,
      });

      if (!res.errors) {
        message.success("Order updated successfully");
        handleCloseEditModal();
        getOrderList();
      } else {
        message.error(res.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      message.error("Failed to update order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'processing':
        return 'blue';
      case 'shipped':
        return 'cyan';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'paid':
        return 'green';
      case 'failed':
        return 'red';
      case 'refunded':
        return 'purple';
      default:
        return 'default';
    }
  };

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      href: '/',
    },
    {
      title: 'Reports',
      href: '/reports',
    },
    {
      title: 'Order Summary',
      href: '/order_summary',
    },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-4" />

      {/* Order Status Summary Cards */}
      <Row gutter={16} className="mb-4">
        <Col span={4}>
          <Card>
            <Statistic
              title="Total Orders"
              value={state.statusCounts.total}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Pending"
              value={state.statusCounts.pending}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Processing"
              value={state.statusCounts.processing}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Shipped"
              value={state.statusCounts.shipped}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Delivered"
              value={state.statusCounts.delivered}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Cancelled"
              value={state.statusCounts.cancelled}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      <div className="flex justify-between items-center mb-3">
        <Form form={formSearch} onFinish={handleFilter}>
          <div className="flex items-center gap-3">
            <span className="text-md font-bold mb-6">Orders</span>
            <Form.Item name={"text_search"}>
              <Input.Search placeholder="Search" className="w-[150px]" />
            </Form.Item>

            <Form.Item className="w-[150px]" name={"payment_status"}>
              <Select
                placeholder="Payment Status"
                allowClear
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'paid', label: 'Paid' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'refunded', label: 'Refunded' },
                ]}
              />
            </Form.Item>

            <Form.Item className="w-[150px]" name={"order_status"}>
              <Select
                placeholder="Order Status"
                allowClear
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'processing', label: 'Processing' },
                  { value: 'shipped', label: 'Shipped' },
                  { value: 'delivered', label: 'Delivered' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600"
              style={{
                borderRadius: '4px',
                height: '38px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 15px',
                fontWeight: '400',
                fontSize: '14px'
              }}
            >
              Filter
            </Button>
          </div>
        </Form>
      </div>

      <Table
        loading={state.loading}
        dataSource={state.list}
        rowKey="id"
        columns={[
          {
            title: "Order ID",
            key: "id",
            dataIndex: "id",
            render: (value) => (
              <div className="font-bold text-blue-600">#{value}</div>
            ),
          },
          {
            title: "Customer",
            key: "user",
            dataIndex: "user",
            render: (user) => (
              <div>
                {user?.name || "N/A"}
                <div className="text-xs text-gray-500">{user?.email || "N/A"}</div>
              </div>
            ),
          },
          {
            title: "Date",
            key: "created_at",
            dataIndex: "created_at",
            render: (date) => new Date(date).toLocaleString(),
          },
          {
            title: "Total Amount",
            key: "total_amount",
            dataIndex: "total_amount",
            render: (value) => `$${parseFloat(value).toFixed(2)}`,
          },
          {
            title: "Payment Method",
            key: "payment_method",
            dataIndex: "payment_method",
          },
          {
            title: "Payment Status",
            key: "payment_status",
            dataIndex: "payment_status",
            render: (status) => (
              <Tag color={getPaymentStatusColor(status)}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Tag>
            ),
          },
          {
            title: "Order Status",
            key: "status",
            dataIndex: "status",
            render: (status) => (
              <Tag color={getStatusColor(status)}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Tag>
            ),
          },
          {
            title: "Action",
            key: "action",
            align: "center",
            render: (_, record) => (
              <div className="flex gap-2 justify-center">
                <Button
                  type="primary"
                  onClick={() => handleViewDetails(record)}
                  icon={<MdRemoveRedEye />}
                >
                  View
                </Button>
                <Button
                  type="default"
                  onClick={() => handleEditBtn(record)}
                  icon={<MdEdit />}
                >
                  Edit
                </Button>
              </div>
            ),
          },
        ]}
        pagination={{
          pageSize: 10,
          total: state.total,
        }}
      />

      {/* Order Details Modal */}
      <Modal
        title={`Order Details #${state.currentOrder?.id || ""}`}
        open={state.detailVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {state.currentOrder && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Order Information">
                  <Descriptions column={1}>
                    <Descriptions.Item label="Order ID">#{state.currentOrder.id}</Descriptions.Item>
                    <Descriptions.Item label="Date">
                      {new Date(state.currentOrder.created_at).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Tag color={getStatusColor(state.currentOrder.status)}>
                        {state.currentOrder.status.charAt(0).toUpperCase() + state.currentOrder.status.slice(1)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Amount">
                      ${parseFloat(state.currentOrder.total_amount).toFixed(2)}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Payment Information">
                  <Descriptions column={1}>
                    <Descriptions.Item label="Payment Method">
                      {state.currentOrder.payment_method}
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Status">
                      <Tag color={getPaymentStatusColor(state.currentOrder.payment_status)}>
                        {state.currentOrder.payment_status.charAt(0).toUpperCase() + state.currentOrder.payment_status.slice(1)}
                      </Tag>
                    </Descriptions.Item>
                    {state.currentOrder.transaction_id && (
                      <Descriptions.Item label="Transaction ID">
                        {state.currentOrder.transaction_id}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Card title="Customer Information">
              <Descriptions column={2}>
                <Descriptions.Item label="Name">{state.currentOrder.user?.name || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Email">{state.currentOrder.user?.email || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Shipping Address">{state.currentOrder.shipping_address}</Descriptions.Item>
                <Descriptions.Item label="Phone">{state.currentOrder.shipping_phone}</Descriptions.Item>
                <Descriptions.Item label="City">{state.currentOrder.shipping_city}</Descriptions.Item>
                <Descriptions.Item label="State">{state.currentOrder.shipping_state}</Descriptions.Item>
                <Descriptions.Item label="Zip Code">{state.currentOrder.shipping_zipcode}</Descriptions.Item>
                <Descriptions.Item label="Country">{state.currentOrder.shipping_country}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Divider />

            <Card title="Order Items">
              <Table
                dataSource={state.currentOrder.items || []}
                rowKey="id"
                pagination={false}
                columns={[
                  {
                    title: "Product",
                    dataIndex: "product",
                    key: "product",
                    render: (product) => product?.product_name || "N/A",
                  },
                  {
                    title: "Quantity",
                    dataIndex: "quantity",
                    key: "quantity",
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                    render: (price) => `$${parseFloat(price).toFixed(2)}`,
                  },
                  {
                    title: "Subtotal",
                    dataIndex: "subtotal",
                    key: "subtotal",
                    render: (subtotal) => `$${parseFloat(subtotal).toFixed(2)}`,
                  },
                ]}
                summary={(pageData) => {
                  let total = 0;
                  pageData.forEach(({ subtotal }) => {
                    total += parseFloat(subtotal || 0);
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={3}>
                          <strong>Total</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          <strong>${total.toFixed(2)}</strong>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </Card>
          </>
        )}
      </Modal>

      {/* Edit Order Modal */}
      <Modal
        title={`Edit Order #${state.currentOrder?.id || ""}`}
        open={state.editVisible}
        onCancel={handleCloseEditModal}
        footer={null}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdateOrder}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Order Status"
            name="status"
            rules={[{ required: true, message: "Please select order status" }]}
          >
            <Select
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'processing', label: 'Processing' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Payment Status"
            name="payment_status"
            rules={[{ required: true, message: "Please select payment status" }]}
          >
            <Select
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'paid', label: 'Paid' },
                { value: 'failed', label: 'Failed' },
                { value: 'refunded', label: 'Refunded' },
              ]}
            />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCloseEditModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update Order
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default OrderSummaryPage;
