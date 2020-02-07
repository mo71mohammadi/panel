import React, { useEffect, useState, useContext } from "react";
import { Table, Alert, Button } from "antd";
import axios from "axios";
import { TableData } from "./StateManager/tableDataState";
import { SearchState } from "./StateManager/searchState";
import { pagination } from "./StateManager/paginationState";
import { Columns } from "./columns";
import { CountState } from "./StateManager/countState";
import { Selecto } from "./selection";

export const MainTable = () => {
  const { tableData, setTableData } = useContext(TableData);
  const { action, setAction } = React.useContext(SearchState);

  const { pagi, setPagi } = useContext(pagination);
  const { count, setCount } = useContext(CountState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data: any = {
      size: pagi.pageSize,
      page: pagi.pageCurrent
    };

    const dataExport: any = {};
    dataExport[action.subject] = action.input;

    if (action.isSearch) {
      data[action.subject] = action.input;
    } else {
      console.log("Else IF useEffect", data);
    }

    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/drugs/getAll",
      data: action.isExport ? tableData : data
    })
      .then((res: { data: any }) => {
        setTableData(res.data.data);
        setCount({ total: res.data.count });
        //setnum(res.data.count);
        setLoading(false);

        setAction({ ...action, num: res.data.count });
      })
      .catch(() => console.log("Get Data Fail"));
  }, [
    pagi.pageCurrent,
    action.isDelete,
    action.isSearch,
    action.isExport,
    action.isReset
  ]);

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    const pager = { ...pagination };
    setPagi({
      pageSize: pager.pageSize,
      pageCurrent: pager.current
    });
  }

  function GetAll() {
    setPagi({
      pageSize: pagi.pageSize,
      pageCurrent: 1
    });

    setAction({
      ...action,
      isSearch: false,
      input: action.input,
      isReset: !action.isReset,
      subject: ""
    });
  }

  function HandleExport() {
    setAction({
      ...action,
      isExport: false
    });

    console.log("tableData", tableData);
  }

  function HandleImport() {}
  return (
    <>
      <div style={{ width: "100%", marginBottom: 16 }}>
        <Selecto />
      </div>
      <div>
        <Table
          style={{
            textAlign: "center",
            alignContent: "center",
            alignItems: "center"
          }}
          loading={loading}
          rowKey={record => record.tableData}
          size="small"
          columns={Columns()}
          dataSource={tableData}
          pagination={{
            total: count.total,
            position: "bottom",
            defaultCurrent: 1,
            current: pagi.pageCurrent
          }}
          ///scroll={{ y: 400 }}
          onChange={handleTableChange}
        />
      </div>

      <div
        style={{
          marginTop: 16,
          marginBottom: 16,
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Button
          style={{ width: "25%", marginRight: 4 }}
          type="primary"
          block
          onClick={() => GetAll()}
        >
          Reset Table
        </Button>

        <Button
          style={{ width: "8.3%", marginRight: 4 }}
          type="dashed"
          block
          onClick={HandleExport}
        >
          Export
        </Button>
        <Button
          style={{ width: "8.3%", marginRight: 4 }}
          type="default"
          block
          onClick={HandleImport}
        >
          Import
        </Button>
      </div>
      <div>
        <Alert
          message={`Total item in database is ${action.num} `}
          type="success"
        />
      </div>
    </>
  );
};
