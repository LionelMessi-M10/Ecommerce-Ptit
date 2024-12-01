

const apiEndpoint = 'http://localhost:9002/hr/Logins';
// const apiFetchLogin = 'http://localhost:9002/hr/positions/all';
const apiAddLogin = 'http://localhost:9002/hr/Logins/create';
const apiUpdateLogin = 'http://localhost:9002/hr/Logins/update';
const apiDeleteLogin = 'http://localhost:9002/hr/Logins/delete';
// const apiFilterLogin = 'http://localhost:9002/hr/Logins/search';


export const fetchLogin = async () => {
    try {
        const response = await axios.get(apiFetchLogin);

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

export const filterLogin = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterLogin, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const loginData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: loginData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new Login
export const addLogin = async (newLogin) => {
    try {

        try {
            const response = await axios.post(apiAddLogin, newLogin);
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

// Update Login
export const updateLogin = async (updateLogin) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateLogin}/${updateLogin.id}`, updateLogin);
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

export const deleteLogin = async (id) => {
    try {
        const currentLogin = await axios.get(`${apiDeleteLogin}/${id}`);
        const updateLogin = {
            ...currentLogin.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteLogin}/${id}`, updateLogin);
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