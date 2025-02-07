import Link from "next/link";
import React from "react";
import { TypewriterEffect } from "./ui/typewritter-effect";

function NavigationBar() {
  const words = [
    {
      text: "Write",
    },
    {
      text: "Awesome",
    },
    {
      text: "Blogs",
    },

    {
      text: "Here",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="h-2/3 bg-[url('../public/background.jpg')] bg-cover backdrop-filter backdrop-brightness-50">
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center">
          {/* User Avatar to be added here */}
          <span className="text-white text-xl font-bold">Logo</span>
        </div>
        <div className="flex space-x-8">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link href="/services" className="text-white hover:text-gray-300">
            Services
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-[40rem] ">
        <p className="text-gray-800 dark:text-neutral-200 text-3xl font-bold  mb-10">
          Are you a blog? Because every time I read you, I keep coming back for
          more.
        </p>
        <TypewriterEffect words={words} />
      </div>
    </div>
  );
}

export default NavigationBar;
