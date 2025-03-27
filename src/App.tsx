import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import logoImage from "./assets/images/logo.svg";
import { RxDashboard } from "react-icons/rx";
import { GrBook, GrDocumentPdf, GrDocumentVideo } from "react-icons/gr";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { IoIosArrowForward } from "react-icons/io";
import { LiaUser } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  // 🔄 Use useLocation to get the current URL path
  const location = useLocation();

  // 🗂 Define the menu items
  const items: ItemType<MenuItemType>[] = [
    {
      key: "/",
      icon: <RxDashboard />,
      label: <Link to="/">ផ្ទាំងគ្រប់គ្រងទូទៅ</Link>,
    },
    {
      key: "/document",
      icon: <GrDocumentVideo />,
      label: <Link to="/document">ឯកសារជំនួយ</Link>,
    },
    {
      key: "/book",
      icon: <GrBook />,
      label: <Link to="/book">សៀវភៅកិច្ចតែងការ</Link>,
    },
    {
      key: "/worksheet",
      icon: <GrDocumentPdf />,
      label: <Link to="/worksheet">សន្លឹកកិច្ចការ</Link>,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="overflow-auto h-screen relative"
        style={{ paddingBottom: "56px" }} // Reserve space for the fixed toggle
      >
        <div className="w-full h-12 flex justify-center items-center my-4 cursor-pointer">
          <img className="w-[40px]" src={logoImage} alt="logo" />
          {!collapsed && (
            <div className="text-2xl font-bold ml-2 text-blue-600">IMS</div>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />
        <div className="h-[50px]"></div>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`fixed bottom-0 ${
            collapsed ? "w-[80px]" : "w-[200px]"
          } p-3 flex justify-center items-center bg-white hover:bg-[#E6F4FF] cursor-pointer`}
        >
          {collapsed ? (
            <IoIosArrowForward size={20} color="blue" />
          ) : (
            <IoIosArrowForward
              color="blue"
              size={20}
              style={{ transform: "rotate(180deg)" }}
            />
          )}
        </div>
      </Sider>

      <Layout>
        <div className="bg-white py-2 px-[16px] flex items-center justify-end gap-2">
          <div className="flex items-center gap-3">
            <GoBell size={20} className="cursor-pointer hover:text-blue-600" />
            <IoSettingsOutline
              size={20}
              className="cursor-pointer hover:text-blue-600"
            />
            <div className="w-[30px] h-[30px] bg-slate-300 rounded-full flex justify-center items-center">
              <LiaUser size={24} />
            </div>
            <TbGridDots
              size={20}
              className="cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>
        <Content
          style={{
            margin: "10px",
            padding: 10,
            minHeight: 280,
            borderRadius: borderRadiusLG,
            height: "calc(100vh - 120px)",
            overflow: "auto",
            backgroundColor: "#fff",
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const AppWrapper: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/login" element={<LoginScreen />} />
        ) : (
          <>
            <Route path="/*" element={<App />} />
          </>
        )}
        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppWrapper;
