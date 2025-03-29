import React, { useEffect, useState } from "react";
import ArticleList from "./RelatedArticles";
import { isValidArray } from "@/utils/utils";

const RhsWidget = (props) => {
  const { session, blogLabel, blogId } = props;
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [likedArticles, setLLikedArticles] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const response = await fetch(`/api/getAllData`);
      if (!response.ok) {
        throw new Error("Failed to fetch All blog data");
      }
      const data = await response.json();
      const likedData = data.filter(
        (item) =>
          item.likes &&
          item.likes.includes(session?.user?.email) &&
          blogId != item._id
      );
      const relatedData = data.filter(
        (item) => item.label.includes(blogLabel) && blogId != item._id
      );
      setRelatedArticles(relatedData);
      setLLikedArticles(likedData);
    };

    fetchAll();
  }, []);
  return (
    <div className="md:w-1/4 ">
      <div className="flex flex-col sticky top-4">
        {isValidArray(relatedArticles) && (
          <>
            <ArticleList
              articles={relatedArticles}
              blogHeading={"Related Blogs"}
            />
            <div className="my-4 h-px bg-gray-300" />
          </>
        )}

        {isValidArray(likedArticles) && (
          <ArticleList
            articles={likedArticles}
            blogHeading={"Blogs You Liked.."}
          />
        )}
      </div>
    </div>
  );
};

export default RhsWidget;
