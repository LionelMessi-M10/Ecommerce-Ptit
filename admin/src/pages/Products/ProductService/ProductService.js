const apiEndpoint = 'http://localhost:9002/hr/Products';
const apiFetchProduct = 'http://localhost:9002/hr/positions/all';
const apiAddProduct = 'http://localhost:9002/hr/Products/create';
const apiUpdateProduct = 'http://localhost:9002/hr/Products/update';
const apiDeleteProduct = 'http://localhost:9002/hr/Products/delete';
const apiFilterProduct = 'http://localhost:9002/hr/Products/search';


export const fetchProduct = async () => {
    try {
        const response = await axios.get(apiFetchProduct);

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

export const filterProduct = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterProduct, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const productData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: productData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new Product
export const addProduct = async (newProduct) => {
    try {

        try {
            const response = await axios.post(apiAddProduct, newProduct);
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

// Update Product
export const updateProduct = async (updateProduct) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateProduct}/${updateProduct.id}`, updateProduct);
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

export const deleteProduct = async (id) => {
    try {
        const currentProduct = await axios.get(`${apiDeleteProduct}/${id}`);
        const updateProduct = {
            ...currentProduct.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteProduct}/${id}`, updateProduct);
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