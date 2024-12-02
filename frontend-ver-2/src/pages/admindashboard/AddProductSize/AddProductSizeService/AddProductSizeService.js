import axios from "axios";

const apiEndpoint = 'http://localhost:9002/hr/ProductSizes';
const apiFetchProductSize = 'http://localhost:9002/hr/positions/all';
const apiAddProductSize = 'http://localhost:9002/hr/ProductSizes/create';
const apiUpdateProductSize = 'http://localhost:9002/hr/ProductSizes/update';
const apiDeleteProductSize = 'http://localhost:9002/hr/ProductSizes/delete';
const apiFilterProductSize = 'http://localhost:9002/hr/ProductSizes/search';


export const fetchProductSize = async () => {
    try {
        const response = await axios.get(apiFetchProductSize);

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

export const filterProductSize = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterProductSize, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const productSizeData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: productSizeData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new ProductSize
export const addProductSize = async (newProductSize) => {
    try {

        try {
            const response = await axios.post(apiAddProductSize, newProductSize);
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

// Update ProductSize
export const updateProductSize = async (updateProductSize) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateProductSize}/${updateProductSize.id}`, updateProductSize);
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

export const deleteProductSize = async (id) => {
    try {
        const currentProductSize = await axios.get(`${apiDeleteProductSize}/${id}`);
        const updateProductSize = {
            ...currentProductSize.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteProductSize}/${id}`, updateProductSize);
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