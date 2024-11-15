import React, { useState } from "react";
import CourseCard from "./CourseCard"; 
import Navbar from "./shared/Navbar";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      duration: "3 months",
      price: 9999,
      tutor: "John Doe",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      duration: "4 months",
      price: 15000,
      tutor: "Jane Smith",
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      duration: "6 months",
      price: 20000,
      tutor: "Peter Parker",
    },
    {
      id: 4,
      title: "Node.js Mastery",
      duration: "4 months",
      price: 12000,
      tutor: "Tony Stark",
    },
    {
      id: 5,
      title: "CSS & HTML Fundamentals",
      duration: "2 months",
      price: 8000,
      tutor: "Bruce Wayne",
    },
    {
      id: 6,
      title: "Data Structures & Algorithms",
      duration: "5 months",
      price: 18000,
      tutor: "Clark Kent",
    },
    {
      id: 7,
      title: "React Native Development",
      duration: "4 months",
      price: 13000,
      tutor: "Natasha Romanoff",
    },
    {
      id: 8,
      title: "Full-Stack Development",
      duration: "6 months",
      price: 25000,
      tutor: "Wanda Maximoff",
    },
    {
      id: 9,
      title: "Python for Data Science",
      duration: "3 months",
      price: 11000,
      tutor: "Steve Rogers",
    },
    {
      id: 10,
      title: "Machine Learning",
      duration: "6 months",
      price: 20000,
      tutor: "Thor Odinson",
    },
    {
      id: 11,
      title: "AI for Beginners",
      duration: "2 months",
      price: 7000,
      tutor: "Hawkeye",
    },
    {
      id: 12,
      title: "JavaScript in Depth",
      duration: "4 months",
      price: 15000,
      tutor: "Bruce Banner",
    },
    {
      id: 13,
      title: "Intro to C++",
      duration: "5 months",
      price: 18000,
      tutor: "Dr. Strange",
    },
    {
      id: 14,
      title: "SQL for Data Analysis",
      duration: "3 months",
      price: 9000,
      tutor: "Black Panther",
    },
    {
      id: 15,
      title: "Digital Marketing 101",
      duration: "2 months",
      price: 6000,
      tutor: "Doctor Octopus",
    },
    {
      id: 16,
      title: "UI/UX Design Basics",
      duration: "4 months",
      price: 12000,
      tutor: "Ant-Man",
    },
    {
      id: 17,
      title: "Blockchain and Crypto",
      duration: "5 months",
      price: 25000,
      tutor: "Falcon",
    },
    {
      id: 18,
      title: "Android Development",
      duration: "6 months",
      price: 22000,
      tutor: "Scarlet Witch",
    },
    {
      id: 19,
      title: "Cybersecurity Essentials",
      duration: "3 months",
      price: 13000,
      tutor: "Quicksilver",
    },
    {
      id: 20,
      title: "Web Accessibility",
      duration: "2 months",
      price: 9000,
      tutor: "Hawkeye",
    },
    {
      id: 21,
      title: "React Performance Optimization",
      duration: "3 months",
      price: 14000,
      tutor: "Winter Soldier",
    },
    {
      id: 22,
      title: "Cloud Computing",
      duration: "4 months",
      price: 17000,
      tutor: "Vision",
    },
    {
      id: 23,
      title: "SEO Basics",
      duration: "2 months",
      price: 8000,
      tutor: "Loki",
    },
    {
      id: 24,
      title: "Agile Scrum Mastery",
      duration: "5 months",
      price: 21000,
      tutor: "Nick Fury",
    },
    {
      id: 25,
      title: "Game Development with Unity",
      duration: "6 months",
      price: 23000,
      tutor: "Maria Hill",
    },
  ];

  const itemsPerPage = 6; // Number of items to display per page
  const totalPages = Math.ceil(courses.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1); // Current page

  // Paginate the courses based on the current page
  const paginateCourses = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return courses.slice(start, end);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          {paginateCourses().map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4 hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-4 hover:bg-blue-600 disabled:bg-gray-300"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;