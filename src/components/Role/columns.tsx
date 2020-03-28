import React, {useContext} from "react";
import {Button, message, Popconfirm} from "antd";
import axios from "axios";
import {ModalState} from "./editState";
import Cookies from "js-cookie";

export function Columns() {
	const updateUrl = 'http://45.92.95.69:5000/api/role/';
	const {modal, setModal} = useContext(ModalState);
	const permissions = ["Drug", "ATC", "Interaction", "Price", "User", "Role", "Profile", "MedScape", "UpToDate", "Drug.api", "MedScape.api", "UpToDate.api", "Insurance.api"];

	function ShowModal(record: any) {
		const permList = [];
		for (const item in permissions) {
			const obj = {permission: permissions[item], create: false, read: false, update: false, delete: false};
			record.permissions.find((element: any) => {
				if (element.resource == permissions[item].toLowerCase()) {
					if (element.action == "create:any") obj.create = true;
					if (element.action == "read:any") obj.read = true;
					if (element.action == "update:any") obj.update = true;
					if (element.action == "delete:any") obj.delete = true
				}
			});
			permList.push(obj)
		}
		// record.permissions = permList;
		// @ts-ignore
		setModal({
			...modal, title: 'Update Role', record: {_id: record._id, role: record.role, permissions: permList}, visible: true
		})
	}

	const HandleDelete = (record: any) => {
		axios({
			method: "delete",
			url: updateUrl + record._id,
			headers: {Authorization: Cookies.get("Authorization")}
		}).then((res: any) => {
			message.info("Role Deleted successfully");
			setTimeout(() => {
				setModal({...modal, reset: modal.reset + 1});
			}, 50)
		}).catch((error) => {
			message.error(error.response.data.error);
		});
	};

	return [
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			// width: "30%"

			//...getColumnSearchProps("IRC")
		},
		// {
		//   title: "Email",
		//   dataIndex: "email",
		//   key: "email",
		//   render: function tag(param: any) {
		//     return <Tag>{param}</Tag>;
		//   }
		//   // ...getColumnSearchProps("GTIN")
		// },
		// {
		//   title: "Role",
		//   dataIndex: "role",
		//   key: "role",
		//   render: function tag(param: any) {
		//     return <Tag color="red">{param}</Tag>;
		//   }
		//   // ...getColumnSearchProps("GTIN")
		// },
		// {
		//   title: "Active",
		//   dataIndex: "active",
		//   key: "active",
		//   render: function tag(active: any, record: any) {
		//     return <Switch defaultChecked={active} onChange={(e) => onChangeActive(e, record)}/>;
		//   }
		//   // ...getColumnSearchProps("GTIN")
		// },
		{
			title: "Action",
			dataIndex: "Action",
			key: "Action",
			width: "15%",

			// ...getColumnSearchProps("cPrice")
			render: function (index: number, record: any) {
				return (
					<div>
						<Button
							// type="primary"
							icon="edit"
							size="default"
							style={{background: "#a0d911"}}
							onClick={() => ShowModal(record)}
						/>
						{/* <Divider type="vertical" /> */}

						{/*<Button*/}
						{/*  // type="primary"*/}
						{/*  icon="key"*/}
						{/*  size="default"*/}
						{/*  style={{ background: "#fa8c16" }}*/}
						{/*  onClick={() => ShowPassModal(record)}*/}
						{/*/>*/}
						{/* <Divider type="vertical" /> */}

						<Popconfirm
							title="Sure to delete?"
							onConfirm={() => HandleDelete(record)}
						>
							<Button
								icon="delete"
								size="default"
								style={{background: "#f5222d"}}
							/>
						</Popconfirm>
					</div>
				);
			}
		}
	];
}
