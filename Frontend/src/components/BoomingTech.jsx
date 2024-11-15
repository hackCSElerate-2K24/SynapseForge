import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BoomingTech = () => {
  const [jobTitleCounts, setJobTitleCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("developer");

  const API_URL = "https://api.adzuna.com/v1/api/jobs/us/search/2";
  const APP_ID = "33fbf88d";
  const APP_KEY = "4af97bfa140456190e23e169c43b1b9e";

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          results_per_page: 50,
          what: query,
        },
      });

      if (response.data.results) {
        const titleCounts = response.data.results.reduce((acc, job) => {
          let title = job.title.toLowerCase().trim();
          title = title.replace(/full\s?-?\s?stack/g, "fullstack");
          acc[title] = (acc[title] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(titleCounts).map(
          ([title, count]) => ({ title, count })
        );

        setJobTitleCounts(chartData);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  const labels = jobTitleCounts.map((item) => item.title);
  const data = jobTitleCounts.map((item) => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Real-Time Job Title Trend",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Job Titles",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Jobs",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Navbar />
      <div className="search-container flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search job role (e.g., developer, designer)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full ml-3 max-w-[300px] mt-5 rounded-md"
        />
        <Button
          onClick={fetchJobData}
          className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-4 py-2 mt-5 rounded-md"
        >
          Search
        </Button>
      </div>
      {loading ? (
        <p>Loading real-time job data...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-center mb-4">
            Real-Time Job Title Trends
          </h2>
          <div className="h-[400px] w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default BoomingTech;
