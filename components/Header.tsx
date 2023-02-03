import React, { useEffect, useState } from "react";
import { BellIcon, SearchIcon, UserCircleIcon } from "@heroicons/react/solid";
import logo from "../public/become-a-programmer-logo.svg";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`${isScrolled && "bg-[#141414]"} `}>
      <div className='flex items-center space-x-2 md:space-x-10 font-extralight'>
        <img
          src={logo.src}
          alt='logo'
          width={200}
          height={150}
          className='cursor-pointer object-contain'
        />
        <ul className='hidden space-x-4 md:flex'>
          <li className='headerLink'>Home</li>
          <li className='headerLink'>All courses</li>
          <li className='headerLink'>New</li>
          <li className='headerLink'>Pricing</li>
          <li className='headerLink'>My list</li>
        </ul>
      </div>
      <div className='flex items-center space-x-4 text-md font-light'>
        <SearchIcon className='hidden sm:inline h-6 w-6 ' />
        <BellIcon className='hidden sm:inline h-6 w-6 ' />
        <Link href='/account'>
          <UserCircleIcon className=' sm:inline h-6 w-6 ' />
        </Link>
        <BiLogOut className=' sm:inline h-6 w-6 ' />
      </div>
    </header>
  );
};

export default Header;
