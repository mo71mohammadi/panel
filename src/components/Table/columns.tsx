import React, { useContext } from "react";
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
import { pagination } from "./StateManager/paginationState";
import axios from "axios";
import { message } from "antd";
import { DrawerState } from "./StateManager/drawerState";
import { DrawerBody } from "./drawerBody";
import { ValueState } from "./StateManager/valueState";
import { PageManager } from "../../pageManager";

import {
  BrowserRouter as Router,
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

export function Columns() {
  const { tableData, setTableData } = useContext(TableData);
  const { pagi, setPagi } = useContext(pagination);
  const { action, setAction } = React.useContext(SearchState);
  const { valueState, setValueState } = useContext(ValueState);

  const { openDrawer, setOpenDrawer } = useContext(DrawerState);

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
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => HandleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => HandleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
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
      ...getColumnSearchProps("genericCode")
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
      title: "Action",
      key: "action",
      render: function(index: number, record: any) {
        function onClose() {
          setOpenDrawer(false);
        }

        return (
          <Router>
            <Icon
              type="edit"
              theme="twoTone"
              onClick={() => HandleDrawer(record)}
            />

            <Drawer
              placement={"left"}
              closable={true}
              onClose={onClose}
              visible={openDrawer}
              width={"40%"}

            >
              <div style={{ marginTop: 12, marginBottom: 8 }}>
                <Alert
                  message={`Edit Item: ${valueState._id}`}
                  type="success"
                />
              </div>
              <div>
                <DrawerBody />
              </div>
            </Drawer>

            <Divider type="vertical" />

            {tableData.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => HandleDelete(record)}
              >
                <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
              </Popconfirm>
            ) : null}
          </Router>
        );
      }
    }
  ];

  function HandlePage(params: any) {
    return (
      <>
        <PageManager />
      </>
    );
  }

  function HandleDrawer(params: any) {
    setValueState(params);
    setOpenDrawer(true);
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

  function HandleSearch(...props: any) {
    const param = { ...props };

    setPagi({
      pageSize: pagi.pageSize,
      pageCurrent: 0
    });

    setAction({
      ...action,
      input: param[0],
      subject: param[2],
      isSearch: true
    });
  }

  const handleReset = (clearFilters: any) => {
    clearFilters();

    setPagi({
      pageSize: pagi.pageSize,
      pageCurrent: 1
    });

    setAction({
      ...action,
      input: action.input,
      subject: action.subject,

      isSearch: false,
      isReset: true,
      isDelete: false,
      isEdit: false,
      num: 0
    });
  };

  return columns;
}
