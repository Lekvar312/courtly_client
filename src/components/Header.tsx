import React,{useState} from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleMenu = () => {
    setIsMenuOpen((prev) =>!prev )
  }

  return (
    <header className="fixed left-0 top-0 w-full border-b-1 border-slate-200 h-16 shadow-xl flex items-center bg-white px-4 justify-between">
      <h1 className="text-3xl font-bold">Courtly</h1>
      <nav className={`${isMenuOpen ? "flex": "hidden" } absolute md:static transition-all top-16 left-0 bg-white md:bg-transparent shadow-md md:shadow-none md:flex w-full items-center justify-between`}>
        <ul className='flex  flex-col items-center text-xl pb-2.5 md:pb-0 md:flex-row md:text-lg gap-5 mx-auto'>
          <li>
            <Link onClick={() => setIsMenuOpen(false)} to="/">Про нас</Link>
          </li>
          <li>
            <Link onClick={() => setIsMenuOpen(false)} to="/courts">Майданчики</Link>
          </li>
          <li>
            <Link onClick={() => setIsMenuOpen(false)} to="/">Контакти</Link>
          </li>
        </ul>
      </nav>
      <span className="flex gap-4">
      <AuthButton />
      <button onClick={handleMenu} className="block md:hidden cursor-pointer">
        {isMenuOpen ? <X size={35}/> : <Menu size={35} />}
      </button>
      </span>
    </header>
  );
};

export default Header;
