import NavList from "@/components/NavList";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const FormPreview = (props) => {
  const { title, summary, story, imageUrl } = props;
  const _date = new Date();
  const date = _date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <>
      <div className="max-w-3xl mx-auto px-8 py-8 my-8 border-2 shadow-lg rounded-lg bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src="/profilePlaceHolder.jpeg"
              alt="Author"
              width={32}
              height={32}
            />
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span>Admin</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span>2 min read</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 text-xl font-semibold mb-6">{summary}</p>

        {imageUrl && (
          <div className="mb-8">
            <Image
              src={imageUrl}
              alt="Blog cover"
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="prose max-w-none">{story}</div>

        <div className="flex items-center gap-4 mt-8 pt-4 border-t">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="w-5 h-5 text-gray-600"
            />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon
              icon={faTwitter}
              className="w-5 h-5 text-gray-600"
            />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="w-5 h-5 text-gray-600"
            />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon icon={faLink} className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <span>0 views</span>
            <span>•</span>
            <span>0 comments</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-red-500"> 0 ❤️</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPreview;
