import React, { useState, useEffect, useContext } from "react";
import { ModalState } from "./modalState";
import { Select, Button, Row, Col, message, Alert, Modal, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const { Option } = Select;

export default function ModalBody() {

  const { modal, setModal } = useContext(ModalState);
  const [record, setRecord] = useState({ username: '', email: '', role: '' })
  const option = ['admin', 'basic', 'drugstore']

  const HandleOk = () => {
    if (record.username) {
      axios({
        method: modal.title == "Update User" ? 'put' : 'post',
        url: modal.title == "Update User" ? "http://45.92.95.69:5000/api/user/" + modal.record._id : "http://45.92.95.69:5000/api/signup/",
        data: {
          username: record.username,
          email: record.email,
          role: record.role,
          password: modal.title == "Update User" ? undefined : 'Zxcv4194'
        },
        headers: {Authorization: Cookies.get("Authorization")}
      }).then((res: any) => {
        modal.title == "Update User" ? message.info("Update successfully ") : message.info("User add successfully ");
        setModal({ ...modal, confirmLoading: false, visible: false, reset: modal.reset + 1 });
      }).catch((error) => {
        message.error(error.response.data.error);
      });
    }
    setModal({ ...modal, visible: false });
    setRecord({ username: '', email: '', role: '' })

    // setTimeout(() => {
    //   setModal({ ...modal, confirmLoading: false, visible: false, reset: modal.reset + 1 });
    // }, 1000)
  }

  useEffect(() => {
    setRecord({ username: modal.record.username, email: modal.record.email, role: modal.record.role })
  }, [modal.visible])

  const HandleChange = (e: any, type: String) => {
    if (type == 'username') setRecord({ ...record, username: e.target.value })
    if (type == 'email') setRecord({ ...record, email: e.target.value })
    if (type == 'role') setRecord({ ...record, role: e.props.value })
  }

  function HandleCancel(params: any) {
    setModal({
      ...modal, record: {
        _id: '',
        username: '',
        email: '',
        role: ''
      }, visible: false
    });

  }

  return (
    <Modal
      title={modal.title}
      visible={modal.visible}
      onOk={HandleOk}
      confirmLoading={modal.confirmLoading}
      onCancel={HandleCancel}

    >
      <Row gutter={[0, 24]} style={{ width: "100%" }}>
        <Col span={24}>
          <Input value={record.username} onChange={(e: any) => HandleChange(e, "username")} placeholder="Username" />
        </Col>

        <Col span={24}>
          <Input value={record.email} onChange={(e: any) => HandleChange(e, "email")} placeholder="Email" />
        </Col>

        <Col span={24}>
          <Select
            placeholder={"Role"}
            showSearch
            // defaultValue={record.role ? record.role}
            value={record.role ? record.role : undefined}
            // value={modal.record.medScapeId ? medScape.find((item: any) => item.id.toString() === modal.record.medScapeId).name : ""}
            // placeholder={modal.record.medScapeId ? medScape.find((item: any) => item.id.toString() === modal.record.medScapeId).name : ""}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%"
            }}
            defaultActiveFirstOption={true}
            showArrow={true}
            // onSearch={(e: any) => handleSearch(e, "medScape")}
            filterOption={true}
            onChange={(val: any, e: any) => HandleChange(e, "role")}
            notFoundContent={null}
          >
            {option.map((i: any) => (
              <Option value={i}>
                {i}
              </Option>
            ))}
          </Select>

        </Col>

      </Row>
    </Modal>
  );
}
