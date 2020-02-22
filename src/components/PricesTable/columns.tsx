import React from "react";
import { Tag } from "antd";

export function Columns() {
  const columns = [
    {
      title: "IRC",
      dataIndex: "irc",
      key: "irc"
      //...getColumnSearchProps("IRC")
    },
    {
      title: "GTN",
      dataIndex: "gtn",
      key: "gtn",
      render: function tag(params: any) {
        return <Tag color={"pink"}>{params}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "PackageCount",
      dataIndex: "packageCount",
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
