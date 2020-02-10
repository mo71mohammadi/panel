import React, { useState, Fragment, useContext } from "react";
import "./App.css";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PageManager } from "./pageManager";
import SubMenu from "antd/lib/menu/SubMenu";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [state, setState] = useState(false);

  function onCollapse() {
    setState(!state);
  }

  return (
    <Router>
      <div className="App">
        <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
          <Sider
            collapsible
            width={160}
            reverseArrow={true}
            collapsed={state}
            onCollapse={onCollapse}
            style={{
              direction: "ltr",
              position: "relative",
              right: 0
            }}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["10"]}
              mode="inline"
              style={{
                direction: "rtl",
                textAlign: "right",
                position: "relative",
                top: 0
              }}
            >
              <div className="logo" style={{ marginBottom: 64 }} />

              <Menu.Item key="1">
                <Icon type="pic-left" />
                <span style={{ margin: 8 }}>{"تمام آیتم ها"}</span>
                <Link to="/" />
              </Menu.Item>

              <Menu.Item key="2">
                <Icon type="barcode" />
                <span style={{ margin: 8 }}>{" ATCs "}</span>
                <Link to="/ATCs" />
              </Menu.Item>

              <Menu.Item key="3">
                <Icon type="vertical-align-middle" />
                <span style={{ margin: 8 }}>{"تداخلات"}</span>
                <Link to="/Interaction" />
              </Menu.Item>

              <Menu.Item key="4">
                <Icon type="strikethrough" />
                <span style={{ margin: 8 }}>{"قیمت ها"}</span>
                <Link to="/Prices" />
              </Menu.Item>

              <Menu.Item key="5">
                <Icon type="user" />
                <span style={{ margin: 8 }}>{"ورود"}</span>
                <Link to="/Login" />
              </Menu.Item>

              <Menu.Item key="6">
                <Icon type="user" />
                <span style={{ margin: 8 }}>{"عضویت"}</span>
                <Link to="/SignUp" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <div style={{ margin: 16 }}>
              <Content style={{ direction: "ltr" }}>
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
