import React from "react";
import { Tag } from "antd";

export function Columns() {
  const columns = [
    {
      title: "enName",
      dataIndex: "enName",
      key: "enName"
      //...getColumnSearchProps("IRC")
    },
    {
      title: "enRoute",
      dataIndex: "enRoute",
      key: "enRoute",
      render: function tag(params: any) {
        return <Tag color={"green"}>{params}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "ATCsCode",
      dataIndex: "atc[0].code",
      key: "atc[0].code"
      // ...getColumnSearchProps("PackageCount")
    }
  ];

  return columns;
}
