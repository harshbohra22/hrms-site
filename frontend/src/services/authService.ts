import api from './api';
import type {
    Result,
    DataResult,
    JobSeekerRegisterRequest,
    EmployerRegisterRequest,
    JobSeekerDto,
    EmployerDto,
    ApplyJobRequest,
    JobApplicationDto,
    UpdateApplicationStatusRequest,
} from '../types';

export const authService = {
    // Register job seeker
    registerJobSeeker: async (data: JobSeekerRegisterRequest) => {
        const response = await api.post<Result>('/candidateController/register', data);
        return response.data;
    },

    // Register employer
    registerEmployer: async (data: EmployerRegisterRequest) => {
        const response = await api.post<Result>('/employers/register', data);
        return response.data;
    },

    // Get all job seekers
    getAllJobSeekers: async () => {
        const response = await api.get<DataResult<JobSeekerDto[]>>('/candidateController/getAll');
        return response.data;
    },

    // Get all employers
    getAllEmployers: async () => {
        const response = await api.get<DataResult<EmployerDto[]>>('/employers/getAll');
        return response.data;
    },
};

export const applicationService = {
    // Apply for a job
    applyForJob: async (data: ApplyJobRequest) => {
        const response = await api.post<Result>('/applications/apply', data);
        return response.data;
    },

    // Get applications by job seeker
    getApplicationsByJobSeeker: async (seekerId: number) => {
        const response = await api.get<DataResult<JobApplicationDto[]>>(`/applications/by-jobseeker/${seekerId}`);
        return response.data;
    },

    // Get applications by advertisement
    getApplicationsByAdvertisement: async (adId: number) => {
        const response = await api.get<DataResult<JobApplicationDto[]>>(`/applications/by-advertisement/${adId}`);
        return response.data;
    },

    // Update application status
    updateApplicationStatus: async (data: UpdateApplicationStatusRequest) => {
        const response = await api.post<Result>('/applications/update-status', data);
        return response.data;
    },
};
