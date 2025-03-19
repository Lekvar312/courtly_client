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
    const {data} = await axiosInstance.post("/courtType", {name} )
    return {data}
  } catch (error) {
    console.log(error)
  }
}

export const editCourtType = async (id: string, name: string) => {
  try {
    const response = await axiosInstance.put(`/courtType/${id}`, { name });
    return response; 
  } catch (error) {
    console.log("Помилка при редагуванні типу майданчика:", error);
    return null; 
  }
};


export const deleteCourtType = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`courtType/${id}`)
    console.log(response.data)
    return response
  } catch (error) {
    console.log(error)
  }
}