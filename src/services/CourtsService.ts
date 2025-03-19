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


export const deleteCourt = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/courts/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

type Data = {
  _id?:string,
  name: string,
  type: string
  address: string,
  workingHours: {
    startTime: string,
    endTime: string,
  }
  price: string,
  picture:string | File | null
}

export const createCourt = async (courtData: Data) => {
  try {
    console.log(courtData)
    const formData = new FormData();

    formData.append("name", courtData.name);
    formData.append("address", courtData.address);
    formData.append("price", courtData.price);
    formData.append("type", courtData.type);
    formData.append("workingHours.startTime", courtData.workingHours.startTime);
    formData.append("workingHours.endTime", courtData.workingHours.endTime);

    if (courtData.picture) {
      if (courtData.picture instanceof FileList && courtData.picture.length > 0) {
        formData.append("picture", courtData.picture[0]); 
      } else if (courtData.picture instanceof File) {
        formData.append("picture", courtData.picture); 
      }
    }

    const { data } = await axiosInstance.post('/courts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data)
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


type EditData = {
  _id?:string,
  name: string,
  type: {
    _id:string,
    name:string
  }
  address: string,
  workingHours: {
    startTime: string,
    endTime: string,
  }
  price: string,
  picture:string | File | null
}

export const editCourt = async (id: string, courtData: EditData) => {
  try {
    const formData = new FormData();

    formData.append("name", courtData.name);
    formData.append("address", courtData.address);
    formData.append("price", courtData.price);
    formData.append("type", courtData.type.name);
    formData.append("workingHours.startTime", courtData.workingHours.startTime);
    formData.append("workingHours.endTime", courtData.workingHours.endTime);

    if (courtData.picture) {
      if (courtData.picture instanceof FileList && courtData.picture.length > 0) {
        formData.append("picture", courtData.picture[0]);
      } else if (courtData.picture instanceof File) {
        formData.append("picture", courtData.picture);
      }
    }
    const { data } = await axiosInstance.put(`/courts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Помилка при редагуванні майданчика:", error.response?.data || error.message);
    } else {
      console.error("Неочікувана помилка при редагуванні майданчика:", error);
    }
    throw error;
  }
};

