import { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import MainLayoutHeaderTop from "./MainLayoutHeaderTop";
import BottomNavigation from "./BottomNavigation";
import {
  FaChevronDown,
  FaBoxOpen,
  FaShoppingCart,
  FaMoneyBill,
  FaChartBar,
  FaUser,
  FaUsers,
  FaTachometerAlt,
} from "react-icons/fa";

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "", <FaTachometerAlt />),
  getItem("Customer", "customers", <FaUser />),
  getItem("Employee", "employees", <FaUsers />),
  getItem("Product", "product", <FaBoxOpen />, [
    getItem("Product", "products", null),
    getItem("Category", "categories", null),
    getItem("Brand", "brands", null),
  ]),
  getItem("Purchase", "purchase", <FaShoppingCart />, [
    getItem("Purchase", "purchase"),
    getItem("Supplier", "supplier"),
  ]),
  getItem("Expense", "expense", <FaMoneyBill />, [
    getItem("Expense", "expense"),
    getItem("Expense Type", "expense_type"),
  ]),
  getItem("Report", "report", <FaChartBar />, [
    getItem("Expense Summary", "expense_summary"),
    getItem("Order Summary", "order_summary"),
    getItem("Report Employee", "report_employee"),
    getItem("Sale By Customer", "sale_by_customer"),
    getItem("Top Sale", "top_sale"),
  ]),
];
const MainLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // check user login : Protected Route
  const user_id = localStorage.getItem("id");
  useEffect(() => {
    if (!user_id) {
      navigate("/login");
    }
  }, [navigate, user_id]);

  // if user not login return null
  if (!user_id) {
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={240}
        style={{
          background: "linear-gradient(135deg, #0a192f 60%, #1e293b 100%)",
          boxShadow: "2px 0 16px 0 rgba(10,25,47,0.12)",
        }}
        className="custom-sider shadow-xl"
      >
        <div className="flex items-center justify-center py-8 border-b border-blue-800">
          <span className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg font-mono">
            KH-STORE
          </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={(event) => {
            navigate(event.key);
          }}
          style={{
            background: "transparent",
            fontSize: "1rem",
            fontWeight: 500,
            borderRight: 0,
            paddingTop: 12,
          }}
          className="custom-sidebar-menu"
          expandIcon={({ isOpen }) => (
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-yellow-300 shadow transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <FaChevronDown size={14} />
            </span>
          )}
          subMenuItemRender={(item, dom) => (
            <span className="flex items-center gap-2 text-yellow-300 font-semibold bg-blue-800/80 rounded-lg px-3 py-2 my-1 hover:bg-blue-700/90 transition-all">
              {item.icon}
              {dom}
            </span>
          )}
          itemIcon={<span className="text-blue-300" />}
        />
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-xs text-blue-200 opacity-60">Admin Panel</span>
        </div>
      </Sider>
      <Layout style={{ background: "#f6f8fc" }}>
        <MainLayoutHeaderTop />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: borderRadiusLG,
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
            }}
            className="transition-all duration-300 shadow-lg"
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", background: "transparent" }}>
          <span className="text-gray-400">
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </span>
        </Footer>
        <BottomNavigation />
      </Layout>
    </Layout>
  );
};
export default MainLayout;
