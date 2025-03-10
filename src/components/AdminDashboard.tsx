import { useState } from "react"
import AdminSideBar from "./AdminSideBar"

const AdminDashboard = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false)

  const handleDashboardClick = () => {
    setIsDashboardOpen((prev) => !prev)
  }

  return (
    <section className='fixed inset-0 w-full h-full p-2.5 '>
      <AdminSideBar isOpen={isDashboardOpen} handleDashboard={handleDashboardClick} />
    </section>
  )
}

export default AdminDashboard
