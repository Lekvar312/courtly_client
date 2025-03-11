import React from 'react'

interface SideBarItem {
  children: string,
  icon: React.ReactNode,
  isOpen: boolean,
}

const AdminSideBarItems = ({children, icon, isOpen}: SideBarItem) => {
  return (
    <li 
      className={`bg-sky-500 hover:bg-sky-600 text-white transition-all  py-1.5 text-center rounded text-xl cursor-pointer flex items-center justify-center gap-2.5`}>
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