import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { LiaUser } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { TbGridDots, TbUserSquare } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import logoImage from "./assets/images/logo.svg";
import ItemScreen from "./screens/ItemScreen";
import { ROUTES } from "./routes";
import UserScreen from "./screens/UserScreen";
import { BsBox } from "react-icons/bs";

const { Sider, Content } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
}

// Sidebar Component
const Sidebar: React.FC<{
  collapsed: boolean;
  toggleCollapsed: () => void;
}> = ({ collapsed, toggleCollapsed }) => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: ROUTES.home,
      icon: <RxDashboard size={16} />,
      label: <Link to={ROUTES.home}>ផ្ទាំងគ្រប់គ្រងទូទៅ</Link>,
    },
    {
      key: ROUTES.item,
      icon: <BsBox size={16} />,
      label: <Link to={ROUTES.item}>ទំនិញ</Link>,
    },
    {
      key: ROUTES.user,
      icon: <TbUserSquare size={18} />,
      label: <Link to={ROUTES.user}>អ្នកប្រើប្រាស់</Link>,
    },
  ];

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      className="shadow-md h-screen overflow-auto relative transition-all duration-300"
      width={220}
    >
      <div className="flex items-center justify-center h-16 my-4">
        <img src={logoImage} alt="logo" className="w-10 h-10" />
        {!collapsed && (
          <span className="ml-2 text-xl font-semibold text-blue-600">IMS</span>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-r-0"
      />
      <div
        onClick={toggleCollapsed}
        className={`absolute bottom-0 w-full p-3 flex justify-center items-center bg-white hover:bg-blue-50 cursor-pointer transition-colors duration-200`}
      >
        <IoIosArrowForward
          size={20}
          className={`text-blue-600 ${
            collapsed ? "" : "rotate-180"
          } transition-transform duration-200`}
        />
      </div>
    </Sider>
  );
};

// Header Component
const Header: React.FC = () => (
  <div className="bg-white shadow-sm py-3 px-6 flex items-center justify-end gap-4">
    <div className="flex items-center gap-4">
      <GoBell
        className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
        size={20}
      />
      <IoSettingsOutline
        className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
        size={20}
      />
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <LiaUser size={20} className="text-gray-600" />
        </div>
        <span className="text-sm font-medium text-gray-700">John Doe</span>
      </div>
      <TbGridDots
        className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
        size={20}
      />
    </div>
  </div>
);

// Main App Component
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(() => {
    // Initialize from localStorage, default to false if not set
    const storedValue = localStorage.getItem("sidebarCollapsed");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Update localStorage whenever collapsed changes
  React.useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <Layout className="min-h-screen">
      <Sidebar
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout>
        <Header />
        <Content
          className="m-4 mb-0 p-6 bg-white rounded-xl shadow-sm overflow-auto"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <Routes>
            <Route path={ROUTES.home} element={<DashboardScreen />} />
            <Route path={ROUTES.item} element={<ItemScreen />} />
            <Route path={ROUTES.user} element={<UserScreen />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

// App Wrapper with Authentication
const AppWrapper: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginScreen />}
        />
        <Route
          path="/*"
          element={isAuthenticated ? <App /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
