import React, { useState, useContext, useEffect } from "react";
import { Button, Select, message, Input, Icon, Alert, Form, Tag } from "antd";
import axios from "axios";
import { Row, Col } from "antd";

import { ValueState, State, NewState } from "./StateManager/valueState";
import { SearchState } from "./StateManager/searchState";
const { Option } = Select;
let id = 0;

export function DrawBody() {
  const { valueState, setValueState } = useContext(ValueState);
  const [select, setSelect] = useState([]);
  const [option, setOption] = React.useState({ type: null, list: [] });
  const [input, setinput] = useState([{}]);
  const [state, setstate] = useState([""]);
  const { action, setAction } = React.useContext(SearchState);


  function Remove(params: any) {
    if (state.length === 1) {
      return;
    }

    setstate(state.filter((key: any) => key !== params));
  }

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

  function HandleUpdate(params: any) {
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

  function HandleInputAddGTN(id: any, e: any, type: string) {
    const newItem: any = valueState.gtn;

    if (newItem[id] !== input && input !== undefined) {
      newItem.push(input);
      setValueState((e: any) => ({ ...valueState, gtn: newItem }));
      e.preventDefault();
    }

    if (type === "Add") {
      setstate(state);
    }
  }

  function HandleInputAddIRC(id: any, e: any, type: string) {
    const newItem: any = valueState.irc;

    if (newItem[id] !== input && input !== undefined) {
      newItem.push(input);
      setValueState((e: any) => ({ ...valueState, irc: newItem }));
      e.preventDefault();
    }

    if (type === "Add") {
      setstate(state);
    }
  }

  function HandleEditGTN(id: any) {
    console.log("ID GTN", id);
    const newItem: any = valueState.gtn;

    newItem[id] = input;

    for (var i = newItem.length; i--; ) {
      if (newItem[i] === "") newItem.splice(i, 1);
    }

    setValueState((e: any) => ({ ...valueState, gtn: newItem }));
  }

  function HandleEditIRC(id: any) {
    console.log("ID IRC", id);
    const newItem: any = valueState.irc;

    newItem[id] = input;

    for (var i = newItem.length; i--; ) {
      if (newItem[i] === "") newItem.splice(i, 1);
    }

    setValueState((e: any) => ({ ...valueState, irc: newItem }));
  }

  function HandleAddNewItem(params: any) {
    setValueState(State);
    setAction({ ...action, isAddNew: true });
  }

  function HandleSendItem(params: any) {
    const Data: any = NewState;

    // delete Data._id;
    // delete Data.atc;
    // const atc: any = [{}];
    // Data.push(atc);

    console.log("HandleSendItem", Data);
    axios({
      method: "POST",
      url: `http://45.92.95.69:5000/api/drugs/create`,
      data: Data
    })
      .then((res: { data: any }) => {
        message.success(`Item Created Successfully`);
      })
      .catch(() => console.log("Get Data Fail"));
  }

  return (
    <>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          alignItems: "center",
          alignContent: "left",
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
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  eRx
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon="eRx"
                  showSearch
                  value={valueState.eRx}
                  placeholder={valueState.eRx}
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  genericCode
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="default"
                  // suffixIcon={"genericCode"}
                  showSearch
                  value={valueState.genericCode}
                  placeholder={valueState.genericCode}
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  packageCode
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  // mode="combobox"
                  //suffixIcon={"packageCode"}
                  showSearch
                  value={valueState.packageCode}
                  placeholder={valueState.packageCode}
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  packageType
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"packageType"}
                  showSearch
                  value={valueState.packageType}
                  placeholder={valueState.packageType}
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
          </Col>
        </Row>

        {valueState.gtn.map((i: any, id: any) => (
          <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  Edit This GTN
                </Button>
              </Col>
              <Col span={16}>
                <Input
                  allowClear
                  // suffix={"Edit This GTN"}
                  key={id}
                  placeholder={valueState.gtn[id]}
                  defaultValue={valueState.gtn[id]}
                  onChange={(e: any) => setinput(e.target.value)}
                  addonAfter={
                    <Icon type="edit" onClick={(e: any) => HandleEditGTN(id)} />
                  }
                />
              </Col>
            </Row>
          </Row>
        ))}

        {state.map((i, index) => (
          <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  Add New GTN
                </Button>
              </Col>
              <Col span={16}>
                <Input
                  // placeholder={"Add New GTN ..."}
                  key={index}
                  style={{ marginBottom: 8 }}
                  onChange={(e: any) => setinput(e.target.value)}
                  addonAfter={
                    <Icon
                      type="plus"
                      onClick={(e: any) => HandleInputAddGTN(index, e, "Add")}
                    />
                  }
                />
              </Col>
            </Row>

            {/* <Col span={state.length > 1 ? 1 : 0}>
              {state.length > 0 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => Remove(i)}
                />
              ) : null}
            </Col> */}
          </Row>
        ))}

        {valueState.irc.map((i: any, id: any) => (
          <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  Edit This IRC
                </Button>
              </Col>
              <Col span={16}>
                <Input
                  allowClear
                  //suffix={"Edit This IRC"}
                  key={id}
                  placeholder={valueState.irc[id]}
                  defaultValue={valueState.irc[id]}
                  onChange={(e: any) => setinput(e.target.value)}
                  addonAfter={
                    <Icon type="edit" onClick={(e: any) => HandleEditIRC(id)} />
                  }
                />
              </Col>
            </Row>
          </Row>
        ))}

        {state.map((i, index) => (
          <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  Add New IRC
                </Button>
              </Col>
              <Col span={16}>
                <Input
                  placeholder={"Add New IRC ..."}
                  key={index}
                  style={{ marginBottom: 8, borderColor: "blue" }}
                  onChange={(e: any) => setinput(e.target.value)}
                  addonAfter={
                    <Icon
                      type="plus"
                      onClick={(e: any) => HandleInputAddIRC(index, e, "Add")}
                    />
                  }
                />
              </Col>
            </Row>

            <Col span={state.length > 1 ? 1 : 0}>
              {state.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => Remove(i)}
                />
              ) : null}
            </Col>
          </Row>
        ))}

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  atcCode
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  disabled
                  //mode="combobox"
                  //suffixIcon={"atcCode"}
                  showSearch
                  value={valueState.atc[0] ? valueState.atc[0].code : "ATC"}
                  placeholder={
                    valueState.atc[0] ? valueState.atc[0].code : "ATC"
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  packageCount
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  //mode="combobox"
                  // suffixIcon={"packageCount"}
                  showSearch
                  value={valueState.packageCount}
                  placeholder={valueState.packageCount}
                  style={{ width: "inherits", minWidth: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  onSearch={handleSearch}
                  onChange={(e: any) => handleChange(e, "packageCount")}
                  notFoundContent={null}
                  onFocus={() => handleClick("packageCount")}
                >
                  {select.map((i: any, id: any) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  enRoute
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"enRoute"}
                  showSearch
                  value={valueState.enRoute}
                  placeholder={valueState.enRoute}
                  style={{ width: "inherits", minWidth: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  onSearch={handleSearch}
                  onChange={(e: any) => handleChange(e, "enRoute")}
                  //notFoundContent={null}
                  onFocus={() => handleClick("enRoute")}
                >
                  {select.map((i: any, id: any) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  faRoute
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"faRoute"}
                  showSearch
                  value={valueState.faRoute}
                  placeholder={valueState.faRoute}
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  enForm
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"enForm"}
                  showSearch
                  value={valueState.enForm}
                  placeholder={valueState.enForm}
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  faForm
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"faForm"}
                  showSearch
                  value={valueState.faForm}
                  placeholder={valueState.faForm}
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  enBrandName
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"enBrandName"}
                  showSearch
                  value={valueState.enBrandName}
                  placeholder={valueState.enBrandName}
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
            </Row>
          </Col>

          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  faBrandName
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"faBrandName"}
                  showSearch
                  value={valueState.faBrandName}
                  placeholder={valueState.faBrandName}
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
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  enName
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"enName"}
                  showSearch
                  value={valueState.enName}
                  placeholder={valueState.enName}
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  faName
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"faName"}
                  showSearch
                  value={valueState.faName}
                  placeholder={valueState.faName}
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  licenseOwner
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"licenseOwner"}
                  showSearch
                  value={valueState.licenseOwner}
                  placeholder={valueState.licenseOwner}
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                <Button type="dashed" size="default">
                  countryBrandOwner
                </Button>
              </Col>
              <Col span={12}>
                <Select
                  mode="combobox"
                  suffixIcon={"countryBrandOwner"}
                  showSearch
                  value={valueState.countryBrandOwner}
                  placeholder={valueState.countryBrandOwner}
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  brandOwner
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"brandOwner"}
                  showSearch
                  value={valueState.brandOwner}
                  placeholder={valueState.brandOwner}
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                <Button type="dashed" size="default">
                  countryProducer
                </Button>
              </Col>
              <Col span={12}>
                <Select
                  mode="combobox"
                  suffixIcon={"countryProducer"}
                  showSearch
                  value={valueState.countryProducer}
                  placeholder={valueState.countryProducer}
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  producer
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"producer"}
                  showSearch
                  value={valueState.producer}
                  placeholder={valueState.producer}
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
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                <Button type="dashed" size="default">
                  conversationalName
                </Button>
              </Col>
              <Col span={12}>
                <Select
                  mode="combobox"
                  suffixIcon={"conversationalName"}
                  showSearch
                  value={valueState.conversationalName}
                  placeholder={valueState.conversationalName}
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
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ width: "75%", marginTop: 16 }}>
          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  strength
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  suffixIcon={"strength"}
                  showSearch
                  value={valueState.strength}
                  placeholder={valueState.strength}
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
            </Row>
          </Col>

          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col span={8}>
                <Button type="dashed" size="default">
                  volume
                </Button>
              </Col>
              <Col span={16}>
                <Select
                  //mode="combobox"
                  suffixIcon={"volume"}
                  showSearch
                  value={valueState.volume}
                  placeholder={valueState.volume}
                  style={{ width: "inherits", minWidth: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  onSearch={handleSearch}
                  onChange={(e: any) => handleChange(e, "volume")}
                  notFoundContent={null}
                  //onFocus={() => handleClick("volume")}
                >
                  {select.map((i: any, id: any) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row
          gutter={[16, 16]}
          style={{ width: "75%", position: "sticky", bottom: 8, marginTop: 16 }}
        >
          <Col span={12}>
            {action.isAddNew ? (
              <Button
                // type={"primary"}
                icon="check"
                onClick={HandleSendItem}
                style={{ color: "black", background: "#F6D701", width: "100%" }}
              >
                {"Send Item"}
              </Button>
            ) : (
              <Button
                type={"primary"}
                icon="check"
                onClick={HandleUpdate}
                style={{ color: "white", background: "blue", width: "100%" }}
              >
                {"Update Item"}
              </Button>
            )}
          </Col>
          <Col span={12}>
            <Button
              icon="plus"
              type={"dashed"}
              style={{
                color: "black",
                background: "#fafafa",
                width: "100%",
                borderColor: "#000"
              }}
              onClick={HandleAddNewItem}
            >
              Add New Item
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
}
