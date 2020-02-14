import React, { useState, useEffect } from "react";
import Search from "antd/lib/input/Search";
import { Tag, Select, Icon, Button } from "antd";
const { Option } = Select;

export function Columns(params: any) {
  const [value, setValue] = useState();
  const [option, setOption] = useState([]);

  function handleSearch(type: any) {
    const selectItem = params.filter(
      (word: any) =>
        word.name
          .toString()
          .toLowerCase()
          .search(`^${type.toLowerCase()}`) > -1
    );
    setOption(selectItem.slice(0, 10));
  }
  const HandleChange = (val: any, e: any) => setValue(e.key);
  const handleClick = () => {
    setOption([]);
    setValue(null)
  };
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
        let name = {name: '', id: ''};
        name = params.find((item: any) => item.id === record.upToDateId);

        if (name) {
          return (
              <div onClick={handleClick} style={{ display: "flex", flexDirection: "row" }}>
                <Select
                    showSearch
                    // defaultValue={name.name}
                    // value={name.name}
                    placeholder={name.name}
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
                    onChange={((val: any, e: any) => HandleChange(val, e))}
                    notFoundContent={null}
                    // onFocus={() => handleSearch}
                >
                  {option.map((i: any) => (
                      <Option value={i.name} key={i.id}>
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
