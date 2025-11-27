import { Link } from 'react-router-dom';
import { Briefcase, UserPlus, Building2 } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
                            <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            HMRS
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/post-job"
                            className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                            <Building2 className="h-4 w-4" />
                            <span>Post Job</span>
                        </Link>
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/register/seeker"
                                className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                            >
                                Job Seeker
                            </Link>
                            <Link
                                to="/register/employer"
                                className="btn-primary flex items-center space-x-2"
                            >
                                <UserPlus className="h-4 w-4" />
                                <span>Employer</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
