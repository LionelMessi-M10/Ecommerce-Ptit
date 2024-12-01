

const apiEndpoint = 'http://localhost:9002/hr/Categorys';
// const apiFetchCategory = 'http://localhost:9002/hr/positions/all';
const apiAddCategory = 'http://localhost:9002/hr/Categorys/create';
const apiUpdateCategory = 'http://localhost:9002/hr/Categorys/update';
const apiDeleteCategory = 'http://localhost:9002/hr/Categorys/delete';
// const apiFilterCategory = 'http://localhost:9002/hr/Categorys/search';


export const fetchCategory = async () => {
    try {
        const response = await axios.get(apiFetchCategory);

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

export const filterCategory = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterCategory, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const categoryData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: categoryData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new Category
export const addCategory = async (newCategory) => {
    try {

        try {
            const response = await axios.post(apiAddCategory, newCategory);
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

// Update Category
export const updateCategory = async (updateCategory) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateCategory}/${updateCategory.id}`, updateCategory);
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

export const deleteCategory = async (id) => {
    try {
        const currentCategory = await axios.get(`${apiDeleteCategory}/${id}`);
        const updateCategory = {
            ...currentCategory.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteCategory}/${id}`, updateCategory);
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