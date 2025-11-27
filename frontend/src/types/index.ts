// API Response Types
export interface Result {
    message: string;
    succes: boolean; // Note: API uses 'succes' (typo in backend)
}

export interface DataResult<T> extends Result {
    data: T;
}

// Entity Types
export interface JobAdvertisementDto {
    id: number;
    jobTitle: string;
    companyName: string;
    city: string;
    openPositionCount: number;
    minSalary?: number;
    maxSalary?: number;
    releaseDate: string;
    applicationDeadline: string;
    active: boolean;
}

export interface JobPositionDto {
    id: number;
    title: string;
}

export interface CityDto {
    id: number;
    cityName: string;
}

export interface EmployerDto {
    id: number;
    companyName: string;
    companyWebPage: string;
    email: string;
    phoneNumber: string;
}

export interface JobSeekerDto {
    id: number;
    name: string;
    lastName: string;
    nationalId: string;
    birthDate: string;
    email: string;
}

export interface JobApplicationDto {
    id: number;
    jobAdvertisementId: number;
    jobSeekerId: number;
    jobTitle: string;
    employerCompanyName: string;
    applicationDate: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

// Request Types
export interface CreateJobAdvertisementRequest {
    jobPositionId: number;
    cityId: number;
    employerId: number;
    description: string;
    openPositionCount: number;
    minSalary?: number;
    maxSalary?: number;
    applicationDeadline: string; // format: YYYY-MM-DD
}

export interface JobSeekerRegisterRequest {
    name: string;
    lastName: string;
    nationalId: string;
    birthDate: string; // format: YYYY-MM-DD
    email: string;
    password: string;
    confirmPassword: string;
}

export interface EmployerRegisterRequest {
    companyName: string;
    companyWebPage: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

export interface ApplyJobRequest {
    jobAdvertisementId: number;
    jobSeekerId: number;
}

export interface UpdateApplicationStatusRequest {
    applicationId: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface CreateJobPositionRequest {
    title: string;
}

export interface CreateCityRequest {
    cityName: string;
}
