import { useState, useEffect } from "react";
import { deleteUser, getAllUsers } from "../services/UserService";
import DashboardTable from "./DashboardTable";
import UserEditModal from "./UserEditModal";
import { createPortal } from "react-dom";
import ModalView from "./ModalView";
import { showToast } from "./ToastNotification";
import { ToastContainer } from "react-toastify";
import useDebounce from "../hooks/useDebounce";
import { Search } from "lucide-react";

const columns = [
  { key: "_id", label: "ID" },
  { key: "name", label: "Ім`я" },
  { key: "email", label: "Email" },
  { key: "role", label: "Роль" },
];

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
}

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!users) return;
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [debouncedSearchTerm, users]);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      const updatedUsers = users?.filter((user) => user._id !== id) || [];
      setUsers(updatedUsers);
      showToast("Користувача успішно видалено", "success");
    } catch (error) {
      console.error("Помилка під час видалення", error);
      showToast("Не вдалося видалити користувача", "error");
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedList = users?.map((user) => (user._id === updatedUser._id ? updatedUser : user));
    setUsers(updatedList || []);
    setShowModal(false);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Панель Адміністратора: Користувачі</h2>

      <div className="w-full max-w-md mb-5 flex items-center border border-slate-300 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
        <span className="px-3 text-slate-400">
          <Search size={20} />
        </span>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Пошук за ім’ям або email..."
          className="w-full py-2 pr-4 bg-transparent focus:outline-none"
        />
      </div>

      <DashboardTable onDelete={handleDelete} onEdit={handleEdit} columns={columns} data={filteredUsers || []} />
      <ToastContainer />

      {showModal &&
        createPortal(
          <ModalView onClose={() => setShowModal(false)}>
            <UserEditModal onUpdate={handleUpdateUser} user={selectedUser} />
          </ModalView>,
          document.body
        )}
    </>
  );
};

export default DashboardUsers;
