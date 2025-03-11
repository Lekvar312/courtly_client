import { useState } from "react"
import DashboardSidebar from "./DashboardSidebar"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false)

  const handleDashboardClick = () => {
    setIsDashboardOpen((prev) => !prev)
  }

  return (
    <section className='fixed inset-0 w-full flex gap-6 h-full p-2.5 '>
      <DashboardSidebar isOpen={isDashboardOpen} handleDashboard={handleDashboardClick} />
      <div className="w-full flex flex-col gap-10 h-full p-2 ">
        <Outlet />
      </div>
    </section>
  )
}

export default Dashboard
