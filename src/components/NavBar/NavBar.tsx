'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import IUserSession from '@/Interfaces/IUserSession';
import Swal from 'sweetalert2';

const NavBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userData = JSON.parse(localStorage.getItem('userSession')!);
      setUserData(userData);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    Swal.fire({
      title: "Logged out",
      text: "You have logged out.",
      icon: "success",
      confirmButtonText: "OK",
    });
    router.push('/login');
  };
  const handleLogoutConfirmation = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-black dark:black">
      <div className="ml-2 max-w-full flex flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="bg-white rounded-full border-4 border-yellow-500 overflow-hidden w-16 h-16">
            <Image
              src="/images/pineapple.png" 
              width={100} 
              height={100} 
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-yellow-500">
            piStore
          </span>
        </Link>

        {/* Menu de la derecha */}
        <div className="mr-20 flex items-baseline md:order-2 space-x-3 md:space-x-1 rtl:space-x-reverse">
          {userData?.token ? (
            <>
              {/* Botón para el menú de usuario */}
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-yellow-500 dark:focus:ring-yellow-500"
                id="user-menu-button"
                aria-expanded={dropdownOpen}
                onClick={toggleDropdown}
              >
                <Image
                  className="w-8 h-8 rounded-full"
                  src="/images/userprofile.png"
                  width={100}
                  height={20}
                  alt="user photo"
                />
              </button>

              {/* Dropdown cuando está abierto */}
              {dropdownOpen && (
                <div
                  className="absolute z-50 my-9 text-base list-none border-2 border-yellow-500 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-yellow-500"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="font-extrabold underline block text-base italic text-gray-900 dark:text-slate-200">
                      Signed in
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        href="/cart"
                        className="font-semibold block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-yellow-500"
                      >
                        My Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/dashboard"
                        className="font-semibold block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-yellow-500"
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogoutConfirmation}
                        className="font-semibold block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-yellow-500"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Enlaces cuando no está logueado */}
             <div className="flex items-center space-x-2 border-2 border-yellow-500 rounded-xl p-1">
              <Link href="/login">
                <button className="font-semibold text-gray-100 hover:text-yellow-400 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-2 shadow hover:shadow-yellow-400 duration-700">
                  Log In
                </button>
              </Link>

              <Link href="/register">
                <button className="font-semibold text-gray-100 hover:text-yellow-400 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-2 shadow hover:shadow-yellow-400 duration-700">
                  Register
                </button>
              </Link>
              </div>
            </>
          )}
        </div>

        {/* Enlaces principales */}
        <div
          className="p-1 bg-slate-100 border-2 rounded-full border-yellow-500 items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0.5 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className="font-bold text-xl block p-1 text-black hover:text-yellow-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="font-bold text-xl block p-1 text-black hover:text-yellow-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-bold text-xl block p-1 text-black hover:text-yellow-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
