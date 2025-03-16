/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const DataCardHorizontal = ({ data }) => {
  const cardLink = `/blogs/${data.id}`;
  const views = data.views?.length;
  const likes = data.likes?.length;
  const comments = data.comments?.length;
  return (
    <div className="blog-card border-2 shadow-lg rounded-lg overflow-hidden">
      <div className="blog-card__image">
        <img src={data.imageUrl} alt={data.title} />
      </div>

      <div className="blog-card__content">
        <div className="blog-card__header">
          <div className="blog-card__author">
            <img
              src="/profilePlaceHolder.jpeg"
              alt={data.author}
              className="author-avatar"
            />
            <span>{data.author}</span>
          </div>
          <div className="blog-card__meta">
            <span>{data.date}</span>
            <span>•</span>
            <span>2 min read</span>
          </div>
          <button className="blog-card__menu">⋮</button>
        </div>

        <Link href={cardLink}>
          <div className="hover:text-indigo-900 cursor-pointer">
            <h2 className="blog-card__title">{data.title}</h2>
            <p className="blog-card__subtitle">{data.summary}</p>
          </div>
        </Link>

        <div className="blog-card__stats">
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

export default DataCardHorizontal;
