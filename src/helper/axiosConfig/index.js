import axios from "axios";
import store from "store"; // Thay yourStore bằng đường dẫn đến nơi bạn lưu trữ reducer hoặc trạng thái

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Thêm interceptor để gán token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().loginReducer.data.access_token; // Lấy token từ reducer hoặc trạng thái
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Xử lý lỗi 401 ở đây (nếu cần)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
