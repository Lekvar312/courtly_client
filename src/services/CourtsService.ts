import axiosInstance from "../api/axiosInstance"
import { Court } from "../type"

export const fetchCourts = async (): Promise<Court[] | undefined> => {
  try{
    const response = await axiosInstance.get("/courts/")
    return response.data
  }catch(e){
    console.log(e)
    throw e
  }
}