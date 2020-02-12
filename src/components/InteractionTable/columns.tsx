import React, { useState } from "react";
import { Tag } from "antd";
import axios from "axios";
import Search from "antd/lib/input/Search";

export function Columns(state: any) {
  console.log("state", state);

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
      dataIndex: "state.name",
      key: "state.name",
      editable: true,

      render: function tag(params: any) {
        return (
          <Search
            placeholder={params}
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
