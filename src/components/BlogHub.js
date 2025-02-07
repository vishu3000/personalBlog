import React from "react";
import DataCard from "./dataCard";

const BlogHub = () => {
  return (
    <div class="flex items-center justify-center mt-10 mb-5 flex-col">
      <div id="nav">
        <button
          class="tab-btn px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-black"
          data-tab="all-posts"
        >
          All Posts
        </button>
        <button
          class="tab-btn px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-black"
          data-tab="web-design-101"
        >
          Web Design 101
        </button>
        <button
          class="tab-btn px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-black"
          data-tab="ux-ui"
        >
          UX / UI
        </button>
        <button
          class="tab-btn px-4 py-2 text-gray-600 border-b-2 border-transparent hover:text-black"
          data-tab="tools-tips"
        >
          Tools & Tips
        </button>
      </div>
      <div id="all-posts" class="w-2/3 mt-55">
        <ul>
          <li className="flex flex-wrap items-center justify-center">
            <DataCard />
            <DataCard />
            <DataCard />
            <DataCard />
            <DataCard />
            <DataCard />
            <DataCard />
            <DataCard />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogHub;
