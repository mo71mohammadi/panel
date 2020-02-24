import React, { useState, useContext } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import axios from "axios";
import { LoginState } from "./loginState";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [val, setVal] = useState({ username: '', password: '' });
  const { login, setLogin } = useContext(LoginState);
  let history = useHistory();

  const handleSubmit = (props: any) => {
    console.log(history)

    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/login",
      data: { ...val, email: 'test' }
    })
      .then((res: { data: any }) => {
        setLogin({ isAuthenticated: true, authorization: res.data.accessToken });
        history.push('/')
      })
      .catch(() => console.log("Get Data Fail"));
  };

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center"
      }}
    >
      <Row>
        <Col span={12}>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            // key={index}
            onChange={(e: any) => setVal({ ...val, username: e.target.value })}
            required={true}
            style={{ marginBottom: 8 }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
            // key={index}
            onChange={(e: any) => setVal({ ...val, password: e.target.value })}
            type='password'
            required={true}
            style={{ marginBottom: 8 }}
          />
        </Col>
      </Row>

      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        onClick={handleSubmit}
      >
        Login
      </Button>

    </div>
  );
}

export const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  Login
);
