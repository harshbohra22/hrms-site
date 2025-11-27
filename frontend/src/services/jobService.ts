import api from './api';
import type {
    DataResult,
    Result,
    JobAdvertisementDto,
    CreateJobAdvertisementRequest,
    JobPositionDto,
    CityDto,
} from '../types';

export const jobService = {
    // Get all job advertisements
    getAllJobs: async () => {
        const response = await api.get<DataResult<JobAdvertisementDto[]>>('/jobPost/getAll');
        return response.data;
    },

    // Get active job advertisements
    getActiveJobs: async () => {
        const response = await api.get<DataResult<JobAdvertisementDto[]>>('/jobPost/active');
        return response.data;
    },

    // Get jobs sorted by deadline
    getJobsSortedByDeadline: async () => {
        const response = await api.get<DataResult<JobAdvertisementDto[]>>('/jobPost/sorted-by-deadline');
        return response.data;
    },

    // Get active jobs by employer
    getActiveJobsByEmployer: async (employerId: number) => {
        const response = await api.get<DataResult<JobAdvertisementDto[]>>('/jobPost/active/by-employer', {
            params: { employerId },
        });
        return response.data;
    },

    // Create new job advertisement
    createJob: async (data: CreateJobAdvertisementRequest) => {
        const response = await api.post<Result>('/jobPost/add', data);
        return response.data;
    },

    // Get all job positions
    getAllJobPositions: async () => {
        const response = await api.get<DataResult<JobPositionDto[]>>('/jobPosition/getAll');
        return response.data;
    },

    // Get all cities
    getAllCities: async () => {
        const response = await api.get<DataResult<CityDto[]>>('/cities/getAll');
        return response.data;
    },
};
