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
        return <Tag color={"red"}>{params}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "upToDateId",
      dataIndex: "upToDateId",
      key: "upToDateId"
      // ...getColumnSearchProps("PackageCount")
    },
    {
      title: "medScapeId",
      dataIndex: "medScapeId",
      key: "medScapeId"
      // ...getColumnSearchProps("cPrice")
    },
   
    
  ];

  return columns;
}
