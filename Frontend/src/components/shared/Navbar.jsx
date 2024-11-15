import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import logo from './logo.jpeg'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-white shadow-md">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                    <h1 className="text-2xl font-bold">
                        Udyoga<span className="text-[#F83002]">Bhandu</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-6 font-medium text-gray-700">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Browse
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/notify" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Notifications
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ats-checker" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        ATS Checker
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/courses" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/rank" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Rank
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/mentorship" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Mentorship
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/roadmap" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Roadmap
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/trending-domain" className="hover:text-[#F83002] transition duration-200 hover:underline">
                                        Trending Domains
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Login/Logout/Profile Section */}
                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72">
                                <div className="p-4">
                                    <div className="flex gap-3 items-center mb-4">
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-gray-600">
                                        {user && user.role === 'student' && (
                                            <div className="flex items-center gap-2 cursor-pointer mb-2">
                                                <User2 />
                                                <Link to="/profile">
                                                    <Button variant="link">View Profile</Button>
                                                </Link>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
