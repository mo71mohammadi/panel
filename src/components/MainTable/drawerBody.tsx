import React, { useState, useContext } from "react";
import { Button, Select, message, Input, Icon } from "antd";
import axios from "axios";

import { ValueState } from "./StateManager/valueState";
const { Option } = Select;

export function DrawerBody() {
  const { valueState, setValueState } = useContext(ValueState);
  const [select, setSelect] = useState([]);
  const [option, setOption] = React.useState({ type: null, list: [] });
  const [input, setinput] = useState([]);

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
      <div
        style={{ display: "flex", flexDirection: "column", width: "inherits" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div onClick={() => handleClick("eRx")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`eRx: ${valueState.eRx}`}
              placeholder={`eRx: ${valueState.eRx}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={true}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "eRx")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
          <div
            onClick={() => handleClick("genericCode")}
            style={{ width: "100%" }}
          >
            <Select
              showSearch
              value={`genericCode: ${valueState.genericCode}`}
              placeholder={`genericCode: ${valueState.genericCode}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={true}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "genericCode")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div style={{ width: "100%" }}>
            <Select
              showSearch
              value={`packageCode: ${valueState.packageCode}`}
              placeholder={`packageCode: ${valueState.packageCode}`}
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
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div onClick={() => handleClick("gtn")} style={{ width: "100%" }}>
            <Input
              addonBefore={
                <Select
                  showSearch
                  value={`gtn: ${valueState.gtn[0]}`}
                  placeholder={`gtn: ${valueState.gtn}`}
                  style={{ width: "inherits", minWidth: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  onSearch={handleSearch}
                  // onChange={(e: any) => handleChange(e, "gtn")}
                  notFoundContent={null}
                >
                  {valueState.gtn.map((i: any, id: any) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              }
              addonAfter={
                <Icon type="plus" onClick={() => HandleInputAddGTN("gtn")} />
              }
              placeholder={`Add GTN +: ${valueState.gtn}`}
              onChange={(e: any) => setinput(e.target.value)}
              onPressEnter={() => HandleInputAddGTN("gtn")}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div onClick={() => handleClick("irc")} style={{ width: "100%" }}>
            <Input
              addonBefore={
                <Select
                  showSearch
                  value={`irc: ${valueState.irc[0]}`}
                  placeholder={`irc: ${valueState.irc}`}
                  style={{ width: "inherits", minWidth: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={true}
                  onSearch={handleSearch}
                  notFoundContent={null}
                >
                  {valueState.irc.map((i: any, id: any) => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              }
              addonAfter={
                <Icon type="plus" onClick={() => HandleInputAddIRC("irc")} />
              }
              placeholder={`Add IRC +: ${valueState.irc}`}
              onChange={(e: any) => setinput(e.target.value)}
              onPressEnter={() => HandleInputAddIRC("irc")}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div
            onClick={() => handleClick("packageType")}
            style={{ width: "100%" }}
          >
            <Select
              showSearch
              value={`packageType: ${valueState.packageType}`}
              placeholder={`packageType: ${valueState.packageType}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "packageType")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div onClick={() => handleClick("strength")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={`strength: ${valueState.strength}`}
            placeholder={`strength: ${valueState.strength}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "strength")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>
        <div onClick={() => handleClick("enRoute")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={`enRoute: ${valueState.enRoute}`}
            placeholder={`enRoute: ${valueState.enRoute}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "enRoute")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div onClick={() => handleClick("faRoute")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`faRoute: ${valueState.faRoute}`}
              placeholder={`faRoute: ${valueState.faRoute}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "faRoute")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
          <div onClick={() => handleClick("enForm")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`enForm: ${valueState.enForm}`}
              placeholder={`enForm: ${valueState.enForm}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "enForm")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div
            onClick={() => handleClick("faForm")}
            style={{ width: "100%", marginBottom: 4 }}
          >
            <Select
              showSearch
              value={`faForm: ${valueState.faForm}`}
              placeholder={`faForm: ${valueState.faForm}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "faForm")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
          <div
            onClick={() => handleClick("atcCode")}
            style={{ width: "100%", marginBottom: 4 }}
          >
            <Select
              showSearch
              disabled
              value={`atcCode: ${valueState.atcCode}`}
              placeholder={`atcCode: ${valueState.atcCode}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "atcCode")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div
          onClick={() => handleClick("enBrandName")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`enBrandName: ${valueState.enBrandName}`}
            placeholder={`enBrandName: ${valueState.enBrandName}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "enBrandName")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>

        <div
          onClick={() => handleClick("faBrandName")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`faBrandName: ${valueState.faBrandName}`}
            placeholder={`faBrandName: ${valueState.faBrandName}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "faBrandName")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>

        <div
          onClick={() => handleClick("enName")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`enName: ${valueState.enName}`}
            placeholder={`enName: ${valueState.enName}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "enName")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginBottom: 4
          }}
        >
          <div onClick={() => handleClick("faName")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`faName: ${valueState.faName}`}
              placeholder={`faName: ${valueState.faName}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "faName")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
          <div
            onClick={() => handleClick("volume")}
            style={{ width: "100%", marginBottom: 4 }}
          >
            <Select
              showSearch
              value={`volume: ${valueState.volume}`}
              placeholder={`volume: ${valueState.volume}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "volume")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div
          onClick={() => handleClick("licenseOwner")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`licenseOwner: ${valueState.licenseOwner}`}
            placeholder={`licenseOwner: ${valueState.licenseOwner}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "licenseOwner")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>
        <div
          onClick={() => handleClick("countryBrandOwner")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`countryBrandOwner: ${valueState.countryBrandOwner}`}
            placeholder={`countryBrandOwner: ${valueState.countryBrandOwner}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "countryBrandOwner")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>

        <div
          onClick={() => handleClick("brandOwner")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`brandOwner: ${valueState.brandOwner}`}
            placeholder={`brandOwner: ${valueState.brandOwner}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "brandOwner")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>
        <div
          onClick={() => handleClick("countryProducer")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`countryProducer: ${valueState.countryProducer}`}
            placeholder={`countryProducer: ${valueState.countryProducer}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "countryProducer")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>

        <div
          onClick={() => handleClick("producer")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`producer: ${valueState.producer}`}
            placeholder={`producer: ${valueState.producer}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "producer")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>
        <div
          onClick={() => handleClick("conversationalName")}
          style={{ width: "100%", marginBottom: 4 }}
        >
          <Select
            showSearch
            value={`conversationalName: ${valueState.conversationalName}`}
            placeholder={`conversationalName: ${valueState.conversationalName}`}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={false}
            showArrow={true}
            filterOption={true}
            onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "conversationalName")}
            notFoundContent={null}
          >
            {select.map((i: any, id: any) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </div>

        <Button
          type="primary"
          icon="check"
          onClick={HandleEdit}
          style={{
            width: "100%",
            position: "sticky",
            bottom: 0
          }}
        >
          Edit Item
        </Button>
      </div>
    </>
  );
}
