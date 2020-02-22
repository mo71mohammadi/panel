import React, { useEffect, useState } from "react";
import { Table, Alert, Button, message } from "antd";
import axios from "axios";
import { Columns } from "./columns";

export default function PricesTable() {
  const [tableData, setTableData] = useState([]);
  const [pagi, setPagi] = useState({
    pageSize: 20,
    pageCurrent: 1
  });
  const [count, setCount] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(0);


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
  }, [pagi.pageCurrent, reset]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagi({
      pageSize: pagination.pageSize,
      pageCurrent: pagination.current
    });
  };

  function HandleClick(params: any) {
    let url = {url: '', message: ''}
    if (params === "Get") {
      setPagi({...pagi})
      url.url = "http://45.92.95.69:5000/api/drugs/getPrice";
      url.message = 'Prices get successfully'
    }
    else if (params === "Update") {
      url.url = "http://45.92.95.69:5000/api/drugs/updatePrice";
      url.message = 'Prices update successfully'
    }
    setLoading(true);
    axios({
      method: "post",
      url: url.url,
    })
      .then((res: { data: any }) => {
        setLoading(false);
        message.info(url.message)
        if (params === "Get") setTimeout(()=> setReset(reset+1), 1000)

      })
      .catch(() => console.log("Get Data Fail"));

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
          type="danger"
          block
          icon="sync"
          size="large"
          onClick={() => HandleClick('Get')}
        >
          {"Get TTAC Prices"}
        </Button>
        <Button
          style={{ width: "50%", marginRight: 4 }}
          type="primary"
          block
          icon="sync"
          size="large"
          onClick={() => HandleClick("Update")}
        >
          {"Update Prices"}
        </Button>
        {/* <Alert
          style={{ width: "50%" }}
          message={`Total item in database is ${count.total} `}
          type="success"
        /> */}
      </div>
    </div>
  );
}
