import React, {useEffect, useState} from "react";
import {Alert, Modal, Button, Divider, Drawer, Icon, Input, Popconfirm, Tag, Select, message} from "antd";
import axios from "axios";

const {Option} = Select;

export function Columns() {
    const [modal, setModal] = useState({
        data: {name: '', route: '', code: '', ddd: ''},
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    });
    const [value, setValue] = useState({
        L1: {enName: "", faName: "", shortName: ""},
        L2: {enName: "", faName: "", shortName: ""},
        L3: {enName: "", faName: "", shortName: ""},
        L4: {enName: "", faName: "", shortName: ""},
        L5: {enName: "", faName: "", shortName: ""},
        ddd: {admRoute: "", dose: "", unit: ""}
    });
    const [option, setOption] = React.useState({type: null, list: []});
    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }: any) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        const searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys}
                    // onChange={}
                    // onPressEnter={HandleSearch}
                    style={{width: 188, marginBottom: 8, display: "block"}}
                />
                <Button
                    type="primary"
                    // onClick={HandleSearch}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    // onClick={() => {
                    //   clearFilters();
                    //   const filter: any = filters;
                    //   delete filter[dataIndex];
                    //   setFilters({ ...filters, ...filter });
                    //   HandleReset();
                    // }}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered: any) => <Icon type="search"/>

        // render: (text: any) => (searchedColumn === dataIndex ? searchText : text)
    });
    const ModalExport = () => {
        const opt = (type: any) => {
            if (option.list.length > 0) {
                if (type === "ddd") {
                    return (
                        option.list.map((i: any, id: any) => (
                            <Option value={i.dose + ' ' + i.unit + ' ' + i.admRoute}>
                                {i.dose + ' ' + i.unit + ' ' + i.admRoute}
                            </Option>
                        ))
                    )
                } else {
                    return (
                        option.list.map((i: any, id: any) => (
                            <Option value={i.enName} key={id}>
                                {i.enName}
                            </Option>
                        ))
                    )
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
        return(
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
                        </Button>,
                    ]}
                >
                    <div style={{width: "100%"}}>
                        <Select
                            showSearch
                            value={value.L1.enName}
                            placeholder={value.L1.shortName}
                            style={{width: "inherits", minWidth: "100%"}}
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
                    <div onClick={() => handleClick("L2")} style={{width: "100%"}}>
                        <Select
                            showSearch
                            value={value.L2.enName}
                            placeholder={value.L1.shortName}
                            style={{width: "inherits", minWidth: "100%"}}
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
                    <div onClick={() => handleClick("L3")} style={{width: "100%"}}>
                        <Select
                            showSearch
                            value={value.L3.enName}
                            placeholder={value.L1.shortName}
                            style={{width: "inherits", minWidth: "100%"}}
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
                    <div onClick={() => handleClick("L4")} style={{width: "100%"}}>
                        <Select
                            showSearch
                            value={value.L4.enName}
                            placeholder={value.L4.shortName}
                            style={{width: "inherits", minWidth: "100%"}}
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
                    <div onClick={() => handleClick("L5")} style={{width: "100%"}}>
                        <Select
                            showSearch
                            value={value.L5.enName}
                            placeholder={value.L5.shortName}
                            style={{width: "inherits", minWidth: "100%"}}
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
                    <div onClick={() => handleClick("ddd")} style={{width: "100%"}}>
                        <Select
                            showSearch
                            value={value.ddd.dose + ' ' + value.ddd.unit + ' ' + value.ddd.admRoute}
                            placeholder={value.ddd.dose + ' ' + value.ddd.unit + ' ' + value.ddd.admRoute}
                            style={{width: "inherits", minWidth: "100%"}}
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
        )
    };
    const columns = [
        {
            title: "enName",
            dataIndex: "enName",
            key: "enName",
            ...getColumnSearchProps("enName")
        },
        {
            title: "enRoute",
            dataIndex: "enRoute",
            key: "enRoute",
            render: function tag(params: any) {
                return <Tag color={"green"}>{params}</Tag>;
            },
            ...getColumnSearchProps("enRoute")
        },
        {
            title: "ATCsCode",
            dataIndex: "atc[0].code",
            key: "atc[0].code",
            // ...getColumnSearchProps("PackageCount")
            render: (params: number, record: any) => {
                const listItems = record.atc.map((item: any) =>
                    <Tag onClick={() => HandleDrawer({name: record.enName, route: record.enRoute, ...item})}
                         key={item.code}>
                        {item.code}
                    </Tag>
                );
                return (
                    <>
                        {listItems}
                        <Tag onClick={() => HandleDrawer({
                            name: record.enName,
                            route: record.enRoute,
                        })}
                             color={"red"}>+</Tag>
                    </>
                );
            },
        }
    ];

    const HandleDrawer = (params: any) =>  {
        if (params.code) {
            let ddd: any;
            if (!params.ddd) ddd = {admRoute: "", dose: "", unit: ""};
            else {
                const List = params.ddd.split(' ');
                ddd = {admRoute: List[2], dose: List[0], unit: List[1]}
            }
            axios({
                method: "get",
                url: `http://localhost:5000/api/atc/get?shortName=${params.code}`,
            }).then((res: { data: any }) => {
                setValue({...value, ...res.data, ddd: {...ddd}});
                // message.success(`Item ${res.data} `);
            }).catch(res => message.error(`Item ${res.data} `));
        }
        setModal({...modal, data: {...params}, visible: true});
    };
    const handleCancel = () => {
        setModal({...modal, visible: false});
        setOption({type: null, list: []});

        setValue({
            L1: {enName: "", faName: "", shortName: ""},
            L2: {enName: "", faName: "", shortName: ""},
            L3: {enName: "", faName: "", shortName: ""},
            L4: {enName: "", faName: "", shortName: ""},
            L5: {enName: "", faName: "", shortName: ""},
            ddd: {admRoute: "", dose: "", unit: ""}
        });

    };
    const handleDelete = () => {
        setModal({...modal, visible: false});
        if (modal.data.code) {
            axios({
                method: "post",
                url: 'http://45.92.95.69:5000/api/drugs/updateATC',
                data: {
                    action: "delete",
                    enName: modal.data.name,
                    enRoute: modal.data.route,
                    atc: {code: modal.data.code, ddd: modal.data.ddd}
                }
            }).then((res: { data: any }) => {

            }).catch(() => console.log("Get Data Fail"));

        }
    };
    const handleOk = () => {
        setModal({...modal, visible: false});
        setOption({type: null, list: []});
        let code: any;
        let ddd: any;
        if (value.ddd.dose) ddd = value.ddd.dose + ' ' + value.ddd.unit + ' ' + value.ddd.admRoute;
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
                    url: 'http://45.92.95.69:5000/api/drugs/updateATC',
                    data: {
                        action: "delete",
                        enName: modal.data.name,
                        enRoute: modal.data.route,
                        atc: {code: modal.data.code, ddd: modal.data.ddd}
                    }
                }).then((res: { data: any }) => {

                }).catch(() => console.log("Get Data Fail"));

            }
            axios({
                method: "post",
                url: 'http://45.92.95.69:5000/api/drugs/updateATC',
                data: {
                    action: "add",
                    enName: modal.data.name,
                    enRoute: modal.data.route,
                    atc: {code: code, ddd: ddd}
                }
            }).then(res => {
                console.log(res.data)
            })
        }

        setValue({
            L1: {enName: "", faName: "", shortName: ""},
            L2: {enName: "", faName: "", shortName: ""},
            L3: {enName: "", faName: "", shortName: ""},
            L4: {enName: "", faName: "", shortName: ""},
            L5: {enName: "", faName: "", shortName: ""},
            ddd: {admRoute: "", dose: "", unit: ""}
        });
    };
    const handleClick = (item: any) => {
        if (option.type != item) setOption({type: null, list: []});
        let params;
        if (item === "L1") params = `level=${item}`;
        else if (item === "L2" && value.L1.shortName) params = `level=${item}&shortName=${value.L1.shortName}`;
        else if (item === "L3" && value.L2.shortName) params = `level=${item}&shortName=${value.L2.shortName}`;
        else if (item === "L4" && value.L3.shortName) params = `level=${item}&shortName=${value.L3.shortName}`;
        else if (item === "L5" && value.L4.shortName) params = `level=${item}&shortName=${value.L4.shortName}`;
        else if (item === "ddd" && value.L5.shortName) params = `level=${item}&shortName=${value.L5.shortName}`;
        if (params && (!option.type || option.type !== item)) {
            // setSelect([]);
            axios({
                method: "get",
                url: `http://localhost:5000/api/atc/get?${params}`
            }).then((res: { data: any }) => {
                setOption({type: item, list: res.data.data});
                // setSelect(res.data.data.slice(0, 15));
            }).catch(() => console.log("Get Data Fail"));
        }

    };
    const handleChange = (params: any, type: any) => {
        const change: any = {};
        const val = {
            L1: {enName: "", faName: "", shortName: ""},
            L2: {enName: "", faName: "", shortName: ""},
            L3: {enName: "", faName: "", shortName: ""},
            L4: {enName: "", faName: "", shortName: ""},
            L5: {enName: "", faName: "", shortName: ""},
            ddd: {admRoute: "", dose: "", unit: ""}
        };

        if (type === 'ddd') {
            // @ts-ignore
            change[type] = option.list.find(i => i.dose + ' ' + i.unit + ' ' + i.admRoute == params);
            console.log(change);
            delete val.L5;
            delete val.L4;
            delete val.L3;
            delete val.L2;
            delete val.L1

        } else {
            // @ts-ignore
            if (type == "L1") change[type] = option.list.find(i => i.enName == params);
            if (type == "L2") {
                // @ts-ignore
                change[type] = option.list.find(i => i.enName == params);
                delete val.L1
            }
            if (type == "L3") {
                // @ts-ignore
                change[type] = option.list.find(i => i.enName == params);
                delete val.L2;
                delete val.L1
            }
            if (type == "L4") {
                // @ts-ignore
                change[type] = option.list.find(i => i.enName == params);
                delete val.L3;
                delete val.L2;
                delete val.L1
            }
            if (type == "L5") {
                // @ts-ignore
                change[type] = option.list.find(i => i.enName == params);
                delete val.L4;
                delete val.L3;
                delete val.L2;
                delete val.L1
            }
        }
        setValue({...value, ...val, ...change});
    };

    return columns
}
