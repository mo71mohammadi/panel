import React, {useContext, useEffect, useState} from "react";
import {Button, Checkbox, message, Popconfirm, Tag} from "antd";
import axios from "axios";
import {ModalState} from "./editState";
import Cookies from "js-cookie";

export function Columns() {
	const updateUrl = 'http://45.92.95.69:5000/api/role/';
	const {modal, setModal} = useContext(ModalState);
	const [permissions, setPermissions] = useState([]);

	useEffect(() => {
		// setPermissions([])
		// setModal({...modal, visible: false, record: {_id: '', permissions: []}})
	}, [modal.visible]);

	useEffect(() => {
		if (modal.save !== 0) {
			axios({
				method: modal.title == 'Add New Role' ? "post" : "put",
				url: modal.title == 'Add New Role' ? updateUrl : updateUrl + modal.record._id,
				data: {role: modal.record.role, permissions: permissions},
				headers: {Authorization: Cookies.get("Authorization")}
			}).then((res: any) => {
				if (res.data.success === true) message.info(res.data.message);
				else message.error("Role Not Found!");
				setTimeout(() => {
					setModal({
						...modal,
						visible: false,
						save: 0,
						reset: modal.reset + 1,
						record: {_id: '', role: '', permissions: []}
					})
				}, 250)
			}).catch((error) => {
				message.error(error.response.data.error);
			});

		}
		// setModal({...modal, save: 0})
	}, [modal.save]);

	useEffect(() => {
		const defaultPerm: any = [];
		modal.record.permissions.forEach(element => {
			Object.keys(element).slice(1, 5).forEach(el => {
				let action;
				if (el == "create") action = "create:any";
				if (el == "read") action = "read:any";
				if (el == "update") action = "update:any";
				if (el == "delete") action = "delete:any";
				// @ts-ignore
				if (element[el]) defaultPerm.push({attributes: "*", resource: element.permission.toLowerCase(), action: action})
			});
		});
		// @ts-ignore
		setPermissions([...defaultPerm])
	}, []);
	const onChangeAction = (e: any, action: any, perm: any) => {
		const permObj = {attributes: "*", resource: perm.toLowerCase(), action: action};
		const result = permissions.filter((item: any) => item.resource !== perm.toLowerCase() || item.action !== action);
		// @ts-ignore
		if (result.length === permissions.length && e.target.checked) setPermissions([...permissions, permObj]);
		else setPermissions(result)

		// if (defaultPerm.length > 0) defaultPerm = []
		// @ts-ignore
		// setPermissions([{attributes: "*", resource: "record.permission", action: "create:any"}]);
		// e.target.checked ?
	};

	return [
		{
			title: "Permissions",
			dataIndex: "permission",
			key: "permission",
			render: function tag(param: any) {
				return <Tag color="red">{param}</Tag>;
			}
		},
		{
			title: "Create",
			dataIndex: "create",
			key: "create",
			render: function tag(active: any, record: any) {
				return <Checkbox defaultChecked={active} onChange={(e) => onChangeAction(e, "create:any", record.permission)}/>;
			}
		},
		{
			title: "Read",
			dataIndex: "read",
			key: "read",
			render: function tag(active: any, record: any) {
				return <Checkbox defaultChecked={active} onChange={(e) => onChangeAction(e, "read:any", record.permission)}/>;
			}
		},
		{
			title: "Update",
			dataIndex: "update",
			key: "update",
			render: function tag(active: any, record: any) {
				return <Checkbox defaultChecked={active} onChange={(e) => onChangeAction(e, "update:any", record.permission)}/>;
			}
		},
		{
			title: "Delete",
			dataIndex: "delete",
			key: "delete",
			render: function tag(active: any, record: any) {
				return <Checkbox defaultChecked={active} onChange={(e) => onChangeAction(e, "delete:any", record.permission)}/>;
			}
		},
	];
}
