import React, { useEffect, useState, useContext } from "react";
import { Table, Alert, Button, Upload, message } from "antd";
import axios from "axios";
import { Columns } from "./columns";

export default function TablePrices() {
  const [tableData, setTableData] = useState([]);
  const [pagi, setPagi] = useState({
    pageSize: 20,
    pageCurrent: 1
  });
  const [count, setCount] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/drugs/price",
      data: { size: pagi.pageSize, page: pagi.pageCurrent }
    })
      .then((res: { data: any }) => {
        setTableData(res.data.data);
        setCount({ total: res.data.count });
        setLoading(false);
      })
      .catch(() => console.log("Get Data Fail"));
  }, [pagi.pageCurrent]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagi({
      pageSize: pagination.pageSize,
      pageCurrent: pagination.current
    });
  };

  function HandleClick(params: any) {
    console.log("Prices Updated");
  }

  return (
    <div style={{ margin: 24 }}>
      <div>
        <Table
          loading={loading}
          //rowKey={record => record.tableData}
          size="small"
          columns={Columns()}
          dataSource={tableData}
          pagination={{
            total: count.total,
            position: "bottom",
            defaultCurrent: 1,
            current: pagi.pageCurrent
          }}
          scroll={{ x: 600 }}
          onChange={handleTableChange}
        />
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <Button
          style={{ width: "50%", marginRight: 4 }}
          type="primary"
          block
          icon="sync"
          size="large"
          onClick={HandleClick}
        >
          {"Update Prices"}
        </Button>

        <Alert
          style={{ width: "50%" }}
          message={`Total item in database is ${count.total} `}
          type="success"
        />
      </div>
    </div>
  );
}
