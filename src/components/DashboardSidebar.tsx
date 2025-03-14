
import DashboardSidebarItems from "./DashboardSidebarItems"
import {Menu, Users, Volleyball, ListCheck } from "lucide-react"
import { Link } from "react-router-dom"

interface AdminSideBar {
  isOpen: boolean,
  handleDashboard: () => void
}

const DashboardSidebar:React.FC<AdminSideBar> = ({isOpen, handleDashboard}) => {

  return (
    <aside className={`border-1 p-2 flex gap-9 flex-col transition-all border-slate-200 rounded shadow-2xl h-full ${isOpen ? "w-2xs" : 'w-16'}`}>
    <span className={`flex items-center ${isOpen ? "justify-between" : "justify-center"}`} >
      <h2 className={`text-2xl font-medium transition-all  ${isOpen ? 'flex' : 'hidden'}`}>Courtly Dashboard</h2>
      <button className='cursor-pointer flex items-center justify-end' onClick={handleDashboard}>
        <Menu strokeWidth={2} size={35}/> 
      </button>
    </span>
    <nav className="">
      <ul className='flex flex-col gap-3'>
        <Link to={"users"}>
          <DashboardSidebarItems icon={<Users/>} isOpen={isOpen}> Користувачі</DashboardSidebarItems>
        </Link>
        <Link to={"courts"}>
          <DashboardSidebarItems icon={<Volleyball/>} isOpen={isOpen}> Майданчики</DashboardSidebarItems>
        </Link>
          <DashboardSidebarItems icon={<ListCheck />} isOpen={isOpen}> Бронювання </DashboardSidebarItems>
      </ul>
    </nav>
</aside>

  )
}

export default DashboardSidebar