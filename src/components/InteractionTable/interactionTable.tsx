import React, { useEffect, useState } from "react";
import { Table, Alert, Modal } from "antd";
import axios from "axios";
import { Columns } from "./columns";
import { ModalState } from "./modalState";
import ModalBody from "./modalBody";

export default function InteractionTable() {
  const [tableData, setTableData] = useState([]);
  const [state, setState] = useState([{ name: "", id: "" }]);
  const [pagi, setPagi] = useState({ pageSize: 10, pageCurrent: 1 });
  const [count, setCount] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const { modal, setModal } = React.useContext(ModalState);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://45.92.95.69:5000/api/upToDate/name",
      data: {}
    })
      .then((resp: any) => {
        setState(resp.data);
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
  }, [pagi.pageCurrent]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagi({
      pageSize: pagination.pageSize,
      pageCurrent: pagination.current
    });
  };

  function HandleOk(params: any) {
    setModal({ ...modal, isConfirm: true });

    setTimeout(() => {
      setModal({ ...modal, isModal: false, isConfirm: false });
    }, 2000);
  }

  function HandleCancel(params: any) {
    setModal({ ...modal, isModal: false, isConfirm: false });
  }

  return (
    <div style={{ background: "#fafafa" }}>
      <div>
        <Modal
          title="Update Interaction"
          visible={modal.isModal}
          onOk={HandleOk}
          confirmLoading={modal.isConfirm}
          onCancel={HandleCancel}
        >
          {ModalBody(state)}
        </Modal>

        <Table
          loading={loading}
          rowKey={(record: any) => {
            return record.tableData;
          }}
          size="small"
          columns={Columns(state)}
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
