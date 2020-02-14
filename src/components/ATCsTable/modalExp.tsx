import React, { useContext } from "react";
import { Modal, Button, Select } from "antd";
import { ValueState } from "./valueState";
import { ModalState } from "./modalState";
import axios from "axios";

const { Option } = Select;

export function ModalExport(params: any) {
  const { modal, setModal } = useContext(ModalState);
  const { value, setValue } = useContext(ValueState);

  const [option, setOption] = React.useState({ type: null, list: [] });

  const handleCancel = () => {
    setModal({ ...modal, visible: false });
    setOption({ type: null, list: [] });

    setValue({
      L1: { enName: "", faName: "", shortName: "" },
      L2: { enName: "", faName: "", shortName: "" },
      L3: { enName: "", faName: "", shortName: "" },
      L4: { enName: "", faName: "", shortName: "" },
      L5: { enName: "", faName: "", shortName: "" },
      ddd: { admRoute: "", dose: "", unit: "" }
    });
  };
  const handleDelete = () => {
    setModal({ ...modal, visible: false, reset: modal.reset+1});
    if (modal.data.code) {
      axios({
        method: "post",
        url: "http://45.92.95.69:5000/api/drugs/updateATC",
        data: {
          action: "delete",
          enName: modal.data.name,
          enRoute: modal.data.route,
          atc: { code: modal.data.code, ddd: modal.data.ddd }
        }
      })
        .then((res: { data: any }) => {})
        .catch(() => console.log("Get Data Fail"));
    }
    console.log(modal)
  };
  const handleOk = () => {
    setModal({ ...modal, visible: false, reset: modal.reset+1});
    setOption({ type: null, list: [] });
    let code: any;
    let ddd: any;
    if (value.ddd.dose)
      ddd = value.ddd.dose + " " + value.ddd.unit + " " + value.ddd.admRoute;
    if (value.L5.shortName) code = value.L5.shortName;
    else if (value.L4.shortName) code = value.L4.shortName;
    else if (value.L3.shortName) code = value.L3.shortName;
    else if (value.L2.shortName) code = value.L2.shortName;
    else if (value.L1.shortName) code = value.L1.shortName;
    console.log(code, modal.data.code, ddd, modal.data.ddd);
    if (code != modal.data.code || ddd != modal.data.ddd) {
      if (modal.data.code) {
        axios({
          method: "post",
          url: "http://45.92.95.69:5000/api/drugs/updateATC",
          data: {
            action: "delete",
            enName: modal.data.name,
            enRoute: modal.data.route,
            atc: { code: modal.data.code, ddd: modal.data.ddd }
          }
        })
          .then((res: { data: any }) => {})
          .catch(() => console.log("Get Data Fail"));
      }
      axios({
        method: "post",
        url: "http://45.92.95.69:5000/api/drugs/updateATC",
        data: {
          action: "add",
          enName: modal.data.name,
          enRoute: modal.data.route,
          atc: { code: code, ddd: ddd }
        }
      }).then(res => {
        console.log(res.data);
      });
    }

    setValue({
      L1: { enName: "", faName: "", shortName: "" },
      L2: { enName: "", faName: "", shortName: "" },
      L3: { enName: "", faName: "", shortName: "" },
      L4: { enName: "", faName: "", shortName: "" },
      L5: { enName: "", faName: "", shortName: "" },
      ddd: { admRoute: "", dose: "", unit: "" }
    });
  };
  const handleClick = (item: any) => {
    if (option.type != item) setOption({ type: null, list: [] });
    let params;
    if (item === "L1") params = `level=${item}`;
    else if (item === "L2" && value.L1.shortName)
      params = `level=${item}&shortName=${value.L1.shortName}`;
    else if (item === "L3" && value.L2.shortName)
      params = `level=${item}&shortName=${value.L2.shortName}`;
    else if (item === "L4" && value.L3.shortName)
      params = `level=${item}&shortName=${value.L3.shortName}`;
    else if (item === "L5" && value.L4.shortName)
      params = `level=${item}&shortName=${value.L4.shortName}`;
    else if (item === "ddd" && value.L5.shortName)
      params = `level=${item}&shortName=${value.L5.shortName}`;
    if (params && (!option.type || option.type !== item)) {
      // setSelect([]);
      axios({
        method: "get",
        url: `http://localhost:5000/api/atc/get?${params}`
      })
        .then((res: { data: any }) => {
          setOption({ type: item, list: res.data.data });
          // setSelect(res.data.data.slice(0, 15));
        })
        .catch(() => console.log("Get Data Fail"));
    }
  };
  const handleChange = (params: any, type: any) => {
    const change: any = {};
    const val = {
      L1: { enName: "", faName: "", shortName: "" },
      L2: { enName: "", faName: "", shortName: "" },
      L3: { enName: "", faName: "", shortName: "" },
      L4: { enName: "", faName: "", shortName: "" },
      L5: { enName: "", faName: "", shortName: "" },
      ddd: { admRoute: "", dose: "", unit: "" }
    };

    if (type === "ddd") {
      change[type] = option.list.find(
        // @ts-ignore

        i => i.dose + " " + i.unit + " " + i.admRoute == params
      );
      console.log(change);
      delete val.L5;
      delete val.L4;
      delete val.L3;
      delete val.L2;
      delete val.L1;
    } else {
      // @ts-ignore
      if (type == "L1")
        // @ts-ignore

        change[type] = option.list.find(i => i.enName == params);
      if (type == "L2") {
        // @ts-ignore
        change[type] = option.list.find(i => i.enName == params);
        delete val.L1;
      }
      if (type == "L3") {
        // @ts-ignore
        change[type] = option.list.find(i => i.enName == params);
        delete val.L2;
        delete val.L1;
      }
      if (type == "L4") {
        // @ts-ignore
        change[type] = option.list.find(i => i.enName == params);
        delete val.L3;
        delete val.L2;
        delete val.L1;
      }
      if (type == "L5") {
        // @ts-ignore
        change[type] = option.list.find(i => i.enName == params);
        delete val.L4;
        delete val.L3;
        delete val.L2;
        delete val.L1;
      }
    }
    setValue({ ...value, ...val, ...change });
  };

  const opt = (type: any) => {
    if (option.list.length > 0) {
      if (type === "ddd") {
        return option.list.map((i: any, id: any) => (
          <Option value={i.dose + " " + i.unit + " " + i.admRoute}>
            {i.dose + " " + i.unit + " " + i.admRoute}
          </Option>
        ));
      } else {
        return option.list.map((i: any, id: any) => (
          <Option value={i.enName} key={id}>
            {i.enName}
          </Option>
        ));
      }
    } else {
      // @ts-ignore
      // if (value[type].shortName) {
      //     // @ts-ignore
      //     const {shortName, enName} = value[type];
      //     return (
      //         <Option value={shortName}>
      //             {enName}
      //         </Option>
      //     )
      // }
      // else if (modal.data.ddd) {
      //     console.log('sdad', modal.data.ddd)
      //     return (
      //         <Option value={modal.data.ddd}>
      //             {modal.data.ddd}
      //         </Option>
      //     )
      // }
    }
  };

  return (
    <>
      <Modal
        title={modal.data.name}
        visible={modal.visible}
        confirmLoading={modal.confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="danger" onClick={handleDelete}>
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>
        ]}
      >
        <div style={{ width: "100%" }}>
          <Select
            showSearch
            value={value.L1.enName}
            placeholder={value.L1.shortName}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            // onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "L1")}
            onFocus={() => handleClick("L1")}
            notFoundContent={null}
          >
            {opt("L1")}
          </Select>
        </div>
        <div onClick={() => handleClick("L2")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={value.L2.enName}
            placeholder={value.L1.shortName}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            // onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "L2")}
            notFoundContent={null}
          >
            {opt("L2")}
          </Select>
        </div>
        <div onClick={() => handleClick("L3")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={value.L3.enName}
            placeholder={value.L1.shortName}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            // onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "L3")}
            notFoundContent={null}
          >
            {opt("L3")}
          </Select>
        </div>
        <div onClick={() => handleClick("L4")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={value.L4.enName}
            placeholder={value.L4.shortName}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            // onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "L4")}
            notFoundContent={null}
          >
            {opt("L4")}
          </Select>
        </div>
        <div onClick={() => handleClick("L5")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={value.L5.enName}
            placeholder={value.L5.shortName}
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            // onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "L5")}
            notFoundContent={null}
          >
            {opt("L5")}
          </Select>
        </div>
        <div onClick={() => handleClick("ddd")} style={{ width: "100%" }}>
          <Select
            showSearch
            value={
              value.ddd.dose + " " + value.ddd.unit + " " + value.ddd.admRoute
            }
            placeholder={
              value.ddd.dose + " " + value.ddd.unit + " " + value.ddd.admRoute
            }
            style={{ width: "inherits", minWidth: "100%" }}
            defaultActiveFirstOption={true}
            showArrow={true}
            filterOption={true}
            // onSearch={handleSearch}
            onChange={(e: any) => handleChange(e, "ddd")}
            notFoundContent={null}
          >
            {opt("ddd")}
          </Select>
        </div>
      </Modal>
    </>
  );
}
