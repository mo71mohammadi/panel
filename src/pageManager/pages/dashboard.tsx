import React, { useState, useContext } from "react";
import { LoginState } from "../../components/login/loginState";
import { Layout, Icon, Menu, Row, Card, Col, Avatar, Input } from "antd";
import { Link, Switch, Route } from "react-router-dom";
import PageManager from "../pageManager";
import ProtectedRoute from "../Route";
import {
  ATCsPage,
  InteractionPage,
  PricesPage,
  SignUpPage,
  EditPage,
  MainPage,
  LoginPage
} from "./index";
import { UserState } from "../../components/user/userState";
const { Header, Sider, Content, Footer } = Layout;
const { Meta } = Card;

function Dashboard(params: any) {
  const [state, setState] = useState(false);
  const { login, setLogin } = useContext(LoginState);
  const { userInfo, setUserInfo } = useContext(UserState);

  function onCollapse() {
    setState(!state);
  }
  return (
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
                  {"محصولات"}
                </span>
                <Link to="/Drugs" />
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

              <Menu.Item key="5">
                <Icon type="logout" />
                <span style={{ marginBottom: 8, marginRight: 8 }}>
                  {"خروج"}
                </span>
                <Link to="/Logout" />
              </Menu.Item>

              {/* <Menu.Item key="6">
                  <Icon type="user-add" />
                  <span style={{ marginBottom: 8, marginRight: 8 }}>
                    {"عضویت"}
                  </span>
                  <Link to="/SignUp" />
                </Menu.Item> */}
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
              <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  alignContent: "center"
                }}
              >
                <Row gutter={16}>
                  <Col span={8}></Col>
                  <Col span={8}>
                    <Card
                      size="small"
                      title="User details"
                      extra={<a href="#">Edit</a>}
                      style={{ width: 300 }}
                    >
                      <p>
                        {" "}
                        <Input
                          prefix={
                            <Icon
                              type="mail"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Email"
                          type="text"
                          required={true}
                          style={{ margin: 16, width: "50%" }}
                          value={userInfo.email}
                          onChange={({ target }) =>
                            setUserInfo({ ...userInfo, email: target.value })
                          }
                        />{" "}
                      </p>
                      <p>
                        <Input
                          prefix={
                            <Icon
                              type="user"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Username"
                          type="text"
                          required={true}
                          style={{ margin: 16, width: "50%" }}
                          value={userInfo.username}
                          onChange={({ target }) =>
                            setUserInfo({ ...userInfo, username: target.value })
                          }
                        />
                      </p>
                      <p>
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Password"
                          disabled
                          type="text"
                          required={true}
                          style={{ margin: 16, width: "50%" }}
                          value={userInfo.password}
                          onChange={({ target }) =>
                            setUserInfo({ ...userInfo, username: target.value })
                          }
                        />
                      </p>
                    </Card>
                  </Col>
                  <Col span={8}></Col>
                </Row>
              </div>
              ,
              {login.isAuthenticated ? (
                <Switch>
                  <ProtectedRoute path="/Drugs" component={MainPage} />
                  <ProtectedRoute path="/ATCs" component={ATCsPage} />
                  <ProtectedRoute
                    path="/Interaction"
                    component={InteractionPage}
                  />

                  <ProtectedRoute path="/Prices" component={PricesPage} />
                  <ProtectedRoute path="/SignUp" component={SignUpPage} />
                  <ProtectedRoute path="/Edit" component={EditPage} />
                </Switch>
              ) : (
                ""
              )}
            </Content>
            <Footer style={{ textAlign: "center" }}>Drugo 2020</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default Dashboard;
