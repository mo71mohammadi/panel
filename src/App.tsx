import React, { useState } from "react";
import "./App.css";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
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
          <Layout>
            <Sider
              width={160}
              reverseArrow={true}
              collapsed={state}
              onCollapse={onCollapse}
              style={{
                direction: "ltr",
                position: "relative",
                right: 0,
                background: "#29BEB0",
                borderRadius: 16
                //borderBottomLeftRadius: 16,
                //borderTopLeftRadius: 16
              }}
            >
              <Icon
                type="swap"
                style={{
                  fontSize: "26px",
                  color: "#FAFAFA",
                  marginTop: 32,
                  marginBottom: 32
                }}
                theme="outlined"
                onClick={onCollapse}
              />

              <Menu
                //theme="#50A3D2"
                defaultSelectedKeys={["10"]}
                mode="inline"
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  position: "relative",
                  top: 0,
                  background: "#29BEB0"
                }}
              >
                <Menu.Item key="1">
                  <Icon type="pic-left" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {"تمام آیتم ها"}
                  </span>
                  <Link to="/" />
                </Menu.Item>

                <Menu.Item key="2">
                  <Icon type="barcode" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {" ATCs "}
                  </span>
                  <Link to="/ATCs" />
                </Menu.Item>

                <Menu.Item key="3">
                  <Icon type="vertical-align-middle" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {"تداخلات"}
                  </span>
                  <Link to="/Interaction" />
                </Menu.Item>

                <Menu.Item key="4">
                  <Icon type="strikethrough" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {"قیمت ها"}
                  </span>
                  <Link to="/Prices" />
                </Menu.Item>

                <Menu.Item key="5">
                  <Icon type="login" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {"ورود"}
                  </span>
                  <Link to="/Login" />
                </Menu.Item>

                <Menu.Item key="6">
                  <Icon type="user-add" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {"عضویت"}
                  </span>
                  <Link to="/SignUp" />
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout
              style={{
                margin: 8,
                marginTop: 0,
                paddingRight: 8,
                paddingLeft: 8,
                direction: "ltr"
              }}
            >
              <Header
                style={{
                  marginBottom: 8,
                  background: "#29BEB0",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  //width: "90%",
                  alignSelf: "center"
                }}
              >
                <Icon
                  type="code-sandbox"
                  style={{
                    fontSize: "32px",
                    color: "#FAFAFA"
                  }}
                  theme="outlined"
                  spin
                />
              </Header>

              <Content
                style={{
                  background: "#fafafa",
                  margin: 8,
                  padding: 24,
                  borderRadius: 8,
                  direction: "ltr"
                }}
              >
                <PageManager />
              </Content>
              <Footer style={{ textAlign: "center" }}>Drugo 2020</Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
