import React, { useState } from "react";
import "./App.css";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import "antd/dist/antd.css";

import { TableDRG } from "./components/Table";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [state, setState] = useState(true);

  function onCollapse() {
    setState(!state);
  }

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
        <Sider
          collapsible
          collapsed={state}
          onCollapse={onCollapse}
          style={{ direction: "rtl", position: "sticky" }}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" className="icon" />
              <span>منو ۱</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" className="icon" />
              <span>منو ۲</span>
            </Menu.Item>

            <Menu.Item key="9">
              <Icon type="file" className="icon" />
              <span>منو ۳</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ direction: "rtl" }}>
          <Header style={{ width: "100%", background: "#fff" }}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">صفحه اصلی</Menu.Item>
              <Menu.Item key="2">جستجو</Menu.Item>
              <Menu.Item key="3">خدمات ویژه</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: "0 16px", direction: "ltr" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

            <div>
              <TableDRG />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Drugoo 2020</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
