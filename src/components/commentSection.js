/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { customDate, isValidArray } from "@/utils/utils";

const CommentSection = (props) => {
  const { session, prevComments, getComments } = props;
  const [comments, setComments] = useState(prevComments);
  const [newComment, setNewComment] = useState("");
  const user = session.user?.email;

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const date = new Date();
      const commentData = {
        commentOwner: user,
        comment: newComment,
        time: date,
      };
      setComments((prev) => [...prev, commentData]);
      getComments(commentData);
      setNewComment("");
    }
  };

  // Sort comments by date (latest first)
  const sortedComments = isValidArray(comments)
    ? [...comments].sort((a, b) => new Date(b.time) - new Date(a.time))
    : [];

  return (
    <div className="comment-section">
      <h2>Discussion ({sortedComments?.length || 0})</h2>
      <div className="comment-input">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button className="mt-4" onClick={handlePostComment}>
          Post comment
        </button>
      </div>
      <div>
        {sortedComments.map((comment, index) => (
          <div className="comment bg-gray-100 p-2 mb-2 rounded" key={index}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Image
                  src="/profilePlaceHolder.jpeg"
                  height={40}
                  width={40}
                  className="rounded-full mr-2"
                />
                <span className="font-bold">{comment.commentOwner}</span>
              </div>
              <span className="text-gray-500 text-sm">
                {customDate(comment.time)}
              </span>
            </div>
            <hr className="border-gray-300 my-1" />
            <p className="ml-8 break-words">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
