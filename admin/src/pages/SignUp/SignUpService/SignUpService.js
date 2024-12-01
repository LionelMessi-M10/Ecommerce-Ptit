const apiEndpoint = 'http://localhost:9002/hr/SignUps';
const apiFetchSignUp = 'http://localhost:9002/hr/positions/all';
const apiAddSignUp = 'http://localhost:9002/hr/SignUps/create';
const apiUpdateSignUp = 'http://localhost:9002/hr/SignUps/update';
const apiDeleteSignUp = 'http://localhost:9002/hr/SignUps/delete';
const apiFilterSignUp = 'http://localhost:9002/hr/SignUps/search';


export const fetchSignUp = async () => {
    try {
        const response = await axios.get(apiFetchSignUp);

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

export const filterSignUp = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterSignUp, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const signUpData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: signUpData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new SignUp
export const addSignUp = async (newSignUp) => {
    try {

        try {
            const response = await axios.post(apiAddSignUp, newSignUp);
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

// Update SignUp
export const updateSignUp = async (updateSignUp) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateSignUp}/${updateSignUp.id}`, updateSignUp);
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

export const deleteSignUp = async (id) => {
    try {
        const currentSignUp = await axios.get(`${apiDeleteSignUp}/${id}`);
        const updateSignUp = {
            ...currentSignUp.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteSignUp}/${id}`, updateSignUp);
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