import React, { useState, useEffect, useContext } from "react";
import { ModalState } from "./modalState";
import { Select, Button, Row, Col, message, Alert } from "antd";
import axios from "axios";

const { Option } = Select;

export default function ModalBody(upToDate: any, medScape: any) {
  const { modal, setModal } = useContext(ModalState);
  const [option, setOption] = useState([]);
  const [value, setValue] = useState();

  function handleSearch(e: any, type: any) {
    const selectItem = (type === "upToDate" ? upToDate : medScape).filter(
      (word: any) =>
        word.name
          .toString()
          .toLowerCase()
          .search(`^${e.toLowerCase()}`) > -1
    );
    setOption(selectItem.slice(0, 10));
  }
  const HandleChange = (val: any, e: any) => {
    //console.log("e.key", e.key);
   // console.log("HandleChange", modal);

    val === "upToDate"
      ? setModal({
          ...modal,
          upToDateValue: e.key,
          isChangeUp: true
        })
      : setModal({
          ...modal,
          medScapeValue: e.key,
          isChangeMed: true
        });
  };

  return (
    <Row gutter={[0, 24]} style={{ width: "100%" }}>
      <Col span={24}>
        <Select
          disabled
          suffixIcon={"enName"}
          showSearch
          placeholder={modal.isRecord.enName}
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
        ></Select>
      </Col>

      <Col span={24}>
        <Select
          suffixIcon={"enRoute"}
          disabled
          showSearch
          placeholder={modal.isRecord.enRoute}
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
        ></Select>
      </Col>

      <Col span={24}>
        <Select
          suffixIcon={"upToDate"}
          showSearch
          placeholder={modal.upId.name}
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
      <Col span={24}>
        <Select
          suffixIcon={"medScape"}
          showSearch
          // defaultValue={modal.isRecord.enName}
          //  value={modal.isRecord.enName}
          placeholder={modal.medId.name}
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
  );
}
