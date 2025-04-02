import React from 'react'

type SideBarItem = {
  children: string,
  icon: React.ReactNode,
  isOpen: boolean,
  colors: {
    mainColor:string,
    hoverColor:string,
  }
}

const AdminSideBarItems:React.FC<SideBarItem> = ({children, colors, icon, isOpen}) => {
  return (
    <li 
      className={`${colors.mainColor} ${colors.hoverColor}  text-white transition-all  py-1.5 text-center rounded text-xl cursor-pointer flex items-center justify-center gap-2.5`}>
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