// src/components/RelatedArticles.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const ArticleList = ({ blogHeading, articles }) => {
  return (
    <div className="my-8 mx-8 max-h-96 overflow-y-auto p-4 border-2 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{blogHeading}</h2>
      <div className="flex flex-col space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-gray-600">{article.summary}</p>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-gray-400 mr-2"
              />
              <span className="text-sm text-gray-500">
                {article.readTime} read
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
