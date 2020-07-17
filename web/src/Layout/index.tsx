import React from "react";
import { Layout as AntdLayout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Routes } from "../Routes";

const { Header, Content, Footer, Sider } = AntdLayout;
export const Layout = ({ children }) => (
  <Router>
    <AntdLayout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          {Object.keys(Routes).map((routeName) => (
            <Menu.Item key={routeName} icon={<UserOutlined />}>
              <Link to={Routes[routeName].path}>{Routes[routeName].title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <AntdLayout>
        <Content>
          <div
            className="site-layout-background"
            style={{
              padding: 10,
              minHeight: 500,
              width: 800,
              backgroundColor: "rgba(200, 200, 200, 1)",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", width: 800 }}>
          Adventure Capitalist
        </Footer>
      </AntdLayout>
    </AntdLayout>
  </Router>
);
