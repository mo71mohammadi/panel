import React, { useState, useEffect } from "react";
import { ModalState } from "./modalState";
import { Select, Button, Row, Col, message } from "antd";
import axios from "axios";

const { Option } = Select;

export default function ModalBody(params: any) {
  const { modal, setModal } = React.useContext(ModalState);
  const [option, setOption] = useState([]);
  const [value, setValue] = useState();

  function handleSearch(type: any) {
    const selectItem = params.filter(
      (word: any) =>
        word.name
          .toString()
          .toLowerCase()
          .search(`^${type.toLowerCase()}`) > -1
    );
    setOption(selectItem.slice(0, 10));
  }
  const HandleChange = (val: any, e: any) => {
    console.log("val HandleChange e", val, e);
    setValue(e.key);
  };

  function HandleUpdateInt(params: any) {
    axios({
      method: "POST",
      url: "http://45.92.95.69:5000/api/drugs/updateInteraction",
      data: {
        enName: `${modal.isRecord.enName}`,
        enRoute: `${modal.isRecord.enRoute}`,
        upToDateId: `${value}`,
        medScapeId: `${modal.isRecord.medScapeId}`
      }
    })
      .then((resp: any) => {
        message.info("updated successfully ");
      })
      .catch(() => console.log("Get upToDate Data Fail"));
  }

  return (
    <Row gutter={[16, 16]} style={{ width: "100%" }}>
      <Col span={24}>
        <Select
          showSearch
         // defaultValue={modal.isRecord.enName}
         //  value={modal.isRecord.enName}
          placeholder={modal.idRecord.name}
          style={{
            width: "70%",
            maxWidth: "70%",
            minWidth: "70%",
            marginRight: 4
          }}
          defaultActiveFirstOption={true}
          showArrow={true}
          onSearch={handleSearch}
          filterOption={true}
          onChange={(val: any, e: any) => HandleChange(val, e)}
          notFoundContent={null}
          // onFocus={() => handleSearch}
        >
          {option.map((i: any) => (
            <Option value={i.name} key={i.id}>
              {i.name}
            </Option>
          ))}
        </Select>

        <Button
          type="primary"
          icon="arrow-right"
          size="default"
          style={{ width: "25%" }}
          onClick={HandleUpdateInt}
        />
      </Col>
    </Row>
  );
}
