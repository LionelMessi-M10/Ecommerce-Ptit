const apiEndpoint = 'http://localhost:9002/hr/ProductUploads';
const apiFetchProductUpload = 'http://localhost:9002/hr/positions/all';
const apiAddProductUpload = 'http://localhost:9002/hr/ProductUploads/create';
const apiUpdateProductUpload = 'http://localhost:9002/hr/ProductUploads/update';
const apiDeleteProductUpload = 'http://localhost:9002/hr/ProductUploads/delete';
const apiFilterProductUpload = 'http://localhost:9002/hr/ProductUploads/search';


export const fetchProductUpload = async () => {
    try {
        const response = await axios.get(apiFetchProductUpload);

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

export const filterProductUpload = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterProductUpload, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const productUploadData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: productUploadData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new ProductUpload
export const addProductUpload = async (newProductUpload) => {
    try {

        try {
            const response = await axios.post(apiAddProductUpload, newProductUpload);
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

// Update ProductUpload
export const updateProductUpload = async (updateProductUpload) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateProductUpload}/${updateProductUpload.id}`, updateProductUpload);
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

export const deleteProductUpload = async (id) => {
    try {
        const currentProductUpload = await axios.get(`${apiDeleteProductUpload}/${id}`);
        const updateProductUpload = {
            ...currentProductUpload.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteProductUpload}/${id}`, updateProductUpload);
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