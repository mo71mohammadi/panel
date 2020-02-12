import React, { useState } from "react";
import { Tag } from "antd";
import Search from "antd/lib/input/Search";
import axios from "axios";

export function Columns(params: any) {
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
      key: "upToDateId",
      editable: true,
      render: function(index: number, record: any) {
        let Name: any = [{ name: "", id: "" }];
        if (index) Name = params.find((id: any) => id.id === index);

        return (
          <Search
            placeholder={Name.name}
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        );
      }

      // ...getColumnSearchProps("PackageCount")
    },
    {
      title: "medScapeId",
      dataIndex: "medScapeId",
      key: "medScapeId"
      // ...getColumnSearchProps("cPrice")
    }
  ];

  return columns;
}
