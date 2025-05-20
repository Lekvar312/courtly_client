import axiosInstance from "../api/axiosInstance";
type formData = {
  userName: string;
  email: string;
  theme: string;
  message: string;
};
export const sendReview = async (formData: formData) => {
  try {
    const { data } = await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}review`, {
      userName: formData.userName,
      email: formData.email,
      theme: formData.theme,
      message: formData.message,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
