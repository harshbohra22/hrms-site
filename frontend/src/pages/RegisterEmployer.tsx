import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Phone, Globe } from 'lucide-react';
import { authService } from '../services/authService';
import type { EmployerRegisterRequest } from '../types';

const RegisterEmployer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState<EmployerRegisterRequest>({
        companyName: '',
        companyWebPage: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            const response = await authService.registerEmployer(formData);

            if (response.succes) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
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
                        <Building2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-900 mb-2">Registration Successful!</h2>
                    <p className="text-green-700">Redirecting you to the jobs page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="h-8 w-8 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Registration</h1>
                    <p className="text-gray-600">Create your company account to post jobs</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name *
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="companyName"
                                required
                                minLength={2}
                                maxLength={200}
                                value={formData.companyName}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="Acme Corporation"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company Website *
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="url"
                                name="companyWebPage"
                                required
                                maxLength={255}
                                value={formData.companyWebPage}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="https://www.example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email *
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="hr@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="tel"
                                name="phoneNumber"
                                required
                                minLength={10}
                                maxLength={30}
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                maxLength={100}
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                minLength={6}
                                maxLength={100}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-field pl-10"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Registering...' : 'Register Company'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterEmployer;
