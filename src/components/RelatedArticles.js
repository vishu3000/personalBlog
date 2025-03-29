// src/components/RelatedArticles.js
import React from "react";
import Image from "next/image";

const ArticleList = ({ blogHeading, articles, blogId }) => {
  return (
    <div className="my-8 mx-8 max-h-96 overflow-y-auto p-4  bg-white">
      <h2 className="text-2xl font-bold mb-4">{blogHeading}</h2>
      <div className="flex flex-col space-y-4">
        {articles.map((article) => (
          <a href={`/blogs/${article._id}`} key={article._id}>
            <div className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300 flex h-36">
              {/* <div className="blog-card__image boreder rounded-lg mr-4 ">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "120px", height: "120px" }}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div> */}
              <div>
                <h3 className="text-xl font-semibold line-clamp-1">
                  {article.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{article.summary}</p>
              </div>

              {/* <div className="flex items-center mt-2">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-gray-400 mr-2"
                />
                <span className="text-sm text-gray-500">
                  {article.readTime} read
                </span>
              </div> */}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
