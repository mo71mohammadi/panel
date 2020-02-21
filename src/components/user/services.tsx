import React from "react";
import axios from "axios";
const baseUrl = "http://45.92.95.69:5000/api//signup";

let token: string | null = null;

const setToken = (newToken: any) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newObject: any) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id: any, newObject: any) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject);
  return request.then(response => response.data);
};

export default { getAll, create, update, setToken };
