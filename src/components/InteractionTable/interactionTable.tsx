import React, { useEffect, useState } from "react";
import { Table, Alert, message } from "antd";
import axios from "axios";
import { Columns } from "./columns";
import { ModalState } from "./modalState";
import ModalBody from "./modalBody";

export default function InteractionTable() {
  const [tableData, setTableData] = useState([]);
  const [upToDate, setUpToDate] = useState([]);
  const [medScape, setmedScape] = useState([]);
  const [pagi, setPagi] = useState({ pageSize: 10, pageCurrent: 1 });
  const [count, setCount] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const { modal } = React.useContext(ModalState);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://45.92.95.69:5000/api/upToDate/name",
      data: {}
    })
      .then((res: any) => {
        setUpToDate(res.data);
      })
      .catch(() => console.log("Get upToDate Data Fail"));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://45.92.95.69:5000/api/medScape/name",
      data: {}
    })
      .then((res: any) => {
        setmedScape(res.data);
      })
      .catch(() => console.log("Get upToDate Data Fail"));
  }, []);

  useEffect(() => {
    setLoading(true);

    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/drugs/interaction",
      data: { size: pagi.pageSize, page: pagi.pageCurrent }
    })
      .then((res: { data: any }) => {
        setTableData(res.data.data);
        setCount({ total: res.data.count });
        setLoading(false);
      })
      .catch(() => console.log("Get Data Fail"));
  }, [pagi.pageCurrent, modal.reset]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagi({
      pageSize: pagination.pageSize,
      pageCurrent: pagination.current
    });
  };


  return (
    <div style={{ background: "#fafafa" }}>
      <div>
        {ModalBody(upToDate, medScape)}

        <Table
          loading={loading}
          rowKey={(record: any) => {
            return record.tableData;
          }}
          size="small"
          columns={Columns(upToDate, medScape)}
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
        <Alert
          style={{ width: "50%" }}
          message={`Total item in database is ${count.total} `}
          type="success"
        />
      </div>
    </div>
  );
}
