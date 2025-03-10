import { SquareMenu } from "lucide-react"

interface AdminSideBar {
  isOpen: boolean,
  handleDashboard: () => void
}

const AdminSideBar = ({isOpen, handleDashboard}: AdminSideBar) => {

  return (
    <aside className={`border-1 p-2 flex flex-col transition-all border-slate-200 rounded shadow-2xl h-full ${isOpen ? "w-2xs" : 'w-16'}`}>
      <span className='flex items-center justify-between'>
        <button className='cursor-pointer flex items-center justify-end  transition hover:scale-110' onClick={handleDashboard}><SquareMenu strokeWidth={1.5} size={40}/> </button>
        <h2 className={`text-2xl font-medium ${isOpen ? "flex"  : "hidden"}`}>
        Courtly dashboard
        </h2>
      </span>
      {isOpen ? 
      <nav className='w-full'>
        <ul className='pt-2.5 flex flex-col w-full justify-center text-center gap-1.5'>
          <li className='bg-sky-500 w-full font-medium text-lg py-1 hover:bg-sky-600 transition-all  text-white rounded cursor-pointer'>Пункт 1</li>
          <li className='bg-sky-500 font-medium text-lg py-1 hover:bg-sky-600 transition-all  text-white rounded cursor-pointer'>Пункт 1</li>
          <li className='bg-sky-500 font-medium text-lg py-1 hover:bg-sky-600 transition-all  text-white rounded cursor-pointer'>Пункт 1</li>
        </ul>
      </nav> : null}
    </aside>
  )
}

export default AdminSideBar