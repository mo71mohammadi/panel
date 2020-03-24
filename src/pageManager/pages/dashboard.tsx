import React, { useState, useContext, useEffect } from "react";
import { LoginState } from "../../components/Profile/userState";
import { Layout, Icon, Menu } from "antd";
import { Link } from "react-router-dom";
import PageManager from "../pageManager";
import SubMenu from "antd/lib/menu/SubMenu";
import Cookies from 'js-cookie'

const { Header, Sider, Content, Footer } = Layout;

function Dashboard() {
  const [state, setState] = useState(false);
  const { login, setLogin } = useContext(LoginState);
  const Authorization = Cookies.get("Authorization")

  useEffect(() => { Authorization ? setLogin({ ...login, isAuthenticated: true }) : console.log(30) }, []);
  const onCollapse = () => setState(!state)
  const handleSignOut = () => {
    setLogin({ ...login, isAuthenticated: false });
    Cookies.remove("Authorization")
  }

  return (
    <div className="App">
      {login.isAuthenticated || Authorization ? (
        <Layout style={{ minHeight: "100vh", direction: "rtl" }}>
          <Layout>
            <Sider
              width={200}
              reverseArrow={true}
              collapsed={state}
              onCollapse={onCollapse}
              style={{
                direction: "ltr",
                position: "relative",
                right: 0,
                background: "#29BEB0",
                ///borderRadius: 16
                borderBottomLeftRadius: 16,
                borderTopLeftRadius: 16
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
                //defaultSelectedKeys={["sub1"]}
                defaultOpenKeys={["sub3"]}
                mode="inline"
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  position: "relative",
                  top: 0,
                  background: "#29BEB0"
                }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <span>دارویی و مکمل</span>
                    </span>
                  }
                >
                  <Menu.Item key="1">
                    <Icon type="pic-left" />
                    <span style={{ marginBottom: 8, marginRight: 8 }}>
                      {"محصولات"}
                    </span>
                    <Link to="/" />
                  </Menu.Item>

                  <Menu.Item key="2">
                    <Icon type="barcode" />
                    <span style={{ marginBottom: 8, marginRight: 8 }}>
                      {"دسته بندی"}
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
                </SubMenu>

                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <span>تجهیزات پزشکی</span>
                    </span>
                  }
                >
                  <Menu.Item key="devices">
                    <Icon type="medicine-box" />
                    <span style={{ marginBottom: 8, marginRight: 8 }}>
                      {"اتاق عمل"}
                    </span>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <span>کاربران</span>
                    </span>
                  }
                >
                  <Menu.Item key="user" >
                    <Icon type="user" />
                    <span style={{ marginBottom: 8, marginRight: 8 }}>
                      {"پروفایل"}
                    </span>
                    <Link to="/Login" />
                  </Menu.Item>

                </SubMenu>
                <Menu.Item key="logout" onClick={handleSignOut}>
                  <Icon type="logout" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {"خروج"}
                  </span>
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
      ) : (
          <PageManager />
        )}
    </div>
  );
}

export default Dashboard;
