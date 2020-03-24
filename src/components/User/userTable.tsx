import React, { useEffect, useState, useContext } from "react";
import { Table, Alert, message, Button, Divider } from "antd";
import axios from "axios";
import { Columns } from "./columns";
import ModalBody from "./modalBody";
import PassModal from "./passModal";
import { ModalState } from "./modalState";

export default function UserTable() {
  const [tableData, setTableData] = useState([]);
  const [pagi, setPagi] = useState({ pageSize: 10, pageCurrent: 1 });
  const [count, setCount] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const { modal, setModal } = useContext(ModalState)

  useEffect(() => {
    setLoading(true);
    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/users",
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

  const handleClickAdd = () => {
    setModal({
      ...modal, title: 'Add New User', visible: true
    })

  }

  return (
    <div style={{ background: "#fafafa" }}>
      <div>
        {ModalBody()}
        {PassModal()}

        <Table
          loading={loading}
          rowKey={(record: any) => {
            return record.tableData;
          }}
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
        <Alert
          style={{ width: "50%" }}
          message={`Total User in database is ${count.total} `}
          type="success"
        />
        <Divider type="vertical" />

        <Button
          style={{ width: "50%", marginRight: 4 }}
          type="primary"
          block
          icon="user"
          size="large"
          onClick={() => handleClickAdd()}
        >
          {"Add New User"}
        </Button>

      </div>
    </div>
  );
}
