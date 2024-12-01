

const apiEndpoint = 'http://localhost:9002/hr/Brands';
const apiFetchBrand = 'http://localhost:9002/hr/positions/all';
const apiAddBrand = 'http://localhost:9002/hr/Brands/create';
const apiUpdateBrand = 'http://localhost:9002/hr/Brands/update';
const apiDeleteBrand = 'http://localhost:9002/hr/Brands/delete';
// const apiFilterBrand = 'http://localhost:9002/hr/Brands/search';


export const fetchBrand = async () => {
    try {
        const response = await axios.get(apiFetchBrand);

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

export const filterBrand = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterBrand, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const brandData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: brandData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new Brand
export const addBrand = async (newBrand) => {
    try {

        try {
            const response = await axios.post(apiAddBrand, newBrand);
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

// Update Brand
export const updateBrand = async (updateBrand) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateBrand}/${updateBrand.id}`, updateBrand);
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

export const deleteBrand = async (id) => {
    try {
        const currentBrand = await axios.get(`${apiDeleteBrand}/${id}`);
        const updateBrand = {
            ...currentBrand.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteBrand}/${id}`, updateBrand);
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