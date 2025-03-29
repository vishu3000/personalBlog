import Image from "next/image";
import React from "react";

const AuthorInfo = ({ author, date, readTime, authorAvatar }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
      <Image
        src={authorAvatar || "/profilePlaceHolder.jpeg"}
        alt={`${author}'s avatar`}
        width={32}
        height={32}
      />
    </div>
    <div className="flex items-center text-sm text-gray-600">
      <span>{author}</span>
      <span className="mx-2">•</span>
      <span>{date}</span>
      <span className="mx-2">•</span>
      <span>{readTime} read</span>
    </div>
  </div>
);

export default AuthorInfo;
