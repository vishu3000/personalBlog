"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import DataCard from "./dataCard";
import DataCardHorizontal from "./dataCardHorizontal";

const BlogHub = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [labels, setLabels] = useState([]);
  const [activeTab, setActiveTab] = useState("all-posts");
  const [allData, setAllData] = useState([]);

  const modifyResultArray = useCallback((result) => {
    const labelArray = [];
    const resultArray = result.map((item) => {
      if (!labelArray.includes(item.label[0])) {
        labelArray.push(item.label[0]);
      }
      return {
        title: item.title[0],
        summary: item.summary[0],
        label: item.label[0],
        author: item.author[0],
        date: item.date[0],
        imageUrl: item.imageUrl,
        id: item._id,
        views: item.views,
        likes: item.likes,
        comments: item.comments,
      };
    });

    return { _result: resultArray, _labels: labelArray };
  }, []);

  const handleTabClick = useCallback(
    (e, tabName) => {
      setActiveTab(tabName);
      setData(
        tabName === "all-posts"
          ? allData
          : allData.filter(
              (item) =>
                item.label.toLowerCase().replace(/\s+/g, "-") === tabName
            )
      );
    },
    [allData]
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/getAllData");
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      const { _result, _labels } = modifyResultArray(result);
      setData(_result);
      setAllData(_result);
      setLabels(_labels);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [modifyResultArray]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tabButtons = useMemo(
    () => (
      <>
        <button
          className={`tab-btn px-4 py-2 text-gray-600 border-b-2 ${
            activeTab === "all-posts"
              ? "border-red-500 text-red-500"
              : "border-transparent"
          }`}
          data-tab="all-posts"
          onClick={(e) => handleTabClick(e, "all-posts")}
        >
          All Posts
        </button>
        {labels.map((item, index) => (
          <button
            className={`tab-btn px-4 py-2 text-gray-600 border-b-2  ${
              activeTab === item.toLowerCase().replace(/\s+/g, "-")
                ? "border-red-500 text-red-500"
                : "border-transparent"
            }`}
            data-tab={item.toLowerCase().replace(/\s+/g, "-")}
            key={index}
            onClick={(e) =>
              handleTabClick(e, item.toLowerCase().replace(/\s+/g, "-"))
            }
          >
            {item}
          </button>
        ))}
      </>
    ),
    [labels, activeTab, handleTabClick]
  );

  return (
    <div className="flex items-center justify-center mt-10 mb-5 flex-col">
      <div id="nav">{tabButtons}</div>
      {loading ? (
        <div> Loading ....</div>
      ) : (
        <div id="all-posts" className="w-2/3 mt-55">
          <ul>
            <li className="flex flex-wrap items-center justify-center">
              {data.map((item, index) =>
                activeTab == "all-posts" ? (
                  <DataCard key={index} data={item} />
                ) : (
                  <DataCardHorizontal key={index} data={item} />
                )
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogHub;
