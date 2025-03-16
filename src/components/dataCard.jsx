import Image from "next/image";
import Link from "next/link";
import React from "react";

// ... existing code ...
const DataCard = (props) => {
  const { data } = props;
  const views = data.views?.length;
  const likes = data.likes?.length;
  const comments = data.comments?.length;
  const cardLink = `/blogs/${data.id}`;
  return (
    <div class="w-80 h-[495px] rounded overflow-hidden shadow-lg border-2 m-5 flex flex-col">
      <Image
        src={data.imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "200px" }}
        className="max-h-[195px]"
      />
      {/* Write Up Container */}
      <div className="flex flex-col flex-1">
        {/* Author Details */}
        <div className=" mt-3 px-2 flex items-center justify-center">
          <Image
            src="/profilePlaceHolder.jpeg"
            height={40}
            width={40}
            className="rounded-full"
          />
          <div className="flex flex-col mx-4">
            <span>{data.author}</span>
            <span>{data.date} . 2 min read</span>
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
        <Link href={cardLink}>
          <div className="flex flex-col my-2 mx-6 overflow-hidden hover:text-indigo-900 cursor-pointer">
            <span className="text-3xl font-bold mb-2 ">{data.title}</span>
            <span className="overflow-hidden line-clamp-4 ">
              {data.summary}
            </span>
          </div>
        </Link>

        {/* Comments and likes */}
        <div className="flex items-center justify-around py-4 mt-auto mx-6 border-t-2">
          <span>{views || 0} views</span>
          <span>{comments || 0} comments</span>
          <div className="flex justify-center items-center">
            <span className="mr-2">{likes || 0}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
              className="transition-colors"
            >
              <path
                fill={likes > 0 ? "#ec096b" : "none"}
                stroke={likes > 0 ? "none" : "#ec096b"}
                strokeWidth="30"
                d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
