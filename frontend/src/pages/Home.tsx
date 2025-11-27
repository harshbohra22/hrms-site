import { useEffect, useState } from 'react';
import { Search, Filter, Briefcase } from 'lucide-react';
import JobCard from '../components/JobCard';
import { jobService } from '../services/jobService';
import type { JobAdvertisementDto } from '../types';

const Home = () => {
    const [jobs, setJobs] = useState<JobAdvertisementDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState(false);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);
            const response = await jobService.getJobsSortedByDeadline();
            if (response.succes && response.data) {
                setJobs(response.data);
            } else {
                setError(response.message || 'Failed to load jobs');
            }
        } catch (err) {
            setError('Failed to connect to the server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.city.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = !filterActive || job.active;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-2xl p-12 text-white">
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
                    <p className="text-xl text-primary-100 mb-8">
                        Discover thousands of job opportunities from top companies. Start your career journey today.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg shadow-lg p-2 flex items-center">
                        <Search className="h-5 w-5 text-gray-400 ml-3" />
                        <input
                            type="text"
                            placeholder="Search by job title, company, or location..."
                            className="flex-1 px-4 py-3 outline-none text-gray-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn-primary">Search</button>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {filterActive ? 'Active Jobs' : 'All Jobs'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
                    </p>
                </div>

                <button
                    onClick={() => setFilterActive(!filterActive)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${filterActive
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-600'
                        }`}
                >
                    <Filter className="h-4 w-4" />
                    <span>Active Only</span>
                </button>
            </div>

            {/* Jobs Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-700 font-medium">{error}</p>
                    <button
                        onClick={loadJobs}
                        className="mt-4 btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                    <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
