import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./page/home/Homepage";
import Brandpage from "./page/product/brand/Brandpage";
import CategoryPage from "./page/product/category/Categorypage";
import Productpage from "./page/product/Productpage";
import ErrorPage from "./page/error/Errorpage";
import Login from "./page/auth/login";
import RegisterPage from "./page/auth/registerpage";
import MainLayout from "./components/layout/MianLayout";
import MainLayoutAuth from "./components/layout/MainLayoutAuth";
import "./App.css";
import CustomerPage from "./page/customers/CustomerPage";
import EmploeePage from "./page/employees/EmployeePage";
import SupplierPage from "./page/purchase/SupplierPage";
import Purchase from "./page/purchase/Purchase";
import ExpensePage from "./page/expense/ExpensePage";
import ExpenseTypePage from "./page/expense/ExpenseTypePage";
import ExpenseSummaryPage from "./page/report/ExpenseSummaryPage";
import OrderSummaryPage from "./page/report/OrderSummaryPage";
import ReportEmployeePage from "./page/report/ReportEmployeePage";
import SaleByCustomerPage from "./page/report/SaleByCustomerPage";
import TopSalePage from "./page/report/TopSalePage";
import ProfilePage from "./page/profile/ProfilePage";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/brands" element={<Brandpage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/products" element={<Productpage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/employees" element={<EmploeePage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/expense_type" element={<ExpenseTypePage />} />
          <Route path="/expense_summary" element={<ExpenseSummaryPage />} />
          <Route path="/order_summary" element={<OrderSummaryPage />} />
          <Route path="/report_employee" element={<ReportEmployeePage />} />
          <Route path="/sale_by_customer" element={<SaleByCustomerPage />} />
          <Route path="/top_sale" element={<TopSalePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<MainLayoutAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
