import React, { useState, useEffect, useContext } from "react";
import { ModalState } from "./modalState";
import { Select, Button, Row, Col, message, Alert, Modal, Input } from "antd";
import axios from "axios";
import { UserOutline } from '@ant-design/icons';

export default function PassModal() {

  const { modal, setModal } = useContext(ModalState);
  const [password, setPassword] = useState('')
  useEffect(() => {
    setPassword('')
  }, [modal.visiblePass])

  const HandleOk = () => {
    if (password) {
      axios({
        method: "put",
        url: "http://45.92.95.69:5000/api/user/" + modal.record._id,
        data: { password: password }
      }).then((res: any) => {
        message.info("updated successfully ");
      }).catch(() => console.log("Get upToDate Data Fail"));
    }
    setTimeout(() => {
      setModal({ ...modal, confirmLoading: false, visiblePass: false });
    }, 1)
  }
  const HandleChange = (e: any) => {
    setPassword(e.target.value)
  }

  function HandleCancel(params: any) {
    setModal({ ...modal, visiblePass: false });
  }

  return (
    <Modal
      title="Change Password"
      visible={modal.visiblePass}
      onOk={HandleOk}
      confirmLoading={modal.confirmLoading}
      onCancel={HandleCancel}

    >
      <Row gutter={[0, 24]} style={{ width: "100%" }}>
        <Col span={24}>
          <Input value={password} onChange={(e: any) => HandleChange(e)} placeholder="Password" />
        </Col>
      </Row>
    </Modal>
  );
}
