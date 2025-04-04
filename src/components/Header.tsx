import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<null | HTMLDivElement>(null);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed left-0 top-0 w-full border-b-1 border-slate-200 h-16 shadow-xl flex items-center bg-white px-4 justify-between">
      <h1 className="text-3xl font-bold">Courtly</h1>
      <div ref={menuRef}>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute md:static transition-all  top-16 left-0 bg-white md:bg-transparent shadow-md md:shadow-none md:flex w-full items-center justify-between`}
        >
          <ul className="flex bg-white flex-col items-center text-xl pb-2.5 md:pb-0 md:flex-row md:text-lg gap-5 mx-auto">
            <li>
              <Link onClick={() => setIsMenuOpen(false)} to="/">
                Про нас
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsMenuOpen(false)} to="/courts">
                Майданчики
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsMenuOpen(false)} to="/">
                Контакти
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <span className="flex gap-4">
        <AuthButton />
        <button onClick={handleMenu} className="block md:hidden cursor-pointer">
          {isMenuOpen ? <X size={35} /> : <Menu size={35} />}
        </button>
      </span>
    </header>
  );
};

export default Header;
