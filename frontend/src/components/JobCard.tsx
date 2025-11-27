import { MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react';
import type { JobAdvertisementDto } from '../types';

interface JobCardProps {
    job: JobAdvertisementDto;
}

const JobCard = ({ job }: JobCardProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isDeadlineSoon = () => {
        const deadline = new Date(job.applicationDeadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysLeft <= 7 && daysLeft > 0;
    };

    return (
        <div className="card group cursor-pointer">
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-1">
                            {job.jobTitle}
                        </h3>
                        <p className="text-lg text-gray-700 font-medium">{job.companyName}</p>
                    </div>
                    {job.active && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                            Active
                        </span>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                        <span>{job.city}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-primary-500" />
                        <span>{job.openPositionCount} open position{job.openPositionCount > 1 ? 's' : ''}</span>
                    </div>

                    {(job.minSalary || job.maxSalary) && (
                        <div className="flex items-center text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2 text-primary-500" />
                            <span>
                                {job.minSalary && job.maxSalary
                                    ? `$${job.minSalary.toLocaleString()} - $${job.maxSalary.toLocaleString()}`
                                    : job.minSalary
                                        ? `From $${job.minSalary.toLocaleString()}`
                                        : `Up to $${job.maxSalary?.toLocaleString()}`}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                        <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                        {isDeadlineSoon() && (
                            <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                                Soon
                            </span>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Posted: {formatDate(job.releaseDate)}</span>
                    <button className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
