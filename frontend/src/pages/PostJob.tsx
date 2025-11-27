import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, DollarSign, FileText, Users } from 'lucide-react';
import { jobService } from '../services/jobService';
import type { CreateJobAdvertisementRequest, JobPositionDto, CityDto } from '../types';

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [jobPositions, setJobPositions] = useState<JobPositionDto[]>([]);
    const [cities, setCities] = useState<CityDto[]>([]);

    const [formData, setFormData] = useState<CreateJobAdvertisementRequest>({
        jobPositionId: 0,
        cityId: 0,
        employerId: 1, // Default employer ID - in real app, this would come from auth
        description: '',
        openPositionCount: 1,
        minSalary: undefined,
        maxSalary: undefined,
        applicationDeadline: '',
    });

    useEffect(() => {
        loadFormData();
    }, []);

    const loadFormData = async () => {
        try {
            const [positionsRes, citiesRes] = await Promise.all([
                jobService.getAllJobPositions(),
                jobService.getAllCities(),
            ]);

            if (positionsRes.succes && positionsRes.data) {
                setJobPositions(positionsRes.data);
            }

            if (citiesRes.succes && citiesRes.data) {
                setCities(citiesRes.data);
            }
        } catch (err) {
            console.error('Failed to load form data:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name.includes('Id') || name.includes('Count') || name.includes('Salary')
                ? value === '' ? undefined : Number(value)
                : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.jobPositionId || !formData.cityId) {
            setError('Please select job position and city');
            return;
        }

        if (formData.description.length < 10) {
            setError('Description must be at least 10 characters');
            return;
        }

        try {
            setLoading(true);
            const response = await jobService.createJob(formData);

            if (response.succes) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setError(response.message || 'Failed to post job');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to post job. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-16">
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-900 mb-2">Job Posted Successfully!</h2>
                    <p className="text-green-700">Redirecting you to the jobs page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="h-8 w-8 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
                    <p className="text-gray-600">Fill in the details to create a job advertisement</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Job Position *
                            </label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <select
                                    name="jobPositionId"
                                    required
                                    value={formData.jobPositionId}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                >
                                    <option value="">Select Position</option>
                                    {jobPositions.map((pos) => (
                                        <option key={pos.id} value={pos.id}>
                                            {pos.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                City *
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <select
                                    name="cityId"
                                    required
                                    value={formData.cityId}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.cityName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Job Description *
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <textarea
                                name="description"
                                required
                                minLength={10}
                                maxLength={5000}
                                rows={6}
                                value={formData.description}
                                onChange={handleChange}
                                className="input-field pl-10 resize-none"
                                placeholder="Describe the job role, responsibilities, requirements..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Number of Open Positions *
                        </label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="number"
                                name="openPositionCount"
                                required
                                min={1}
                                value={formData.openPositionCount}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Minimum Salary (Optional)
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    name="minSalary"
                                    min={0}
                                    value={formData.minSalary || ''}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="50000"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Maximum Salary (Optional)
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    name="maxSalary"
                                    min={0}
                                    value={formData.maxSalary || ''}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="80000"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Application Deadline *
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                name="applicationDeadline"
                                required
                                value={formData.applicationDeadline}
                                onChange={handleChange}
                                className="input-field pl-10"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Posting Job...' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
