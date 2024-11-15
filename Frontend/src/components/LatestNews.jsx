import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "c6b5f4fce91248368d043c5d9afeabe5";
  const API_URL = "https://newsapi.org/v2/everything";
  const companies = [
    "TCS",
    "Infosys",
    "Wipro",
    "Google",
    "Amazon",
    "Dell",
    "HP",
    "Cisco",
  ];

  useEffect(() => {
    const fetchAllCompanyNews = async () => {
      setLoading(true);
      const allNews = [];

      try {
        for (const company of companies) {
          const response = await axios.get(API_URL, {
            params: {
              apiKey: API_KEY,
              q: company,
              language: "en",
              sortBy: "publishedAt",
              pageSize: 3,
            },
          });

          allNews.push({ company, articles: response.data.articles });
        }

        setNewsData(allNews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company news:", error);
      }
    };

    fetchAllCompanyNews();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">
          Latest News on Companies
        </h2>
        {loading ? (
          <p>Loading news...</p>
        ) : (
          <div className="space-y-8">
            {newsData.map((newsItem, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-xl font-bold mb-4">{newsItem.company}</h3>
                <ul className="space-y-4">
                  {newsItem.articles.map((article, idx) => (
                    <li key={idx} className="border-b pb-4">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-blue-600 hover:underline"
                      >
                        {article.title}
                      </a>
                      <p className="text-sm text-gray-600">
                        {article.description}
                      </p>
                      <span className="text-xs text-gray-500">
                        Published on:{" "}
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNews;