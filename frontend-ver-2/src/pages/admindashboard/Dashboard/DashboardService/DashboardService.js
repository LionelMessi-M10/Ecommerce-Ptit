
import axios from "axios";


const apiEndpoint = 'http://localhost:9002/hr/Dashboards';
const apiFetchDashboard = 'http://localhost:9002/hr/positions/all';
const apiAddDashboard = 'http://localhost:9002/hr/Dashboards/create';
const apiUpdateDashboard = 'http://localhost:9002/hr/Dashboards/update';
const apiDeleteDashboard = 'http://localhost:9002/hr/Dashboards/delete';
const apiFilterDashboard = 'http://localhost:9002/hr/Dashboards/search';


export const fetchDashboard = async () => {
    try {
        const response = await axios.get(apiFetchDashboard);

        if (response.data.data && Array.isArray(response.data.data)) {
            // Sorting positions based on 'status'; assuming 'true' values are sorted higher
            return response.data.data.sort((a, b) => b.status - a.status);
        } else {
            console.error('Dữ liệu không hợp lệ:', response.data.data);
            return [];
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        throw error;
    }
};

export const filterDashboard = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterDashboard, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const dashboardData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: dashboardData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new Dashboard
export const addDashboard = async (newDashboard) => {
    try {

        try {
            const response = await axios.post(apiAddDashboard, newDashboard);
            return response.data.data;
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm phụ cấp!', error);
            throw error;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm phụ cấp!', error);
        throw error;
    }
};

// Update Dashboard
export const updateDashboard = async (updateDashboard) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateDashboard}/${updateDashboard.id}`, updateDashboard);
            return response.data.data;
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật phụ cấp!', error);
            throw error;
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật phụ cấp!', error);
        throw error;
    }
};

export const deleteDashboard = async (id) => {
    try {
        const currentDashboard = await axios.get(`${apiDeleteDashboard}/${id}`);
        const updateDashboard = {
            ...currentDashboard.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteDashboard}/${id}`, updateDashboard);
        return response.data.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật trạng thái phụ cấp!', error);
        throw error;
    }
};

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`${apiEndpoint}/upload/excel`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};