import React, { useContext, useState } from "react";
import {
  Input,
  Button,
  Icon,
  Divider,
  Popconfirm,
  Drawer,
  Tag,
  Alert
} from "antd";
import { SearchState } from "./StateManager/searchState";
import { TableData } from "./StateManager/tableDataState";
import axios from "axios";
import { message } from "antd";
import { ValueState } from "./StateManager/valueState";

export function Columns() {
  const { tableData, setTableData } = useContext(TableData);
  const { action, setAction } = React.useContext(SearchState);
  const { valueState, setValueState } = useContext(ValueState);
  const [filters, setFilters] = useState({});

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
          onChange={e => {
            setSelectedKeys(e.target.value);
            const filter: any = { page: 1 };
            filter[dataIndex] = e.target.value;
            setFilters({ ...filters, ...filter });
          }}
          onPressEnter={HandleSearch}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={HandleSearch}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            clearFilters();
            const filter: any = filters;
            delete filter[dataIndex];
            setFilters({ ...filters, ...filter });
            HandleReset();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => <Icon type="search" />
  });
  const columns = [
    {
      title: "eRx",
      dataIndex: "eRx",
      key: "eRx",
      ...getColumnSearchProps("eRx")
    },
    {
      title: "packageCode",
      dataIndex: "packageCode",
      key: "packageCode",
      render: function tag(params: any) {
        return <Tag color={"geekblue"}>{params}</Tag>;
      },
      ...getColumnSearchProps("packageCode")
    },
    {
      title: "genericCode",
      dataIndex: "genericCode",
      key: "genericCode",
      ...getColumnSearchProps("genericCode")
    },
    {
      title: "enBrandName",
      dataIndex: "enBrandName",
      key: "enBrandName",
      ...getColumnSearchProps("enBrandName")
    },
    {
      title: "enName",
      dataIndex: "enName",
      key: "enName",
      ...getColumnSearchProps("enName")
    },
    {
      title: "producer",
      dataIndex: "producer",
      key: "producer",
      ...getColumnSearchProps("producer")
    },
    {
      title: "ACT",
      dataIndex: "ACT",
      key: "ACT",
      ...getColumnSearchProps("ACT"),
      render: function(index: number, record: any) {
        return (
          <div>
            <Button>Go</Button>
          </div>
        );
      }
    },
    {
      title: "Action",
      key: "action",
      render: function(index: number, record: any) {
        return (
          <>
            <Button
              type="default"
              shape="circle"
              icon="edit"
              onClick={() => HandleDrawer(record)}
            ></Button>

            <Divider type="vertical" />

            {tableData.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => HandleDelete(record)}
              >
                <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
              </Popconfirm>
            ) : null}
          </>
        );
      }
    }
  ];

  function HandleDrawer(params: any) {
    setValueState(params);
    setAction({ ...action, isDraw: true });
  }
  function HandleDelete(params: any) {
    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/drugs/delete",
      data: { _id: params._id }
    })
      .then((res: { data: any }) => {
        setAction({
          ...action,
          isDelete: !action.isDelete
        });

        message.success(`Item ${res.data} `);
      })
      .catch(res => message.error(`Item ${res.data} `));
  }
  function HandleSearch() {
    setAction({ ...action, filters: filters });
  }
  function HandleReset() {
    setAction({ ...action, filters: { ...filters } });
  }
  return columns;
}
