import { AxiosError } from "axios"
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