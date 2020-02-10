import React from "react";
import { Tag } from "antd";

export function Columns() {
  const columns = [
    {
      title: "IRC",
      dataIndex: "IRC",
      key: "IRC"
      //...getColumnSearchProps("IRC")
    },
    {
      title: "GTIN",
      dataIndex: "GTIN",
      key: "GTIN",
      render: function tag(params: any) {
        return <Tag color={"pink"}>{params}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "PackageCount",
      dataIndex: "PackageCount",
      key: "PackageCount"
      // ...getColumnSearchProps("PackageCount")
    },
    {
      title: "cPrice",
      dataIndex: "cPrice",
      key: "cPrice"
      // ...getColumnSearchProps("cPrice")
    },
    {
      title: "dPrice",
      dataIndex: "dPrice",
      key: "dPrice"
      // ...getColumnSearchProps("dPrice")
    },
    {
      title: "sPrice",
      dataIndex: "sPrice",
      key: "sPrice"
      //...getColumnSearchProps("sPrice")
    }
  ];

  return columns;
}
