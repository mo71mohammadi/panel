import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Modal,
  Button,
  Divider,
  Drawer,
  Icon,
  Input,
  Popconfirm,
  Tag,
  Select,
  message
} from "antd";
import axios from "axios";
import { ModalState } from "./modalState";
import { ValueState } from "./valueState";

export function Columns() {
  const { modal, setModal } = useContext(ModalState);
  const { value, setValue } = useContext(ValueState);

  // const [modal, setModal] = useState({
  //   data: { name: "", route: "", code: "", ddd: "" },
  //   ModalText: "Content of the modal",
  //   visible: false,
  //   confirmLoading: false
  // });
  // const [value, setValue] = useState({
  //   L1: { enName: "", faName: "", shortName: "" },
  //   L2: { enName: "", faName: "", shortName: "" },
  //   L3: { enName: "", faName: "", shortName: "" },
  //   L4: { enName: "", faName: "", shortName: "" },
  //   L5: { enName: "", faName: "", shortName: "" },
  //   ddd: { admRoute: "", dose: "", unit: "" }
  // });
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            const searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys}
          // onChange={}
          // onPressEnter={HandleSearch}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          // onClick={HandleSearch}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          // onClick={() => {
          //   clearFilters();
          //   const filter: any = filters;
          //   delete filter[dataIndex];
          //   setFilters({ ...filters, ...filter });
          //   HandleReset();
          // }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => <Icon type="search" />

    // render: (text: any) => (searchedColumn === dataIndex ? searchText : text)
  });

  const columns = [
    {
      title: "enName",
      dataIndex: "enName",
      key: "enName",
      ...getColumnSearchProps("enName")
    },
    {
      title: "enRoute",
      dataIndex: "enRoute",
      key: "enRoute",
      render: function tag(params: any) {
        return <Tag color={"green"}>{params}</Tag>;
      },
      ...getColumnSearchProps("enRoute")
    },
    {
      title: "ATCsCode",
      dataIndex: "atc[0].code",
      key: "atc[0].code",
      // ...getColumnSearchProps("PackageCount")
      render: (params: number, record: any) => {
        const listItems = record.atc.map((item: any) => {
            if (item.code) {
                return  (
                    <Tag
                        onClick={() =>
                            HandleDrawer({
                                name: record.enName,
                                route: record.enRoute,
                                ...item
                            })
                        }
                        key={item.code}
                    >
                        {item.code}
                    </Tag>
                )
            }
        });
        return (
          <>
            {listItems}
            <Tag
              onClick={() =>
                HandleDrawer({
                  name: record.enName,
                  route: record.enRoute
                })
              }
              color={"red"}
            >
              +
            </Tag>
          </>
        );
      }
    }
  ];

  const HandleDrawer = (params: any) => {
    if (params.code) {
      let ddd: any;
      if (!params.ddd) ddd = { admRoute: "", dose: "", unit: "" };
      else {
        const List = params.ddd.split(" ");
        ddd = { admRoute: List[2], dose: List[0], unit: List[1] };
      }
      axios({
        method: "get",
        url: `http://localhost:5000/api/atc/get?shortName=${params.code}`
      })
        .then((res: { data: any }) => {
          setValue({ ...value, ...res.data, ddd: { ...ddd } });
          // message.success(`Item ${res.data} `);
        })
        .catch(res => message.error(`Item ${res.data} `));
    }else {
        setValue({
            L1: { enName: "", faName: "", shortName: "" },
            L2: { enName: "", faName: "", shortName: "" },
            L3: { enName: "", faName: "", shortName: "" },
            L4: { enName: "", faName: "", shortName: "" },
            L5: { enName: "", faName: "", shortName: "" },
            ddd: { admRoute: "", dose: "", unit: "" }
        });
    }
    setModal({ ...modal, data: params, visible: true });
  };

  return columns;
}
