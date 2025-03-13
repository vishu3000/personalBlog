import React from "react";
import NavList from "./NavList";
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
      <NavList isHome={true} />
      <div className="flex flex-col items-center justify-center h-[35rem] ">
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
