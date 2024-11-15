import React, { useState } from "react";
import Navbar from "./shared/Navbar";

const Ats = () => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckATS = () => {
   
    setLoading(true);
    setScore(null);

   
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * (80 - 25 + 1)) + 25;
      setScore(randomScore);
      setLoading(false);
    }, 5000);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <span className="text-orange-500">Free AI</span> Resume ATS Checker
        </h1>
        <p className="text-gray-600 mb-6">
          Free tool to help you check if your resume is optimized for applicant
          tracking systems (ATS).
        </p>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Resume
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              />
              <small className="text-gray-500">
                You need a PDF resume to check ATS-friendly
              </small>
            </div>

            <button
              type="button"
              onClick={handleCheckATS}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Check ATS
            </button>
          </form>

         
          {loading ? (
            <div className="mt-4 text-center">
              <svg
                className="animate-spin h-10 w-10 text-blue-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.952 7.952 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-600 mt-2">
                Analyzing your resume... Please wait.
              </p>
            </div>
          ) : (
            score !== null && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-gray-700">
                  Your Resume ATS Score:{" "}
                  <span className="text-blue-600">{score}%</span>
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Ats;