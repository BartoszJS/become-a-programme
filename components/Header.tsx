import React, { useEffect, useState } from "react";
import { BellIcon, SearchIcon, UserCircleIcon } from "@heroicons/react/solid";
import logo from "../public/become-a-programmer-logo.svg";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"} h-[60px]`}>
      <div className='flex items-center space-x-2 md:space-x-10 font-extralight'>
        <Link href='/'>
          <img
            src={logo.src}
            alt='logo'
            width={200}
            height={150}
            className='cursor-pointer object-contain'
          />
        </Link>
        <ul className='hidden space-x-4 md:flex'>
          <Link href='/react'>
            <li className='headerLink'>React</li>
          </Link>
          <Link href='/angular'>
            <li className='headerLink'>Angular</li>
          </Link>
          <Link href='/vuejs'>
            <li className='headerLink'>Vue.js</li>
          </Link>
          <Link href='/pricing'>
            <li className='headerLink'>Pricing</li>
          </Link>
        </ul>
      </div>
      <div className='flex items-center space-x-4 text-md font-light'>
        {user ? (
          <div className='flex items-center space-x-4 '>
            <Link href='/account'>
              <UserCircleIcon className=' sm:inline h-6 w-6 ' />
            </Link>
            <BiLogOut
              onClick={logout}
              className='sm:inline h-6 w-6 cursor-pointer'
            />
          </div>
        ) : (
          <Link href='/login'>
            <BiLogIn className=' sm:inline h-6 w-6 ' />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
