/* eslint-disable react-hooks/rules-of-hooks */
import NavList from "@/components/NavList";
import React, { useState } from "react";
import { useRouter } from "next/router";
import FormPreview from "./formPreview";

const index = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");

  // Handle Image Change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Preview Image
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !story || !label || !image || !summary)
      return alert("All fields are required!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("story", story);
    formData.append("label", label);
    formData.append("image", image);
    formData.append("summary", summary);

    const author = "ADMIN";
    const _date = new Date();
    const date = _date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    formData.append("author", author);
    formData.append("date", date);

    try {
      const response = await fetch("/api/initialBlog", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);

      // Redirect to home page after successful submission
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      setMessage("Upload failed. Try again!");
    }
  };

  return (
    <>
      <NavList />
      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex-1 max-w-3xl px-8 py-8 my-8 border-2 shadow-lg rounded-lg bg-white max-h-fit">
          <h2 className="text-3xl font-bold mb-4">Blog Fields</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <textarea
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full p-2 border rounded"
              rows="2"
            />

            <textarea
              placeholder="Your Story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
            />

            <input
              type="text"
              placeholder="Label (e.g., Fiction, Adventure)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border"
            />

            {/* {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-32 object-cover rounded mt-2"
              />
            )} */}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>

          {message && <p className="text-green-600 mt-3">{message}</p>}
        </div>
        <div className="border-l-2 border-gray-300"></div>
        <div className="flex-1 max-w-3xl px-8 py-8 my-8">
          <FormPreview
            title={title}
            story={story}
            summary={summary}
            imageUrl={preview}
          />
        </div>
      </div>
    </>
  );
};

export default index;
