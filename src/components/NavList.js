import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";

const NavList = (props) => {
  const { isHome = false } = props;
  return (
    <nav
      className={`flex items-center justify-between p-6 ${
        !isHome ? "bg-[#434A75] h-[100]px" : ""
      }`}
    >
      <div className="flex items-center">
        {/* User Avatar to be added here */}
        <span className="text-white text-xl font-bold">Logo</span>
      </div>
      <div className="flex space-x-8">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link href="/create" className="text-white hover:text-gray-300">
          Create
        </Link>
        <Link href="/contact" className="text-white hover:text-gray-300">
          Contact
        </Link>
        <LoginButton/>
      </div>
    </nav>
  );
};

export default NavList;
