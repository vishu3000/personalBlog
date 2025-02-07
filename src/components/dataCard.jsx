import Image from "next/image";
import React from "react";

const DataCard = () => {
  return (
    <div class="w-80 h-[495px] rounded overflow-hidden shadow-lg border-2 m-5">
      <Image
        src="/pic1.jpeg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} // optional
        className="max-h-[195px]"
      />
      {/* Write Up Container */}
      <div className="flex flex-col ">
        {/* Author Details */}
        <div className=" mt-3 px-2 flex items-center justify-center">
          <Image
            src="/profilePlaceHolder.jpeg"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col mx-4">
            <span>Admin</span>
            <span>March 21 2023 . 2 min read</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="5"
            viewBox="0 0 128 512"
            className="ml-3"
          >
            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
          </svg>
        </div>
        {/* Write Up */}
        <div className="flex flex-col my-2 mx-6">
          <span className="text-3xl font-bold">A year in Color Trend</span>
          <span>
            Create a blog post subtitle that summarizes your post in a few
            short, punchy sentences and entices your audience to continue
            reading....
          </span>
        </div>
        {/* Commnets and likes */}
        <div className="flex items-center justify-around pt-2 mt-1 mx-6 border-t-2 font">
          <span>0 views</span>
          <span>0 comments</span>
          <div className="flex justify-center items-center">
            <span className="mr-2">0</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
            >
              <path
                fill="#ec096b"
                d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
