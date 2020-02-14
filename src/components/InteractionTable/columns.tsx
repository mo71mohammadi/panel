import React, { useState } from "react";
import Search from "antd/lib/input/Search";
import { Tag, Select, Icon, Button } from "antd";
const { Option } = Select;

export function Columns(params: any) {
  const [state, setState] = useState({ name: "", id: "" });
  const [value, setValue] = useState([]);
  const [isTrue, setIsTrue] = useState(false);

  function handleSearch(type: any) {
    console.log("type", type);

    // const finder = params.filter((word:any) => word.name(type));
    // setValue(finder.slice(0, 10));

    const selectItem = params.find(
      (word: any) =>
        word
          .toString()
          .toLowerCase()
          .search(`^${type.toLowerCase()}`) > -1
    );
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
        if (index) Name = params.find((item: any) => item.id === index);

        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Select
              showSearch
              //defaultValue={Name.name}
              //value={state.name}
              //placeholder={Name.name}
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
              // onFocus={()=> handleSearch}
            >
              {value.map((i: any) => (
                <Option value={i.id} key={i} title={i.name}>
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
