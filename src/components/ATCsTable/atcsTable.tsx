import React, {useContext, useEffect, useState} from "react";
import {Table, Alert, message} from "antd";
import axios from "axios";
import {Columns} from "./columns";
import {ModalState} from "./modalState";
import Cookies from 'js-cookie'

export default function ATCsTable() {
	const [tableData, setTableData] = useState([
		{enName: "", enRoute: "", atc: []}
	]);
	const {modal, setModal} = useContext(ModalState);

	const [pagi, setPagi] = useState({
		pageSize: 10,
		pageCurrent: 1
	});
	const [count, setCount] = useState({total: 0});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios({
			method: "post",
			url: "http://ehrs.ir/api/drugs/atc",
			data: {size: pagi.pageSize, page: pagi.pageCurrent},
			headers: {Authorization: Cookies.get("Authorization")},
		}).then((res: { data: any }) => {
			setTableData(res.data.data);
			setCount({total: res.data.count});
			setLoading(false);
		}).catch((error) => {
			message.error(error.response.data.error);
		});
	}, [pagi.pageCurrent, modal.reset]);

	const handleTableChange = (pagination: any, filters: any, sorter: any) => {
		setPagi({
			pageSize: pagination.pageSize,
			pageCurrent: pagination.current
		});
	};

	return (
		<div style={{background: "#fafafa"}}>
			<Table
				loading={loading}
				//rowKey={record => record.tableData}
				size="small"
				columns={Columns()}
				dataSource={tableData}
				pagination={{
					total: count.total,
					position: "bottom",
					defaultCurrent: 1,
					current: pagi.pageCurrent
				}}
				scroll={{x: 600}}
				onChange={handleTableChange}
			/>
			<div style={{width: "100%", display: "flex"}}>
				<Alert
					style={{width: "50%"}}
					message={`Total item in database is ${count.total} `}
					type="success"
				/>
			</div>
		</div>
	);
}
