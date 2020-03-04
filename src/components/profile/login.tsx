import React, { useState, useContext, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, Card } from "antd";
import axios from "axios";
import { LoginState } from "./userState";
import { useHistory, Link } from "react-router-dom";
import Cookies from 'js-cookie'

export default function Login(props: any) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const { login, setLogin } = useContext(LoginState);
  const currentUrl = Cookies.get("currentUrl")
  let history = useHistory();

  const handleLogin = () => {
    console.log(currentUrl)
    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/login",
      data: {
        username: username,
        password: password,
        email: "test"
      }
    })
      .then((res: { data: any }) => {
        setLogin({ ...login, isAuthenticated: true });
        Cookies.set('Authorization', res.data.accessToken, { expires: 1 / 48 });
        if (currentUrl != "/Logout" && currentUrl) history.push(`${currentUrl}`);
      })
      .catch(() => console.log("Get Data Fail"));
  };

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        alignContent: "center"
      }}
    >
      {!login.isAuthenticated ? (
        <div
          style={{
            textAlign: "center",
            alignItems: "center",
            alignContent: "center",
            margin: 128,
            borderRadius: 64
          }}
        >
          <Icon
            type="user"
            style={{
              fontSize: "64px",
              marginTop: 32,
              marginBottom: 32
            }}
            theme="outlined"
          />
          <Form>
            <div>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                type="text"
                required={true}
                style={{ margin: 16, width: "50%" }}
                //value={userInfo.username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
                type="password"
                required={true}
                style={{ margin: 16, width: "50%" }}
                //value={userInfo.password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ margin: 16, width: "50%" }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button style={{ margin: 16, width: "50%" }}>
                <Link to="/SignUp">SignUp</Link>
              </Button>
            </div>
          </Form>
        </div>
      ) : (
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
                  size="default"
                  title="پروفایل"
                  style={{ width: 600, borderRadius: 16 }}
                >
                  <p>
                    {" "}
                    <Input
                      prefix={
                        <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Role"
                      disabled
                      type="text"
                      required={true}
                      style={{ margin: 16, width: "50%" }}
                      value={login.role}
                      onChange={({ target }) =>
                        setLogin({ ...login, role: target.value })
                      }
                    />{" "}
                  </p>
                  <p>
                    {" "}
                    <Input
                      prefix={
                        <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Email"
                      disabled
                      type="text"
                      required={true}
                      style={{ margin: 16, width: "50%" }}
                      value={login.email}
                      onChange={({ target }) =>
                        setLogin({ ...login, email: target.value })
                      }
                    />{" "}
                  </p>
                  <p>
                    <Input
                      prefix={
                        <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Username"
                      disabled
                      type="text"
                      required={true}
                      style={{ margin: 16, width: "50%" }}
                      value={username}
                    // onChange={(username: any) =>
                    //   setLogin({ ...login, username: username })
                    // }
                    />
                  </p>
                  <p>
                    <Input
                      prefix={
                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Password"
                      disabled
                      type="text"
                      required={true}
                      style={{ margin: 16, width: "50%" }}
                      value="********"
                    // onChange={(password: any) =>
                    //   setLogin({ ...login, password: password })
                    // }
                    />
                  </p>
                </Card>
              </Col>
              <Col span={8}></Col>
            </Row>
          </div>
        )}
    </div>
  );
}
