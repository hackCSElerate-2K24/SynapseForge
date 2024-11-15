import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import Navbar from './shared/Navbar';

const mentors = [
    { id: 1, name: 'Arjun Mehta', domain: 'Software Developer', company: 'Oracle', rating: 4.5, profilePhoto: 'https://img.freepik.com/free-photo/portrait-young-indian-businessman-student-sitting-with-pen_1262-17490.jpg?semt=ais_hybrid' },
    { id: 2, name: 'Priya Sharma', domain: 'Data Scientist', company: 'Google', rating: 4.8, profilePhoto: 'https://img.freepik.com/premium-photo/portrait-young-adult-indian-woman-sari_183314-7715.jpg?semt=ais_hybrid' },
    { id: 3, name: 'Ravi Nair', domain: 'Cybersecurity Expert', company: 'Microsoft', rating: 4.7, profilePhoto: 'https://img.freepik.com/free-photo/smiley-man-posing-medium-shot_23-2149915893.jpg?semt=ais_hybrid' },
    { id: 4, name: 'Aditi Verma', domain: 'UX Designer', company: 'Amazon', rating: 4.6, profilePhoto: 'https://img.freepik.com/free-photo/smiling-young-brunette-caucasian-girl-looks-isolated-purple-wall_141793-70792.jpg?semt=ais_hybrid' },
    { id: 5, name: 'Kiran Patel', domain: 'Blockchain Developer', company: 'Coinbase', rating: 4.9, profilePhoto: 'https://img.freepik.com/premium-photo/portrait-young-man-standing-against-gray-background_1048944-5630158.jpg?semt=ais_hybrid' },
    { id: 6, name: 'Sneha Rao', domain: 'AI Researcher', company: 'OpenAI', rating: 4.4, profilePhoto: 'https://img.freepik.com/free-photo/close-up-portrait-woman-smiling-camera_23-2148286089.jpg?semt=ais_hybrid' },
    { id: 7, name: 'Amit Joshi', domain: 'Cloud Engineer', company: 'IBM', rating: 4.3, profilePhoto: 'https://img.freepik.com/premium-photo/indian-man-blue-kurta_274689-48266.jpg?semt=ais_hybrid' }
];

const MentorshipCard = ({ mentor }) => (
    <div className='p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105'>
        <div className="flex items-center gap-4">
            <img src={mentor.profilePhoto} alt="Mentor Profile" className="h-16 w-16 rounded-full border-2 border-blue-500" />
            <div>
                <h1 className='font-semibold text-lg'>{mentor.name}</h1>
                <p className='text-sm text-gray-500'>{mentor.company}</p>
            </div>
        </div>
        <div className="my-2">
            <Badge className="text-blue-700 font-bold bg-blue-100 p-2 rounded-full">{mentor.domain}</Badge>
        </div>
        <div className='flex items-center gap-1 mt-2 text-yellow-500'>
            {[...Array(5)].map((_, i) => (
                <Star key={i} fill={i < Math.round(mentor.rating) ? "currentColor" : "none"} className="h-5 w-5" />
            ))}
            <span className="text-sm text-gray-600 ml-2">({mentor.rating})</span>
        </div>
        <Button disabled className="mt-4 bg-[#3B82F6] text-white text-lg py-2 w-full hover:bg-blue-700 cursor-not-allowed transition-colors duration-300">
            Book Now
        </Button>
    </div>
);

const MentorshipList = () => {
    const [selectedDomain, setSelectedDomain] = useState('');

    const domains = [...new Set(mentors.map(mentor => mentor.domain))];

    const filteredMentors = selectedDomain
        ? mentors.filter(mentor => mentor.domain === selectedDomain)
        : mentors;

    return (
        <>
            <Navbar />
            <div className="flex">
                <aside className="p-6 w-1/4 border-r border-gray-300">
                    <h2 className="text-xl font-semibold mb-4">Filter by Domain</h2>
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => setSelectedDomain('')} className={`text-left block w-full py-2 px-4 rounded-md hover:bg-gray-100 ${selectedDomain === '' ? 'font-bold' : 'font-normal'}`}>
                                All
                            </button>
                        </li>
                        {domains.map(domain => (
                            <li key={domain}>
                                <button
                                    onClick={() => setSelectedDomain(domain)}
                                    className={`text-left block w-full py-2 px-4 rounded-md hover:bg-gray-100 ${selectedDomain === domain ? 'font-bold' : 'font-normal'}`}
                                >
                                    {domain}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-3/4">
                    {filteredMentors.map(mentor => (
                        <MentorshipCard key={mentor.id} mentor={mentor} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MentorshipList;
