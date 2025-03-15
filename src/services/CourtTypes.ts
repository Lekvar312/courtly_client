import axiosInstance from "../api/axiosInstance";

export const getAllTypes = async () => {
  try {
    const response = await axiosInstance.get("/courtType")
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const createCourtType = async (name:string) => {
  try {
    const response = await axiosInstance.post("/courtType", {name} )
    return response
  } catch (error) {
    console.log(error)
  }
}