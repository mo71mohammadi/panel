import React, { useState, Fragment, useContext } from "react";
import "./App.css";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PageManager } from "./pageManager";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [state, setState] = useState(true);

  function onCollapse() {
    setState(!state);
  }

  return (
    <Router>
      <div className="App">
        <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
          <Sider
            collapsible
            collapsed={state}
            onCollapse={onCollapse}
            style={{ direction: "rtl", position: "sticky" }}
          >
            <div className="logo" />

            <Menu theme="dark" defaultSelectedKeys={["10"]} mode="inline">
              <Menu.Item key="0"></Menu.Item>

              <Menu.Item key="1">
                <Icon type="pic-left" />
                <span style={{ margin: 8 }}>All Items</span>
                <Link to="/" />
              </Menu.Item>

              <Menu.Item key="2">
                <Icon type="form" />
                <span style={{ margin: 8 }}>Edit</span>
                <Link to="/edit" />
              </Menu.Item>

              <Menu.Item key="3">
                <Icon type="barcode" />
                <span style={{ margin: 8 }}>ATC</span>
                <Link to="/edit" />
              </Menu.Item>

              <Menu.Item key="4">
                <Icon type="vertical-align-middle" />
                <span style={{ margin: 8 }}>Intraction</span>
                <Link to="/edit" />
              </Menu.Item>

              <Menu.Item key="5">
                <Icon type="strikethrough" />
                <span style={{ margin: 8 }}>Prices</span>
                <Link to="/edit" />
              </Menu.Item>

              <Menu.Item key="6">
                <Icon type="desktop" />
                <span style={{ margin: 8 }}>Edit</span>
                <Link to="/edit" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <div style={{ margin: 16 }}>
              <Content style={{ margin: "0 16px", direction: "ltr" }}>
                <PageManager />
              </Content>
              <Footer style={{ textAlign: "center" }}>Drugo 2020</Footer>
            </div>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
