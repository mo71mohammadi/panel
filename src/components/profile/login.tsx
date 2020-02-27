import React, { useState, useContext, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, Card } from "antd";
import axios from "axios";
import { LoginState } from "./userState";
import { useHistory, Link } from "react-router-dom";

export default function Login() {
  const [val, setVal] = useState({ username: "", password: "" });
  const { login, setLogin } = useContext(LoginState);

  let history = useHistory();

  useEffect(() => {
    const loggedUser = window.sessionStorage.getItem("loggedUser");
    const userName = window.sessionStorage.getItem("UserName");

    if (loggedUser) {
      const userToken = JSON.parse(loggedUser);
      setLogin({
        email: userToken.data.email,
        role: userToken.data.role,
        username: `${userName}`,
        password: "********",
        isAuthenticated: true,
        authorization: userToken.accessToken
      });
    }
  }, []);

  const handleLogin = (props: any) => {
    // console.log(history);

    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/login",
      data: {
        username: login.username,
        password: login.password,
        email: "test"
      }
    })
      .then((res: { data: any }) => {
        // console.log("res.data", res.data);

        setLogin({
          ...login,

          isAuthenticated: true,
          authorization: res.data.accessToken
        });
        window.sessionStorage.setItem("loggedUser", JSON.stringify(res.data));
        window.sessionStorage.setItem("UserName", login.username);
        //history.push("/");
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
                onChange={(e: any) => {
                  setLogin({ ...login, username: e.target.value });
                }}
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
                onChange={(e: any) => {
                  setLogin({ ...login, password: e.target.value });
                }}
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
                style={{ width: 600, borderRadius:16 }}
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
                    value={login.username}
                    onChange={({ target }) =>
                      setLogin({ ...login, username: target.value })
                    }
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
                    onChange={({ target }) =>
                      setLogin({ ...login, password: target.value })
                    }
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
