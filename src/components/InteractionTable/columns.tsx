import React, { useState, useEffect } from "react";
import Search from "antd/lib/input/Search";
import { Tag, Select, Icon, Button } from "antd";
const { Option } = Select;

export function Columns(params: any) {
  const [state, setState] = useState({ name: "", id: "" });
  const [value, setValue] = useState([{ name: "", id: "" }]);
  const [isTrue, setIsTrue] = useState(false);
  const [reco, setreco] = useState();

  function handleSearch(type: any) {
    console.log("type", type);

    const selectItem = params.filter(
      (word: any) =>
        word.name
          .toString()
          .toLowerCase()
          .search(`^${type.toLowerCase()}`) > -1
    );
    console.log("selectItem", selectItem);

    setValue(selectItem.slice(0, 10));
  }
  console.log("value", value);

  function HandleChange(paramo: any, indexo: any) {
    console.log("title", indexo.props);
    setIsTrue(true);
    setState({ name: indexo.props.title, id: indexo.props.value });
  }
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
      render: function tag(param: any) {
        return <Tag color={"red"}>{param}</Tag>;
      }
      // ...getColumnSearchProps("GTIN")
    },
    {
      title: "upToDateId",
      dataIndex: "upToDateId",
      key: "upToDateId",
      render: function(index: number, record: any) {
        let Name: any = { name: "", id: "" };

        if (index) {
          Name = params.find((item: any) => item.id === record.upToDateId);
        }

        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Select
              showSearch
              defaultValue={Name.name}
              value={Name.name}
              placeholder={Name.name}
              style={{
                width: "75%",
                maxWidth: "75%",
                minWidth: "75%",
                marginRight: 8
              }}
              defaultActiveFirstOption={true}
              showArrow={true}
              onSearch={handleSearch}
              filterOption={true}
              onChange={(e: any, title: any) => HandleChange(e, title)}
              notFoundContent={null}
              onFocus={() => handleSearch}
            >
              {value.map((i: any) => (
                <Option value={i.name} key={i} title={i.name}>
                  {i.name}
                </Option>
              ))}
            </Select>
            <Button
              type="ghost"
              icon="check"
              size={"default"}
              style={{
                marginRight: 8,
                width: "25%",
                color: "#fafafa",
                background: "#29BEB0"
              }}
            />
          </div>
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

  // const handleClick = () => {
  //   setValue({...Name});
  //
  // };
  return columns;
}
