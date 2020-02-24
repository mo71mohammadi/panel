import React, { useState } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
let id = 0;

export default function NormalLoginForm(params: any) {
  const [state, setstate] = useState([{}]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const keys = state;
    const nextKeys = keys.concat(id++);
    setstate(nextKeys);
  };

  function Remove(params: any) {
    if (state.length === 1) {
      return;
    }

    setstate(state.filter((key: any) => key !== params));
  }

  console.log(state);

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center"
      }}
    >
      {state.map((i, index) => (
        <Row>
          <Col span={12}>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              key={index}
              required={true}
              style={{ marginBottom: 8 }}
            />
          </Col>

          <Col span={12}>
            {state.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => Remove(i)}
              />
            ) : null}
          </Col>
        </Row>
      ))}

      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        onClick={handleSubmit}
      >
        Add New
      </Button>
    </div>
  );
}

export const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
