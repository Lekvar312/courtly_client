import {useState, useEffect} from 'react'
import { deleteUser, getAllUsers } from '../services/UserService'
import DashboardTable from './DashboardTable'
import UserEditModal from './UserEditModal'
import { createPortal } from 'react-dom'
import ModalView from './ModalView'
import { showToast } from './ToastNotification'
import { ToastContainer } from 'react-toastify'

const columns = [
  { key: '_id', label: 'ID' },
  { key: 'name', label: 'Ім`я' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Роль' },
]

interface User {
  _id?:string,
  name:string,
  email:string,
  role:string,
}

const DashboardUsers = () => {

  const [users, setUsers] = useState<User[] | null> (null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)


  useEffect(()=> {
    const fetchUsers = async () => {
      const response = await getAllUsers()
      setUsers(response)
    } 
  fetchUsers()   
  },[])
  
  const handleDelete = async (id:string) => {
    try {
      await deleteUser(id)
      setUsers((prevUsers) => prevUsers?.filter((user) => user._id !== id) || [])
      showToast("Користувача успішно видалено", "success")
    } catch (error) {
      console.log(error, "Помилка під час видалення")
      showToast("Не вдалося видалити користувача", "error")
    }
  }

  const handleEdit = (user: User) => {
      setSelectedUser(user);
      setShowModal(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers?.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      return updatedUsers || [];
    });
  };

  return (
    <>
      <h2 className='text-2xl font-bold'>Панель Адміністратора: Користувачі</h2>
      <ToastContainer />
      <DashboardTable onDelete={handleDelete} onEdit={handleEdit} columns={columns} data={users || []} />
      {showModal && createPortal(
            <ModalView onClose={() => setShowModal(false)}> <UserEditModal onUpdate = {handleUpdateUser} user={selectedUser}/></ModalView> , document.body
          )}
    </>
  )
}

export default DashboardUsers