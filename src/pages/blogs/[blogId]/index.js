import NavList from "@/components/NavList";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

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

const SocialShare = () => {
  const socialIcons = [
    { icon: faFacebookF, label: "Share on Facebook" },
    { icon: faTwitter, label: "Share on Twitter" },
    { icon: faLinkedinIn, label: "Share on LinkedIn" },
    { icon: faLink, label: "Copy link" },
  ];

  return (
    <div className="flex items-center gap-4 mt-8 pt-4 border-t">
      {socialIcons.map(({ icon, label }) => (
        <button
          key={label}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label={label}
        >
          <FontAwesomeIcon icon={icon} className="w-5 h-5 text-gray-600" />
        </button>
      ))}
    </div>
  );
};

const BlogPost = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const { blogId } = router.query;
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const increaseLikes = useCallback(() => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  }, [hasLiked]);

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
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();

    return () => {
      // store likes, views and comment in Mongodb
    };
  }, [blogId]);

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
      <article className="max-w-3xl mx-auto px-8 py-8 my-8 border-2 shadow-lg rounded-lg bg-white">
        <AuthorInfo
          author={blog.author}
          date={blog.date}
          readTime={blog.readTime}
          authorAvatar={blog.authorAvatar}
        />

        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-6">{blog.summary}</p>

        {blog.imageUrl && (
          <div className="mb-8">
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

        {session && <SocialShare />}

        {session && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <span>{blog.views || 0} views</span>
              <span>•</span>
              <span>{blog.comments || 0} comments</span>
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
    </>
  );
};

export default BlogPost;
