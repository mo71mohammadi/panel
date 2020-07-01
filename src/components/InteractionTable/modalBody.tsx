import React, { useState, useEffect, useContext } from "react";
import { ModalState } from "./modalState";
import { Select, Button, Row, Col, message, Alert, Modal } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { Option } = Select;

export default function ModalBody(upToDate: any, medScape: any) {
  const { modal, setModal } = useContext(ModalState);
  const [option, setOption] = useState([]);
  useEffect(() => console.log(modal.record), [])
  function handleSearch(e: any, type: any) {
    const selectItem = (type === "upToDate" ? upToDate : medScape).filter(
      (word: any) =>
        word.name
          .toString()
          .toLowerCase()
          .search(`^${e.toLowerCase()}`) > -1
    );
    setOption(selectItem.sort((a: any, b: any) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1).slice(0, 50));
  }
  const HandleChange = (val: any, e: any) => {
    //console.log("e.key", e.key);
    // console.log("HandleChange", modal);

    val === "upToDate"
      ? setModal({
        ...modal,
        record: { ...modal.record, upToDateId: e.key }
      })
      : setModal({
        ...modal,
        record: { ...modal.record, medScapeId: e.key }
      });
  };
  function HandleOk(params: any) {
    setModal({ ...modal, confirmLoading: true });
    console.log("Data", modal);
    if (modal.record.upToDateId || modal.record.medScapeId) {
      axios({
        method: "POST",
        url: "http://ehrs.ir/api/drugs/updateInteraction",
        data: {
          enName: `${modal.record.enName}`,
          enRoute: `${modal.record.enRoute}`,
          upToDateId: `${modal.record.upToDateId}`,
          medScapeId: `${modal.record.medScapeId}`,
        },
        headers: {Authorization: Cookies.get("Authorization")},
      })
        .then((res: any) => {
          message.info("updated successfully ");
        })
        .catch(() => console.log("Get upToDate Data Fail"));
    }
    setTimeout(() => {
      setModal({ ...modal, confirmLoading: false, visible: false, reset: modal.reset + 1 });
    }, 1000)

  }

  function HandleCancel(params: any) {
    setModal({ ...modal, visible: false });
  }

  return (
    <Modal
      title="Update Interaction"
      visible={modal.visible}
      onOk={HandleOk}
      confirmLoading={modal.confirmLoading}
      onCancel={HandleCancel}

    >
      <Row gutter={[0, 24]} style={{ width: "100%" }}>
        <Col span={24}>
          <Select
            disabled
            suffixIcon={"enName"}
            showSearch
            placeholder={modal.record.enName}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              marginRight: 4
            }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            notFoundContent={null}
          />
        </Col>

        <Col span={24}>
          <Select
            suffixIcon={"enRoute"}
            disabled
            showSearch
            placeholder={modal.record.enRoute}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              marginRight: 4
            }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            onChange={(val: any, e: any) => HandleChange(val, e)}
            notFoundContent={null}
          />
        </Col>

        <Col span={24} onClick={() => setOption([])}>
          <Select
            suffixIcon={"upToDate"}
            showSearch
            value={modal.record.upToDateId ? upToDate.find((item: any) => item.id === modal.record.upToDateId).name : ""}
            placeholder={modal.record.upToDateId ? upToDate.find((item: any) => item.id === modal.record.upToDateId).name : ""}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              marginRight: 4
            }}
            defaultActiveFirstOption={true}
            showArrow={true}
            onSearch={(e: any) => handleSearch(e, "upToDate")}
            filterOption={true}
            onChange={(val: any, e: any) => HandleChange("upToDate", e)}
            notFoundContent={null}
          //onFocus={() => handleSearch}
          >
            {option.map((i: any) => (
              <Option value={i.name} key={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24} onClick={() => setOption([])}>
          <Select
            suffixIcon={"medScape"}
            showSearch
            // defaultValue={modal.isRecord.enName}
            //  value={modal.isRecord.enName}
            value={modal.record.medScapeId ? medScape.find((item: any) => item.id.toString() === modal.record.medScapeId).name : ""}
            placeholder={modal.record.medScapeId ? medScape.find((item: any) => item.id.toString() === modal.record.medScapeId).name : ""}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%"
            }}
            defaultActiveFirstOption={true}
            showArrow={true}
            onSearch={(e: any) => handleSearch(e, "medScape")}
            filterOption={true}
            onChange={(val: any, e: any) => HandleChange("medScape", e)}
            notFoundContent={null}
          //onFocus={() => handleSearch}
          >
            {option.map((i: any) => (
              <Option value={i.name} key={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

    </Modal>
  );
}
