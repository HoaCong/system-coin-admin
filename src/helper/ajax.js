// ajax.js

import axiosInstance from "./axiosConfig";

const GET = (url, params) => axiosInstance.get(url, { params });
const POST = (url, data, config) => axiosInstance.post(url, data, config);
const PUT = (url, data, config) => axiosInstance.put(url, data, config);
const PATCH = (url, data, config) => axiosInstance.patch(url, data, config);
const DELETE = (url, config) => axiosInstance.delete(url, config);

export { DELETE, GET, PATCH, POST, PUT };
