import React, { MouseEvent, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import lofofrom from '../../public/logonew.png';

const Navigation = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const logout = (e: MouseEvent) => {
    localStorage.removeItem('user');
    window.open("http://localhost:8080/auth/logout", "_self")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 min-h-16">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
        <img src={lofofrom} alt="" className="w-[10%]" />
        <div className="items-center justify-between hidden w-full md:flex md:w-auto " id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink  to={'/'}  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-700 dark:text-blue-500 text-2xl" : " text-2xl block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              }  >Home</NavLink>
            </li>
            <li>
              <NavLink to={'/form'} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-700 dark:text-blue-500 text-2xl" : " text-2xl block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              } >Add Student</NavLink>
            </li>
            <li>
              <NavLink to={'/table'} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-700 dark:text-blue-500 text-2xl" : " text-2xl block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              } >Student Table</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <button onClick={toggleMenu} className="flex text-sm my-4 bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
            <span className="sr-only">Open user menu</span>
            <img className="w-12 h-12 rounded-full" src={user.picture} alt="user photo" />
          </button>
        </div>
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50" onClick={toggleMenu}></div>
            <div ref={menuRef} className="fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 dark:bg-gray-800 dark:border-gray-700 transform transition-transform ease-in-out duration-300" style={{ translateX: isMenuOpen ? 0 : '100%' }}>
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
              </div>
              <ul className="py-2">
                <li>
                  <NavLink to={'/'} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</NavLink>
                </li>
                <li>
                  <NavLink to={'/form'} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add Student</NavLink>
                </li>
                <li>
                  <NavLink to={'/table'} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Student Table</NavLink>
                </li>
                <li>
                  <button onClick={logout} className=" flex w-full justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
