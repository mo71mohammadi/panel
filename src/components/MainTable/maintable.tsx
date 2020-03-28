import React, {useEffect, useState, useContext} from "react";
import {Table, Alert, Button, Upload, message, Drawer} from "antd";
import axios from "axios";
import {TableData} from "./StateManager/tableDataState";
import {SearchState} from "./StateManager/searchState";
import {pagination} from "./StateManager/paginationState";
import {Columns} from "./columns";
import {CountState} from "./StateManager/countState";
import {Selecto} from "./selection";
import {ValueState, State} from "./StateManager/valueState";
import {DrawBody} from "./drawBody";
import Cookies from "js-cookie";

export const MainTable = () => {
	const {tableData, setTableData} = useContext(TableData);
	const {action, setAction} = React.useContext(SearchState);
	const {pagi, setPagi} = useContext(pagination);
	const {count, setCount} = useContext(CountState);
	const [loading, setLoading] = useState(true);
	const [draw, setdraw] = useState(false);
	const {valueState, setValueState} = useContext(ValueState);

	useEffect(() => {
		setLoading(true);
		axios({
			method: "post",
			url: "http://45.92.95.69:5000/api/drugs/getAll",
			data: action.isExport
				? tableData
				: {size: pagi.pageSize, page: pagi.pageCurrent, ...action.filters},
			headers: {Authorization: Cookies.get("Authorization")},
		}).then((res: { data: any }) => {
			setTableData(res.data.data);
			setCount({total: res.data.count});
			//setnum(res.data.count);
			setLoading(false);
			setAction({...action, num: res.data.count});
		}).catch((error) => {
			message.error(error.response.data.error);
		});
	}, [action.isDelete, action.filters]);

	const handleTableChange = (pagination: any, filters: any, sorter: any) => {
		setPagi({
			pageSize: pagination.pageSize,
			pageCurrent: pagination.current
		});
		setAction({
			...action,
			filters: {...action.filters, page: pagination.current}
		});
	};
	const handelExport = () => {
		setLoading(true);
		axios
			.post("http://45.92.95.69:5000/api/drugs/export", action.filters, {
				responseType: "blob",
				headers: {Authorization: Cookies.get("Authorization")},
			})
			.then((response: any) => {
				const downloadUrl = window.URL.createObjectURL(
					new Blob([response.data])
				);
				const link = document.createElement("a");
				link.href = downloadUrl;
				link.setAttribute("download", "dugs.xlsx"); //any other extension
				document.body.appendChild(link);
				link.click();
				link.remove();
				setLoading(false);
			});
	};
	const props = {
		name: "file",
		action: "http://45.92.95.69:5000/api/drugs/import",
		headers: {
			"content-type": "multipart/form-data",
		},
		onChange(info: any) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	function onClose() {
		setAction({...action, isDraw: false, isAddNew: false, isDelete: true});
		setValueState(State)
	}

	return (
		<>
			<Drawer
				placement={"left"}
				closable={true}
				onClose={onClose}
				visible={action.isDraw}
				width={"90vw"}
				style={{
					textAlign: "center",
					alignItems: "center",
					alignContent: "center"
				}}
			>
				{/* <div style={{ marginTop: 12, marginBottom: 8 }}>
          <Alert message={`Edit Item: ${valueState._id}`} type="success" />
        </div> */}
				<DrawBody/>
			</Drawer>
			<div style={{width: "100%", marginBottom: 16}}>
				<Selecto/>
			</div>
			<div>
				<Table
					loading={loading}
					rowKey={record => record.tableData}
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
			</div>
			<div
				style={{
					marginTop: 16,
					marginBottom: 8,
					display: "flex",
					flexDirection: "row"
				}}
			>
				<Button style={{width: "25%", marginLeft: 0}} onClick={handelExport}>
					Export
				</Button>
				<Upload {...props} style={{width: "25%", marginLeft: 16}}>
					<Button style={{width: "100%", marginLeft: 0}} type="default" block>
						Import
					</Button>
				</Upload>
			</div>
			<div>
				<Alert
					message={`Total item in database is ${action.num} `}
					type="success"
				/>
			</div>
		</>
	);
};
