import React, { useState, useContext } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import axios from "axios";
import { LoginState } from "./loginState";
import { useHistory, Link } from "react-router-dom";
import SignUp from "../user/signUp";
import { UserState } from "../user/userState";

export default function Login() {
  const [val, setVal] = useState({ username: "", password: "" });
  const { login, setLogin } = useContext(LoginState);
  const { userInfo, setUserInfo } = useContext(UserState);

  let history = useHistory();

  const handleSubmit = (props: any) => {
    console.log(history);

    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/login",
      data: { ...val, email: "test" }
    })
      .then((res: { data: any }) => {
        console.log("res.data", res.data);

        setLogin({
          isAuthenticated: true,
          authorization: res.data.accessToken
        });
        setUserInfo({
          ...userInfo,
          email: res.data.email,
          role: res.data.role
        });
        history.push("/");
      })
      .catch(() => console.log("Get Data Fail"));
  };

  return (
    <>
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
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              type="text"
              required={true}
              style={{ margin: 16, width: "50%" }}
              //value={userInfo.username}
              onChange={(e: any) => {
                setVal({ ...val, username: e.target.value });
                setUserInfo({ ...userInfo, username: e.target.value });
              }}
            />
          </div>
          <div>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              type="password"
              required={true}
              style={{ margin: 16, width: "50%" }}
              //value={userInfo.password}
              onChange={(e: any) => {
                setVal({ ...val, password: e.target.value });
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ margin: 16, width: "50%" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Button style={{ margin: 16, width: "50%" }}>
              <Link to="/SignUp">SignUp</Link>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
