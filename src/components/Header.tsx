import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 w-full border-b-1 border-slate-200 h-16 shadow-xl flex items-center bg-white px-4 justify-between">
      <h1 className="text-3xl font-bold">Courtly</h1>
      <nav className="flex w-full items-center justify-between">
        <ul className="flex items-center text-lg gap-7 mx-auto">
          <li>Про нас</li>
          <li>Майданчики</li>
          <li>Контакти</li>
        </ul>
        <a href="" className="bg-sky-500 hover:bg-sky-600 px-4 py-2 text-lg rounded text-white">Зареєструватись</a>
      </nav>
    </header>
  )
}

export default Header
