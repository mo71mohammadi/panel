import React, { useState, useContext } from "react";
import { Button, Select, message } from "antd";
import axios from "axios";

import { UnicState } from "./StateManager/unicState";
import { ValueState } from "./StateManager/valueState";
const { Option } = Select;

export function DrawerBody() {
  const { unicState, setUnicState } = React.useContext(UnicState);
  const { valueState, setValueState } = useContext(ValueState);
  const [select, setSelect] = useState([]);
  const [option, setOption] = React.useState({ type: null, list: [] });

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

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div onClick={() => handleClick("eRx")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`eRx: ${valueState.eRx}`}
              // placeholder={`eRx: ${unicState[0].eRx}`}
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
              placeholder={`genericCode: ${unicState[0].genericCode}`}
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

        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div
            onClick={() => handleClick("packageCode")}
            style={{ width: "100%" }}
          >
            <Select
              showSearch
              value={`packageCode: ${valueState.packageCode}`}
              placeholder={`packageCode: ${unicState[0].packageCode}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "packageCode")}
              notFoundContent={null}
            >
              {select.map((i: any, id: any) => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
          <div onClick={() => handleClick("gtn")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`gtn: ${valueState.gtn}`}
              placeholder={`gtn: ${unicState[0].gtn}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "gtn")}
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
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div onClick={() => handleClick("irc")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`irc: ${valueState.irc}`}
              placeholder={`irc: ${unicState[0].irc}`}
              style={{ width: "inherits", minWidth: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={true}
              filterOption={true}
              onSearch={handleSearch}
              onChange={(e: any) => handleChange(e, "irc")}
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
            onClick={() => handleClick("packageType")}
            style={{ width: "100%" }}
          >
            <Select
              showSearch
              value={`packageType: ${valueState.packageType}`}
              placeholder={`packageType: ${unicState[0].packageType}`}
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
            placeholder={`strength: ${unicState[0].strength}`}
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
            placeholder={`enRoute: ${unicState[0].enRoute}`}
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
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div onClick={() => handleClick("faRoute")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`faRoute: ${valueState.faRoute}`}
              placeholder={`faRoute: ${unicState[0].faRoute}`}
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
              placeholder={`enForm: ${unicState[0].enForm}`}
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
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div onClick={() => handleClick("faForm")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`faForm: ${valueState.faForm}`}
              placeholder={`faForm: ${unicState[0].faForm}`}
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
          <div onClick={() => handleClick("atcCode")} style={{ width: "100%" }}>
            <Select
              showSearch
              disabled
              value={`atcCode: ${valueState.atcCode}`}
              placeholder={`atcCode: ${unicState[0].atcCode}`}
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
          onClick={() => handleClick("faBrandName")}
          style={{ width: "100%" }}
        >
          <Select
            showSearch
            value={`faBrandName: ${valueState.faBrandName}`}
            placeholder={`faBrandName: ${unicState[0].faBrandName}`}
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
        <div onClick={() => handleClick("enName")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={`enName: ${valueState.enName}`}
            placeholder={`enName: ${unicState[0].enName}`}
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
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <div onClick={() => handleClick("faName")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`faName: ${valueState.faName}`}
              placeholder={`faName: ${unicState[0].faName}`}
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
          <div onClick={() => handleClick("volume")} style={{ width: "100%" }}>
            <Select
              showSearch
              value={`volume: ${valueState.volume}`}
              placeholder={`volume: ${unicState[0].volume}`}
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
          style={{ width: "100%" }}
        >
          <Select
            showSearch
            value={`licenseOwner: ${valueState.licenseOwner}`}
            placeholder={`licenseOwner: ${unicState[0].licenseOwner}`}
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
          style={{ width: "100%" }}
        >
          <Select
            showSearch
            value={`countryBrandOwner: ${valueState.countryBrandOwner}`}
            placeholder={`countryBrandOwner: ${unicState[0].countryBrandOwner}`}
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
          style={{ width: "100%" }}
        >
          <Select
            showSearch
            value={`brandOwner: ${valueState.brandOwner}`}
            placeholder={`brandOwner: ${unicState[0].brandOwner}`}
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
          style={{ width: "100%" }}
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

        <div onClick={() => handleClick("producer")} style={{ width: "100%" }}>
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
          style={{ width: "100%" }}
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

        <Button type="primary" icon="check" onClick={HandleEdit}>
          Edit Item
        </Button>
      </div>
    </>
  );
}
