import React, {useState, useEffect, useContext} from "react";
import {ModalState} from "./editState";
import {Table, Button, Input, Col} from "antd";
import {Columns} from "./editColumns";


export default function EditPage() {
	const {modal, setModal} = useContext(ModalState);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		// @ts-ignore
		setTableData(modal.record.permissions);

	}, []);
	const handleClick = () => {
		setModal({...modal, visible: false, reset: modal.reset + 1, record: {_id: '', role: '', permissions: []}})
	};
	const HandleChange = (e: any) => {
		setModal({...modal, record: {...modal.record, role: e.target.value}})
	};
	return (
		<div style={{background: "#fafafa"}}>
			<Button onClick={handleClick}>{"Back"}</Button>
			<Button onClick={() => setModal({...modal, save: modal.save + 1})}>{"OK"}</Button>
			<div style={{width: "100%", display: "flex"}}>
				<Col span={24}>
					<Input value={modal.record.role} placeholder={"Type New Role ..."} onChange={(e: any) => HandleChange(e)}/>
				</Col>
				{/*<Divider type="vertical" />*/}

				{/*<Button*/}
				{/*	style={{ width: "50%", marginRight: 4 }}*/}
				{/*	type="primary"*/}
				{/*	block*/}
				{/*	icon="user"*/}
				{/*	size="large"*/}
				{/*	// onClick={() => handleClickAdd()}*/}
				{/*>*/}
				{/*	{"Add New Role"}*/}
				{/*</Button>*/}

			</div>

			<div>
				<Table
					// loading={loading}
					rowKey={(record: any) => {
						return record.tableData;
					}}
					size="default"
					columns={Columns()}
					dataSource={tableData}
					pagination={{
						defaultPageSize: 100,
						hideOnSinglePage: true
						// position: "bottom",
						// defaultCurrent: 1,
						// current: pagi.pageCurrent
					}}
					scroll={{x: 600}}
					// onChange={handleTableChange}
				/>
			</div>
		</div>

	)
}