const apiEndpoint = 'http://localhost:9002/hr/ProductDetailss';
const apiFetchProductDetails = 'http://localhost:9002/hr/positions/all';
const apiAddProductDetails = 'http://localhost:9002/hr/ProductDetailss/create';
const apiUpdateProductDetails = 'http://localhost:9002/hr/ProductDetailss/update';
const apiDeleteProductDetails = 'http://localhost:9002/hr/ProductDetailss/delete';
const apiFilterProductDetails = 'http://localhost:9002/hr/ProductDetailss/search';


export const fetchProductDetails = async () => {
    try {
        const response = await axios.get(apiFetchProductDetails);

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

export const filterProductDetails = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterProductDetails, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const productDetailsData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: productDetailsData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new ProductDetails
export const addProductDetails = async (newProductDetails) => {
    try {

        try {
            const response = await axios.post(apiAddProductDetails, newProductDetails);
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

// Update ProductDetails
export const updateProductDetails = async (updateProductDetails) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateProductDetails}/${updateProductDetails.id}`, updateProductDetails);
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

export const deleteProductDetails = async (id) => {
    try {
        const currentProductDetails = await axios.get(`${apiDeleteProductDetails}/${id}`);
        const updateProductDetails = {
            ...currentProductDetails.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteProductDetails}/${id}`, updateProductDetails);
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