import React, { useState, useEffect, useContext } from "react";
import { Tag, Select, Icon, Button, Input } from "antd";
import { ModalState } from "./modalState";

export function Columns(upToDate: any, medScape: any) {
  const [value, setValue] = useState();
  const [option, setOption] = useState([]);
  const { modal, setModal } = useContext(ModalState);

  function ShowModal(record: any) {
    console.log("upName / medName / record", record);

    setModal({
      ...modal,
      record: record,
      // upId: upName === undefined ? "" : upName,
      // medId: medName === undefined ? "" : medName,
      // upToDateValue: upName,
      // medScapeValue: medName,
      visible: true
    });
  }

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
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: "10%",

      // ...getColumnSearchProps("cPrice")
      render: function(index: number, record: any) {
        return (
          <div>
            <Button
              // type="primary"
              icon="edit"
              size="default"
              style={{ background: "#F6CC08" }}
              onClick={() => ShowModal(record)}
            />
          </div>
        );
      }
    }
  ];

  return columns;
}
