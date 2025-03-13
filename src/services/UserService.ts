import axiosInstance from "../api/axiosInstance";

export const getAllUsers = async ()  => {
  try {
    const response = await axiosInstance.get("/users")
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (id:string) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`)
    return response.data
  } catch (error) {
    
  }
}


export const editUser = async (id: string, updatedUser:{name: string, email:string, role:string }) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, updatedUser)
    console.log(response + "Користувач успішно змінений")
    return response.data
  } catch (error) {
    console.log(error)
  }
}
