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
    const [select, setSelect] = useState([]);

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
                // const showModal = (item: any) => setModal({...modal, data: {...item}, visible: true});

                const listItems = record.atc.map((item: any) =>
                    <Tag onClick={() => HandleDrawer({name: record.enName, route: record.enRoute, ...item})}
                         key={item.code}>
                        {item.code}
                    </Tag>
                );

                return (
                    <>
                        {listItems}
                        <Tag onClick={() => HandleDrawer({name: record.enName, route: record.enRoute})}
                             color={"red"}>+</Tag>
                        <Modal
                            title={modal.data.name}
                            visible={modal.visible}
                            onOk={handleOk}
                            confirmLoading={modal.confirmLoading}
                            onCancel={handleCancel}
                        >
                            <div onClick={() => handleClick("L1")} style={{width: "100%"}}>
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
                                    notFoundContent={null}
                                >
                                    {option.list.map((i: any, id: any) => (
                                        <Option value={i.shortName} key={id}>
                                            {i.enName}
                                        </Option>
                                    ))}
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
                                    {option.list.map((i: any, id: any) => (
                                        <Option value={i.shortName} key={id}>
                                            {i.enName}
                                        </Option>
                                    ))}
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
                                    {option.list.map((i: any, id: any) => (
                                        <Option value={i.shortName} key={id}>
                                            {i.enName}
                                        </Option>
                                    ))}
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
                                    {option.list.map((i: any, id: any) => (
                                        <Option value={i.shortName} key={id}>
                                            {i.enName}
                                        </Option>
                                    ))}
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
                                    {option.list.map((i: any, id: any) => (
                                        <Option value={i.shortName} key={id}>
                                            {i.enName}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div onClick={() => handleClick("ddd")} style={{width: "100%"}}>
                                <Select
                                    showSearch
                                    value={value.ddd.admRoute}
                                    placeholder={value.ddd.admRoute}
                                    style={{width: "inherits", minWidth: "100%"}}
                                    defaultActiveFirstOption={true}
                                    showArrow={true}
                                    filterOption={true}
                                    // onSearch={handleSearch}
                                    onChange={(e: any) => handleChange(e, "ddd")}
                                    notFoundContent={null}
                                >
                                    {option.list.map((i: any, id: any) => (
                                        <Option value={i.dose + i.unit + i.admRoute}>
                                            {i.dose + ' ' + i.unit + ' ' + i.admRoute}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </Modal>
                    </>
                );
            },
        }
    ];

    function HandleDrawer(params: any) {
        axios({
            method: "get",
            url: `http://localhost:5000/api/atc/get?shortName=${params.code}`,
        }).then((res: { data: any }) => {
            setValue({...value, ...res.data});
            // message.success(`Item ${res.data} `);
        }).catch(res => message.error(`Item ${res.data} `));

        setModal({...modal, data: {...params}, visible: true});
    }
    const handleCancel = () => {
        setModal({...modal, visible: false})
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
    const handleOk = () => {
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
    const handleClick = (item: any) => {
        let params;
        if (item === "L1") params = `level=${item}`;
        else if (item === "L2") params = `level=${item}&shortName=${value.L1.shortName}`;
        else if (item === "L3") params = `level=${item}&shortName=${value.L2.shortName}`;
        else if (item === "L4") params = `level=${item}&shortName=${value.L3.shortName}`;
        else if (item === "L5") params = `level=${item}&shortName=${value.L4.shortName}`;
        else if (item === "ddd") params = `level=${item}&shortName=${value.L5.shortName}`;
        console.log(params)
        if (!option.type || option.type !== item) {
            // setSelect([]);
            setOption({...option, list: []});

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
            change[type] = option.list.find(i => i.dose + i.unit + i.admRoute == params);
            delete val.L5;
            delete val.L4;
            delete val.L3;
            delete val.L2;
            delete val.L1

        } else {
            // @ts-ignore
            if (type == "L1") change[type] = option.list.find(i => i.shortName == params);
            if (type == "L2") {
                // @ts-ignore
                change[type] = option.list.find(i => i.shortName == params);
                delete val.L1
            }
            if (type == "L3") {
                // @ts-ignore
                change[type] = option.list.find(i => i.shortName == params);
                delete val.L2;
                delete val.L1
            }
            if (type == "L4") {
                // @ts-ignore
                change[type] = option.list.find(i => i.shortName == params);
                delete val.L3;
                delete val.L2;
                delete val.L1
            }
            if (type == "L5") {
                // @ts-ignore
                change[type] = option.list.find(i => i.shortName == params);
                delete val.L4;
                delete val.L3;
                delete val.L2;
                delete val.L1
            }
        }
        setValue({...value, ...val, ...change});
    };

    return columns;
}
