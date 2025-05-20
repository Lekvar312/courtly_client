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


export const updateReview = async (id: string, dataToUpdate:any) => {
  try {
    const {data} = await axiosInstance.put(`${import.meta.env.VITE_BASE_URL}review/${id}`, dataToUpdate)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllReviews = async () => {
  try {
    const {data} = await axiosInstance(`${import.meta.env.VITE_BASE_URL}review`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteReview = async (id: string) => {
  try {
    const {data} = await axiosInstance.delete(`${import.meta.env.VITE_BASE_URL}review/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}