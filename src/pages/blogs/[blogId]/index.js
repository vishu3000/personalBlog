import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLink,
  faHighlighter,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import NavList from "@/components/NavList";
import {
  copyLink,
  highlightSelection,
  isValidArray,
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnWhatsApp,
  shareOnX,
  throttle,
  updateFields,
} from "@/utils/utils";
import CommentSection from "@/components/commentSection";
import RelatedArticles from "@/components/RelatedArticles";

// Separate components for better organization
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

// SocialShare component for the fixed social bar
const SocialShareFixed = (props) => {
  const { currentPath } = props;
  const socialIcons = [
    {
      icon: faFacebookF,
      label: "Share on Facebook",
      color: "bg-blue-600",
      callBack: shareOnFacebook,
    },
    {
      icon: faTwitter,
      label: "Share on Twitter",
      color: "bg-blue-400",
      callBack: shareOnX,
    },
    {
      icon: faLink,
      label: "Copy link",
      color: "bg-red-500",
      callBack: copyLink,
    },
    {
      icon: faLinkedinIn,
      label: "Share on LinkedIn",
      color: "bg-blue-700",
      callBack: shareOnLinkedIn,
    },
    {
      icon: faWhatsapp,
      label: "Share on WhatsApp",
      color: "bg-green-500",
      callBack: shareOnWhatsApp,
    },
  ];

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-slate-100 shadow-lg rounded-3xl p-4 ml-8">
      {socialIcons.map(({ icon, label, color, callBack }) => (
        <button
          key={label}
          className={`flex items-center justify-center w-12 h-12 ${color} text-white rounded-full mb-2 transition duration-300 transform hover:scale-110`}
          aria-label={label}
          onClick={() => callBack(currentPath)}
        >
          <FontAwesomeIcon icon={icon} className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

const BlogPost = () => {
  const router = useRouter();
  // Get the current path
  const currentPath = router.asPath;
  const { data: session } = useSession();
  const { blogId } = router.query;
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [prevLikes, setPrevLikes] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [save, isSaved] = useState(false);

  const storeComments = useCallback(
    (_comment) => {
      setComments((oldComments) => {
        let newComments = isValidArray(oldComments)
          ? [...oldComments, _comment]
          : [_comment];
        updateFields(blogId, "comments", newComments, session);
        setCommentCount((prev) => prev + 1);
        return newComments;
      });
    },
    [blogId, session]
  );

  // Throttle the function that calls storeComments
  const throttledStoreComments = throttle(storeComments, 2000);

  const updateViewCount = useCallback(
    (initialViews) => {
      const currentUser = session?.user?.email;
      if (!currentUser) return;

      let newViews = [];
      if (!initialViews.includes(session.user?.email)) {
        newViews.push(session.user?.email);
        updateFields(blogId, "views", newViews, session);
      }
    },
    [session, blogId]
  );

  const saveArticle = useCallback(() => {
    isSaved((prev) => !prev);
  }, []);

  const increaseLikes = useCallback(() => {
    const currentUser = session?.user?.email;
    if (!currentUser) return;

    setPrevLikes((oldLikes) => {
      const userHasLiked = oldLikes.includes(currentUser);
      let newLikes;

      if (!userHasLiked) {
        // Add user to likes
        newLikes = [...oldLikes, currentUser];
        setLikes(newLikes.length);
        setHasLiked(true);
      } else {
        // Remove user from likes
        newLikes = oldLikes.filter((email) => email !== currentUser);
        setLikes(newLikes.length);
        setHasLiked(false);
      }

      // Update likes in the database immediately
      updateFields(blogId, "likes", newLikes, session);
      return newLikes;
    });
  }, [session, blogId]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        setIsLoading(true);
        const response = await fetch(`/api/getBlogData?id=${blogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        const initialLikes = data?.likes || [];
        const initialView = data?.views || [];
        setPrevLikes(initialLikes);
        setBlog(data);
        setLikes(initialLikes.length);
        setHasLiked(initialLikes.includes(session?.user?.email));
        updateViewCount(initialView);
        setComments(data?.comments);
        setCommentCount(data.comments?.length || 0);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [session]);

  // Sample related articles data (replace with actual data)
  const relatedArticles = [
    {
      id: 1,
      title: "Understanding React Hooks",
      summary: "A deep dive into React hooks.",
      readTime: "5 min",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="text-center">Blog not found</div>;
  }

  return (
    <>
      <NavList />
      {session && <SocialShareFixed currentPath={currentPath} />}
      <div className="flex justify-center align-middle">
        <div className="flex flex-col md:w-3/4">
          <div className="flex max-w-6xl ml-auto mr-11 my-8">
            <div className="flex flex-col space-y-4 mr-8 sticky top-8 self-start">
              <button
                onClick={highlightSelection}
                className="relative w-20 h-20 bg-yellow-500 text-white flex items-center justify-center rounded-lg shadow-lg z-10 transition-transform duration-300 transform hover:scale-110 hover:bg-yellow-700 hover:text-brown-700"
              >
                <FontAwesomeIcon icon={faHighlighter} />
              </button>
              <button
                onClick={saveArticle}
                className="relative w-20 h-20 bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-lg z-10 transition-transform duration-300 transform hover:scale-110 hover:bg-blue-700 hover:text-brown-700"
              >
                <FontAwesomeIcon icon={faBookmark} />
              </button>
            </div>
            <article className="relative px-8 py-8 border-2 shadow-lg rounded-lg bg-white overflow-y-auto">
              {save && (
                <div className="absolute top-4 right-4">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    size="2xl"
                    style={{ color: "#583232" }}
                  />
                </div>
              )}
              <AuthorInfo
                author={blog.author}
                date={blog.date}
                readTime={blog.readTime}
                authorAvatar={blog.authorAvatar}
              />

              <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
              <p className="text-gray-600 mb-6">{blog.summary}</p>

              {blog.imageUrl && (
                <div className="mb-8 flex justify-center">
                  <Image
                    src={blog.imageUrl}
                    alt="Blog cover"
                    width={800}
                    height={400}
                    className="rounded-lg"
                    priority
                    loading="eager"
                  />
                </div>
              )}

              <div className="prose max-w-none">{blog.story}</div>

              {session && (
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <span>{blog.views?.length || 0} views</span>
                    <span>•</span>
                    <span>{commentCount || 0} comments</span>
                  </div>
                  <button
                    onClick={increaseLikes}
                    className={`flex items-center gap-2 hover:opacity-75 transition-opacity `}
                    aria-label="Like post"
                  >
                    <span>{likes}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                      viewBox="0 0 512 512"
                      className="transition-colors"
                    >
                      <path
                        fill={hasLiked ? "#ec096b" : "none"}
                        stroke={hasLiked ? "none" : "#ec096b"}
                        strokeWidth="30"
                        d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </article>
          </div>
          {session && (
            <div className="relative ml-auto mr-11">
              <CommentSection
                session={session}
                prevComments={blog.comments || []}
                getComments={throttledStoreComments}
              />
            </div>
          )}
        </div>
        {/* Related Articles Section */}
        <div className="md:w-1/4 ">
          <RelatedArticles articles={relatedArticles} />
        </div>
      </div>
    </>
  );
};

export default BlogPost;
