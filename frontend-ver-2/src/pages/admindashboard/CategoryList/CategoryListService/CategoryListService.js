import axios from 'axios';

const apiEndpoint = 'http://localhost:8080/seller/categories';
const apiFetchCategoryList = 'http://localhost:8080/seller/categories/all';
const apiAddCategoryList = 'http://localhost:8080/seller/categories/create';
const apiUpdateCategoryList = 'http://localhost:8080/seller/categories/update';
const apiDeleteCategoryList = 'http://localhost:8080/seller/categories/delete';
const apiFilterCategoryList = 'http://localhost:8080/seller/categories/search';


export const fetchCategoryList = async () => {
    try {
        const response = await axios.get(apiFetchCategoryList);

        if (response.data.data && Array.isArray(response.data.data)) {
            // Sorting positions based on 'enabled'; assuming 'true' values are sorted higher
            return response.data.data.sort((a, b) => b.enabled - a.enabled);
        } else {
            console.error('Dữ liệu không hợp lệ:', response.data.data);
            return [];
        }
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
        throw error;
    }
};

export const filterCategoryList = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterCategoryList, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const CategoryListData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: CategoryListData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new CategoryList
export const addCategoryList = async (newCategoryList) => {
    try {

        try {
            const response = await axios.post(apiAddCategoryList, newCategoryList);
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

// Update CategoryList
export const updateCategoryList = async (id) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateCategoryList}/${id}`, updateCategoryList);
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

export const deleteCategoryList = async (id) => {
    try {
        const response = await axios.put(`${apiDeleteCategoryList}/${id}`);
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