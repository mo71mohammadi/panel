import React, { useEffect, useState, useContext } from "react";
import { Table, Alert, Button, Upload, message } from "antd";
import axios from "axios";
import { TableData } from "./StateManager/tableDataState";
import { SearchState } from "./StateManager/searchState";
import { pagination } from "./StateManager/paginationState";
import { Columns } from "./columns";
import { CountState } from "./StateManager/countState";
import { Selecto } from "./selection";
import { CSVLink } from "react-csv";

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
    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/drugs/getAll",
      data: { size: 20 }
    })
      .then((res: { data: any }) => {
        setTableData(res.data.data);
      })
      .catch(() => console.log("Get Data Fail"));

    setAction({
      ...action,
      isExport: false
    });

    console.log("tableData", tableData);
  }

  const handelExport = () => {
    const filter: any = {};
    filter[action.subject] = action.input[0];
    axios
      .post("http://45.92.95.69:5000/api/drugs/export", filter, {
        responseType: "blob"
      })
      .then((response: any) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "dugs.xlsx"); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  const props = {
    name: "file",
    action: "http://45.92.95.69:5000/api/drugs/export",
    headers: {
      "content-type": "multipart/form-data"
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

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
        <CSVLink
          data={tableData}
          filename={"drgExport.xlsx"}
          style={{ marginRight: 16 }}
        >
          <Button style={{ width: "100%", marginLeft: 16 }}>
            {"Export Based Search"}
          </Button>
        </CSVLink>
        <Upload {...props} style={{ width: "25%", marginLeft: 16 }}>
          <Button style={{ width: "100%", marginLeft: 0 }} type="default" block>
            Import
          </Button>
        </Upload>
        ,
      </div>
      ;
      <div>
        <Alert
          message={`Total item in database is ${action.num} `}
          type="success"
        />
      </div>
    </>
  );
};
