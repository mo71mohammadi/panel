import React, { useEffect, useState, useContext } from "react";
import { Table, Alert, Button, Upload, message } from "antd";
import axios from "axios";
import { Columns } from "./columns";

export default function InteractionTable() {
  const [tableData, setTableData] = useState([
    {
      enName: "",
      enRoute: "",
      upToDateId: "",
      medScapeId: ""
    }
  ]);
  const [state, setstate] = useState([{ name: "", id: "" }]);

  const [pagi, setPagi] = useState({
    pageSize: 10,
    pageCurrent: 1
  });
  const [count, setCount] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/drugs/interaction",
      data: { size: pagi.pageSize, page: pagi.pageCurrent }
    })
      .then((res: { data: any }) => {
        setTableData(res.data.data);
        // console.log("res.data.data", res.data.data);
        setCount({ total: res.data.count });
        setLoading(false);

        axios({
          method: "GET",
          url: "http://45.92.95.69:5000/api/upToDate/name",
          data: {}
        })
          .then((resp: { data: any }) => {
            setstate(resp.data);
            // console.log("resp.data", resp.data);
          })
          .catch(() => console.log("Get upToDate Data Fail"));
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

  for (let index = 0; index < 10; index++) {
    const element = state.find((id: any) => id.id === tableData[index]);

    console.log(" element", element);

    //const DATA = state.find(id => id.id === element.upToDateId);
    //console.log(" DATA", DATA);
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
