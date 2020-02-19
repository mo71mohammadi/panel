import React, { useState, useEffect } from "react";
import { Tag, Select, Icon, Button, Input } from "antd";
import { ModalState } from "./modalState";

export function Columns(upToDate: any, medScape: any) {
  const [value, setValue] = useState();
  const [option, setOption] = useState([]);
  const { modal, setModal } = React.useContext(ModalState);

  function ShowModal(name: any, record: any) {
    setModal({
      isRecord: record,
      idRecord: name,
      isModal: true,
      isConfirm: false
    });
    console.log("Index isRecord", name, record);
  }

  const handleClick = () => {
    setOption([]);
    setValue(null);
  };
  const columns = [
    {
      title: "enName",
      dataIndex: "enName",
      key: "enName",
      width: "30%"

      //...getColumnSearchProps("IRC")
    },
    {
      title: "enRoute",
      dataIndex: "enRoute",
      key: "enRoute",
      render: function tag(param: any) {
        return <Tag>{param}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "upToDateId",
      dataIndex: "upToDateId",
      key: "upToDateId",
      width: "30%",

      render: function(index: number, record: any) {
        let name = { name: "", id: "" };
        name = upToDate.find((item: any) => item.id === record.upToDateId);

        if (name) {
          return (
            <div
              // onClick={handleClick}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Tag color="purple">{name.name}</Tag>
            </div>
          );
        }
      }
      // ...getColumnSearchProps("PackageCount")
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: "10%",

      // ...getColumnSearchProps("cPrice")
      render: function(index: number, record: any) {
        let name = { name: "", id: "" };
        name = upToDate.find((item: any) => item.id === record.upToDateId);
        return (
          <div>
            <Button
              type="primary"
              icon="edit"
              size="default"
              onClick={() => ShowModal(name, record)}
            />
          </div>
        );
      }
    },
    {
      title: "medScapeId",
      dataIndex: "medScapeId",
      key: "medScapeId",

      render: function(index: number, record: any) {
        let name = { name: "", id: "" };
        name = medScape.find(
          (item: any) => item.id.toString() === record.medScapeId
        );

        if (name) {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Tag color="purple">{name.name}</Tag>
            </div>
          );
        }
      }

      // ...getColumnSearchProps("cPrice")
    }
  ];

  return columns;
}
