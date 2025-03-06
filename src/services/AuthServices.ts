import axiosInstance from "../api/axiosInstance"

export const loginService = async (credentials: {email: string, password: string}) => {
  const {data} = await axiosInstance.post('auth/login', credentials)
  return data.accessToken
}

export const logoutService = async () => {
  await axiosInstance.post('auth/logout')
  localStorage.removeItem("accessToken")
}


export const getCurrentUserService = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Token is missing");
  const response = await axiosInstance.get("/users/current", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
