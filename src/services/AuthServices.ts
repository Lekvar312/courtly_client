import axiosInstance from "../api/axiosInstance"

export const loginService = async (credentials: {email: string, password: string}) => {
  const {data} = await axiosInstance.post('auth/login', credentials)
  return data.accessToken
}

export const logoutService = async () => {
  await axiosInstance.post('auth/logout')
  localStorage.removeItem("accessToken")
}