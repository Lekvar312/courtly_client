import React from 'react'

type SideBarItem = {
  children: string,
  icon: React.ReactNode,
  isOpen: boolean,
}

const AdminSideBarItems:React.FC<SideBarItem> = ({children, icon, isOpen}) => {
  return (
    <li 
      className={`bg-gray-500 hover:bg-gray-700 text-white transition-all  py-1.5 text-center rounded text-xl cursor-pointer flex items-center justify-center gap-2.5`}>
      {icon}
      {isOpen &&
        <span>
          {children}
        </span>
      }
    </li>
  )
}

export default AdminSideBarItems