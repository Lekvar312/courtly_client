import {useState, useEffect} from 'react'
import { deleteUser, getAllUsers } from '../services/UserService'
import DashboardTable from './DashboardTable'

interface User {
  _id:string,
  name:string,
  email:string,
  role:string,
}

const DashboardUsers = () => {

  const [users, setUsers] = useState<User[] | null> (null)
  useEffect(()=> {
    getAllUsers()
    .then((response) => {
      if(response) setUsers(response)
    })
  },[])


  const handleDelete = async (id:string) => {
    try {
      await deleteUser(id)
      setUsers((prevUsers) => prevUsers?.filter((user) => user._id !== id) || [])
    } catch (error) {
      console.log(error, "Помилка під час видалення")
    }
  }
  const handleEdit= () => {

  }

  const columns = [
    { key: '_id', label: 'ID' },
    { key: 'name', label: 'Ім\'я' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Роль' },
  ]

  return (
    <>
      <h2 className='text-2xl font-bold'>Панель Адміністратора: Користувачі</h2>
      <DashboardTable onDelete={handleDelete} onEdit={handleEdit} columns={columns} data={users || []} />
    </>
  )
}

export default DashboardUsers