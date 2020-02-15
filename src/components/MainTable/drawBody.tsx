import React, { useState, useContext } from "react";
import { Button, Select, message, Input, Icon, Alert, Form } from "antd";
import axios from "axios";
import { Row, Col } from "antd";

import { ValueState } from "./StateManager/valueState";
const { Option } = Select;

export function DrawBody() {
  const { valueState, setValueState } = useContext(ValueState);
  const [select, setSelect] = useState([]);
  const [option, setOption] = React.useState({ type: null, list: [] });
  const [input, setinput] = useState([]);
  const [def, setDef] = useState();

  function handleClick(value: any) {
    if (!option.type || option.type !== value) {
      setSelect([]);
      axios({
        method: "get",
        url: `http://45.92.95.69:5000/api/drugs/distinct?item=${value}`
      })
        .then((res: { data: any }) => {
          setOption({
            type: value,
            list: res.data.data.filter((word: any) => word)
          });
          setSelect(res.data.data.slice(0, 10));
        })
        .catch(() => console.log("Get Data Fail"));
    }
  }

  const handleChange = (params: any, type: any) => {
    const change: any = {};
    change[type] = params;
    setValueState((e: any) => ({ ...valueState, ...change }));
  };

  function handleDefault(params: any, event: any, type: any) {
    setDef(event.props.value);
    console.log("event", event);
    console.log("params", params);
  }

  function handleSearch(params: any) {
    const selectItem = option.list.filter(
      (word: any) =>
        word
          .toString()
          .toLowerCase()
          .search(`^${params.toLowerCase()}`) > -1
    );
    setSelect(selectItem.slice(0, 10));
  }

  function HandleEdit(params: any) {
    console.log("Edit Item : ", valueState._id);

    axios({
      method: "post",
      url: "http://45.92.95.69:5000/api/drugs/update",
      data: valueState
    })
      .then((res: { data: any }) => {
        message.success(`Item ${valueState._id} Successfully`);
      })
      .catch(() => console.log("Get Data Fail"));
  }

  function HandleInputAddGTN(type: any) {
    const newItem: any = valueState.gtn;
    newItem.push(input);
    setValueState((e: any) => ({ ...valueState, gtn: newItem }));
    setinput([]);
  }

  function HandleInputAddIRC(type: any) {
    const newItem: any = valueState.irc;
    newItem.push(input);
    setValueState((e: any) => ({ ...valueState, irc: newItem }));
  }

  return (
    <>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          alignContent: "center",
          width: "inherits"
        }}
      >
        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={24}>
            <Alert
              message={`Item ID: ${valueState._id}`}
              type="info"
              showIcon
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"eRx"}
              showSearch
              value={`${valueState.eRx}`}
              placeholder={` ${valueState.eRx}`}
              style={{ width: "100%" }}
              defaultActiveFirstOption={true}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "eRx")}
              notFoundContent={null}
              onFocus={() => handleClick("eRx")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"genericCode"}
              showSearch
              value={` ${valueState.genericCode}`}
              placeholder={`${valueState.genericCode}`}
              style={{ width: "100%" }}
              defaultActiveFirstOption={true}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "genericCode")}
              notFoundContent={null}
              onFocus={() => handleClick("genericCode")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"packageCode"}
              showSearch
              value={` ${valueState.packageCode}`}
              placeholder={` ${valueState.packageCode}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "packageCode")}
              notFoundContent={null}
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
              <Option value="E">E</Option>
              <Option value="F">F</Option>
              <Option value="G">G</Option>
              <Option value="H">H</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"packageType"}
              showSearch
              value={` ${valueState.packageType}`}
              placeholder={` ${valueState.packageType}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "packageType")}
              notFoundContent={null}
              onFocus={() => handleClick("packageType")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={24}>
            <Input
              //prefixCls={"gtn"}
              suffix={"Edit GTN"}
              //value={def}
              //defaultValue={"def"}
              inputMode="text"
              //allowClear={true}
              addonBefore={
                <Select
                  //suffixIcon={"gtn"}
                  showSearch
                  value={` ${valueState.gtn[0]}`}
                  placeholder={` ${valueState.gtn}`}
                  style={{ minWidth: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  onSearch={handleSearch}
                  onChange={(val: any, event: any) =>
                    handleDefault(val, event, "gtn")
                  }
                  notFoundContent={null}
                  onFocus={() => handleClick("gtn")}
                >
                  {valueState.gtn.map((i: any, id: any) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              }
              addonAfter={
                <Icon type="edit" onClick={() => HandleInputAddGTN("gtn")} />
              }
              placeholder={`${valueState.gtn}`}
              onChange={(e: any) => setinput(e.target.value)}
              onPressEnter={() => HandleInputAddGTN("gtn")}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={24}>
            <Input
              placeholder={"Add new GTN ..."}
              //style={{  borderColor: "black" }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={24}>
            <Button
              type="dashed"
              block
              icon="plus"
              onClick={() => HandleInputAddGTN("gtn")}
              style={{ color: "blue", borderColor: "blue" }}
            >
              {"Add GTN"}
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={24}>
            <Input
              suffix={"Edit IRC"}
              addonBefore={
                <Select
                  // suffixIcon={"irc"}
                  showSearch
                  value={` ${valueState.irc[0]}`}
                  placeholder={` ${valueState.irc}`}
                  style={{ width: "inherits", minWidth: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  onSearch={handleSearch}
                  notFoundContent={null}
                  onFocus={() => handleClick("irc")}
                >
                  {valueState.irc.map((i: any, id: any) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              }
              addonAfter={
                <Icon type="edit" onClick={() => HandleInputAddIRC("irc")} />
              }
              placeholder={` ${valueState.irc}`}
              onChange={(e: any) => setinput(e.target.value)}
              onPressEnter={() => HandleInputAddIRC("irc")}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={24}>
            <Button
              type="dashed"
              block
              icon="plus"
              onClick={() => HandleInputAddGTN("gtn")}
              style={{ color: "blue", borderColor: "blue" }}
            >
              {"Add IRC"}
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={8}>
            <Select
              suffixIcon={"strength"}
              showSearch
              value={` ${valueState.strength}`}
              placeholder={` ${valueState.strength}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "strength")}
              notFoundContent={null}
              onFocus={() => handleClick("strength")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Select
              suffixIcon={"atcCode"}
              showSearch
              value={valueState.atc[0] ? `${valueState.atc[0].code}` : "ATC"}
              placeholder={
                valueState.atc[0] ? ` ${valueState.atc[0].code}` : "ATC"
              }
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "atcCode")}
              notFoundContent={null}
              onFocus={() => handleClick("atcCode")}
            >
              {valueState.atc.map((i: any, id: any) => (
                <Option value={i.code} key={i}>
                  {i.code}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={8}>
            <Select
              suffixIcon={"volume"}
              showSearch
              value={` ${valueState.volume}`}
              placeholder={` ${valueState.volume}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "volume")}
              notFoundContent={null}
              onFocus={() => handleClick("volume")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"enRoute"}
              showSearch
              value={` ${valueState.enRoute}`}
              placeholder={` ${valueState.enRoute}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "enRoute")}
              notFoundContent={null}
              onFocus={() => handleClick("enRoute")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"faRoute"}
              showSearch
              value={` ${valueState.faRoute}`}
              placeholder={` ${valueState.faRoute}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "faRoute")}
              notFoundContent={null}
              onFocus={() => handleClick("faRoute")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"enForm"}
              showSearch
              value={` ${valueState.enForm}`}
              placeholder={` ${valueState.enForm}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "enForm")}
              notFoundContent={null}
              onFocus={() => handleClick("enForm")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"faForm"}
              showSearch
              value={` ${valueState.faForm}`}
              placeholder={` ${valueState.faForm}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "faForm")}
              notFoundContent={null}
              onFocus={() => handleClick("faForm")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"enBrandName"}
              showSearch
              value={` ${valueState.enBrandName}`}
              placeholder={` ${valueState.enBrandName}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "enBrandName")}
              notFoundContent={null}
              onFocus={() => handleClick("enBrandName")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={12}>
            <Select
              suffixIcon={"faBrandName"}
              showSearch
              value={` ${valueState.faBrandName}`}
              placeholder={` ${valueState.faBrandName}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "faBrandName")}
              notFoundContent={null}
              onFocus={() => handleClick("faBrandName")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"enName"}
              showSearch
              value={` ${valueState.enName}`}
              placeholder={` ${valueState.enName}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "enName")}
              notFoundContent={null}
              onFocus={() => handleClick("enName")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"faName"}
              showSearch
              value={` ${valueState.faName}`}
              placeholder={` ${valueState.faName}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "faName")}
              notFoundContent={null}
              onFocus={() => handleClick("faName")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"licenseOwner"}
              showSearch
              value={` ${valueState.licenseOwner}`}
              placeholder={` ${valueState.licenseOwner}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "licenseOwner")}
              notFoundContent={null}
              onFocus={() => handleClick("licenseOwner")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"countryBrandOwner"}
              showSearch
              value={` ${valueState.countryBrandOwner}`}
              placeholder={` ${valueState.countryBrandOwner}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "countryBrandOwner")}
              notFoundContent={null}
              onFocus={() => handleClick("countryBrandOwner")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"brandOwner"}
              showSearch
              value={` ${valueState.brandOwner}`}
              placeholder={` ${valueState.brandOwner}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "brandOwner")}
              notFoundContent={null}
              onFocus={() => handleClick("brandOwner")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"countryProducer"}
              showSearch
              value={` ${valueState.countryProducer}`}
              placeholder={` ${valueState.countryProducer}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "countryProducer")}
              notFoundContent={null}
              onFocus={() => handleClick("countryProducer")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Select
              suffixIcon={"producer"}
              showSearch
              value={`${valueState.producer}`}
              placeholder={`${valueState.producer}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "producer")}
              notFoundContent={null}
              onFocus={() => handleClick("producer")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              suffixIcon={"conversationalName"}
              showSearch
              value={`${valueState.conversationalName}`}
              placeholder={`${valueState.conversationalName}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "conversationalName")}
              notFoundContent={null}
              onFocus={() => handleClick("conversationalName")}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          style={{ width: "75%", position: "sticky", bottom: 8, marginTop: 16 }}
        >
          <Col span={12}>
            <Button
              type="primary"
              icon="check"
              onClick={HandleEdit}
              style={{ width: "100%" }}
            >
              Edit Item
            </Button>
          </Col>
          <Col span={12}>
            <Button icon="plus" type="danger" style={{ width: "100%" }}>
              Add New Item
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
}
