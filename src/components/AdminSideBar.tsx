import { Menu} from "lucide-react"
import { SquareUser } from 'lucide-react';

interface AdminSideBar {
  isOpen: boolean,
  handleDashboard: () => void
}

const AdminSideBar = ({isOpen, handleDashboard}: AdminSideBar) => {

  return (
    <aside className={`border-1 p-2 flex gap-9 flex-col transition-all border-slate-200 rounded shadow-2xl h-full ${isOpen ? "w-2xs" : 'w-16'}`}>
    <span className={`flex items-center ${isOpen ? "justify-between" : "justify-center"}`} >
      <h2 className={`text-2xl font-medium transition-all  ${isOpen ? 'flex' : 'hidden'}`}>Courtly Dashboard</h2>
      <button className='cursor-pointer flex items-center justify-end' onClick={handleDashboard}>
        <Menu strokeWidth={2} size={35}/> 
      </button>
    </span>
    <nav className="">
      {isOpen &&
      <ul className='flex flex-col gap-3'>
        <li className="bg-sky-500 hover:bg-sky-600 transition-all text-white py-1.5 text-center rounded text-xl cursor-pointer">Користувачі</li>
        <li className="bg-sky-500 hover:bg-sky-600 transition-all text-white py-1.5 text-center rounded text-xl cursor-pointer">Майданчики</li>
        <li className="bg-sky-500 hover:bg-sky-600 transition-all text-white py-1.5 text-center rounded text-xl cursor-pointer">Типи Майданчиків</li>
        <li className="bg-sky-500 hover:bg-sky-600 transition-all text-white py-1.5 text-center rounded text-xl cursor-pointer">Бронювання</li>
      </ul>
      }
    </nav>
</aside>

  )
}

export default AdminSideBar