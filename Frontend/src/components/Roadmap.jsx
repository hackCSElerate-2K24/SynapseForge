import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';

const RoadmapModal = ({ isOpen, onClose, title, roadmap }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{title} Roadmap</h2>
        <ul className="space-y-3">
          {roadmap.map((item, index) => (
            <li key={index} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const Roadmap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState({ title: '', roadmap: [] });
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roadmaps = {
    "Web Development": [
      "Learn HTML, CSS, and JavaScript",
      "Learn a JavaScript Framework (e.g., React, Vue, or Angular)",
      "Learn Responsive Design & CSS Frameworks (e.g., Bootstrap, Tailwind CSS)",
      "Understand Version Control (e.g., Git & GitHub)",
      "Practice building projects",
    ],
    "Data Science": [
      "Learn Python or R",
      "Understand basic statistics and probability",
      "Learn data manipulation with pandas or dplyr",
      "Learn data visualization techniques",
      "Get familiar with machine learning algorithms",
      "Work on data science projects",
    ],
    "Machine Learning": [
      "Learn Python and its libraries (NumPy, Pandas, Matplotlib)",
      "Understand Machine Learning Algorithms",
      "Learn Deep Learning techniques",
      "Work on ML Projects (e.g., classification, regression)",
      "Learn to use TensorFlow and PyTorch",
    ],
    "Cloud Computing": [
      "Learn Cloud Service Providers (AWS, Google Cloud, Azure)",
      "Understand Cloud Computing Models (IaaS, PaaS, SaaS)",
      "Learn Cloud Storage and Databases",
      "Get familiar with Virtualization and Containers",
      "Work on deploying projects in the cloud",
    ],
    "Mobile App Development": [
      "Learn Java or Kotlin for Android, or Swift for iOS",
      "Learn UI/UX Design Principles",
      "Understand Mobile App Development Frameworks (Flutter, React Native)",
      "Build simple mobile applications",
      "Learn to deploy apps to Google Play Store or Apple App Store",
    ],
  };

  const openModal = (title) => {
    setSelectedRoadmap({ title, roadmap: roadmaps[title] });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Filter roadmaps based on query
  const filteredRoadmaps = Object.keys(roadmaps).filter((domain) =>
    domain.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="text-center p-8">
      <Navbar />
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
            Explore Roadmaps
          </span>
          <h1 className="text-5xl font-bold">Choose Your Roadmap & Start Your Learning Journey</h1>
          <p>Pick a domain and follow the roadmap to master it.</p>

          {/* Search Bar */}
          <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Search for a roadmap"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full"
            />
            <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Roadmap Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredRoadmaps.length > 0 ? (
              filteredRoadmaps.map((domain, index) => (
                <button
                  key={index}
                  onClick={() => openModal(domain)}
                  className="bg-[#6A38C2] text-white p-4 rounded-xl hover:bg-[#4B2F96] transition duration-300"
                >
                  {domain}
                </button>
              ))
            ) : (
              <p>No roadmaps found for "{query}"</p>
            )}
          </div>
        </div>

        <RoadmapModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedRoadmap.title}
          roadmap={selectedRoadmap.roadmap}
        />
      </div>
    </>
  );
};

export default Roadmap;
