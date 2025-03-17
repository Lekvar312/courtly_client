import  { AxiosError } from "axios"
import axiosInstance from "../api/axiosInstance"
import { Court } from "../type"

export const fetchCourts = async (): Promise<Court[]> => {
  try{
    const {data} = await axiosInstance.get<Court[]>("/courts")
    return data
  }catch(e){
      if(e instanceof AxiosError) {
        console.error("Axios Error", e)
      }else{
        console.error("error", e)
      }
    throw e
  }
}

export const editCourt = async (id: string, data: Record<string, any>) => {
  try {
    const response = await axiosInstance.put(`/courts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Помилка оновлення майданчика:", error);
  }
};

export const deleteCourt = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/courts/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const createCourt = async (courtData: Court) => {
  try {
    console.log("Working Hours:", courtData.workingHours);

    const formData = new FormData();

    formData.append("name", courtData.name);
    formData.append("address", courtData.address);
    formData.append("price", courtData.price);
    formData.append("type", courtData.type.name);
    formData.append("workingHours.startTime", courtData.workingHours.startTime);
    formData.append("workingHours.endTime", courtData.workingHours.endTime);

    if (courtData.picture) {
      formData.append("picture", courtData.picture);
    }

    const { data } = await axiosInstance.post('/courts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Помилка при створенні майданчика:", error.response?.data || error.message);
    } else {
      console.error("Неочікувана помилка при створенні майданчика:", error);
    }
    throw error;
  }
};
