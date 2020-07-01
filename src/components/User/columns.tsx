import React, { useState, useEffect, useContext } from "react";
import { Tag, Switch, Select, Icon, Button, Input, Divider, Popconfirm } from "antd";
import axios from "axios";
import { ModalState } from "./modalState";
import { Row, Col, message, Alert, Modal } from "antd";
import Cookies from "js-cookie";

export function Columns() {
  const updateUrl = 'http://ehrs.ir/api/user/';
  const { modal, setModal } = useContext(ModalState);

  function ShowModal(record: any) {
    setModal({
      ...modal, title: 'Update User', record: record, visible: true
    })
  }
  function ShowPassModal(record: any) {
    setModal({
      ...modal, record: { ...modal.record, _id: record._id }, visiblePass: true
    })
  }
  const HandleDelete = (record: any) => {
    axios({
      method: "delete",
      url: updateUrl + record._id,
      headers: {Authorization: Cookies.get("Authorization")}
    }).then((res: any) => {
      message.info("delete successfully ");
      setTimeout(() => {
        setModal({ ...modal, reset: modal.reset + 1 });
      }, 50)
    }).catch((error) => {
      message.error(error.response.data.error);
    });
  };
  const onChangeActive = (value: any, record: any) => {
    axios({
      method: "put",
      url: updateUrl + record._id,
      data: { active: value },
      headers: {Authorization: Cookies.get("Authorization")}
    }).then((res: any) => {
      message.info("Update successfully ");
    }).catch((error) => {
      message.error(error.response.data.error);
    });
  };
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      // width: "30%"

      //...getColumnSearchProps("IRC")
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: function tag(param: any) {
        return <Tag>{param}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: function tag(param: any) {
        return <Tag color="red">{param}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: function tag(active: any, record: any) {
        return <Switch defaultChecked={active} onChange={(e) => onChangeActive(e, record)}></Switch>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: "15%",

      // ...getColumnSearchProps("cPrice")
      render: function (index: number, record: any) {
        return (
          <div>
            <Button
              // type="primary"
              icon="edit"
              size="default"
              style={{ background: "#a0d911" }}
              onClick={() => ShowModal(record)}
            />
            {/* <Divider type="vertical" /> */}

            <Button
              // type="primary"
              icon="key"
              size="default"
              style={{ background: "#fa8c16" }}
              onClick={() => ShowPassModal(record)}
            />
            {/* <Divider type="vertical" /> */}

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => HandleDelete(record)}
            >
              <Button
                icon="delete"
                size="default"
                style={{ background: "#f5222d" }}
              />
            </Popconfirm>
          </div>
        );
      }
    }
  ];

  return columns;
}
