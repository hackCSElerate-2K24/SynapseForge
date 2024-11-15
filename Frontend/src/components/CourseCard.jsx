import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 p-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        {course.title}
      </h2>
      <div className="mb-4">
        <p className="text-lg text-gray-600">
          <span className="font-bold">Duration: </span>
          {course.duration}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-bold">Price: </span>₹
          {course.price.toLocaleString()}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-bold">Tutor: </span>
          {course.tutor}
        </p>
      </div>
      <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
        Enroll Now
      </button>
    </div>
  );
};

export default CourseCard;