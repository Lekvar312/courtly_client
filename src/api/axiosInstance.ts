import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response, // Просто повертаємо відповідь, якщо вона успішна
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Запобігає нескінченному циклу
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axiosInstance.get("/api/auth/refresh");

          localStorage.setItem("accessToken", data.accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

          return axiosInstance(originalRequest); // Повторюємо запит з новим токеном
        } catch (err) {
          localStorage.removeItem("accessToken"); // Видаляємо токен при помилці
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  }
);  

export default axiosInstance;
