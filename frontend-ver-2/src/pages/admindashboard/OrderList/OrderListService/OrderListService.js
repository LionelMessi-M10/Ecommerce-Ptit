

const apiEndpoint = 'http://localhost:9002/hr/OrderLists';
// const apiFetchOrderList = 'http://localhost:9002/hr/positions/all';
const apiAddOrderList = 'http://localhost:9002/hr/OrderLists/create';
const apiUpdateOrderList = 'http://localhost:9002/hr/OrderLists/update';
const apiDeleteOrderList = 'http://localhost:9002/hr/OrderLists/delete';
// const apiFilterOrderList = 'http://localhost:9002/hr/OrderLists/search';


export const fetchOrderList = async () => {
    try {
        const response = await axios.get(apiFetchOrderList);

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

export const filterOrderList = async (statusFilter) => {
    try {
        const response = await axios.get(apiFilterOrderList, {
            params: {
                pageNo: statusFilter.pageNo,
                pageSize: statusFilter.pageSize,
                status: statusFilter.status || '',
                keyword: statusFilter.keyword || ''
            }
        });

        const orderListData = response.data.data?.content || [];
        const pageData = response.data.data?.page || {};

        return {
            data: orderListData.sort((a, b) => b.status - a.status),
            currentPage: (pageData.number || 0) + 1,
            totalPages: pageData.totalPages || 1
        };
    } catch (error) {
        console.error('Có lỗi xảy ra khi filter dữ liệu!', error);
        throw error;
    }
};


// Add a new OrderList
export const addOrderList = async (newOrderList) => {
    try {

        try {
            const response = await axios.post(apiAddOrderList, newOrderList);
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

// Update OrderList
export const updateOrderList = async (updateOrderList) => {
    try {

        try {
            const response = await axios.put(`${apiUpdateOrderList}/${updateOrderList.id}`, updateOrderList);
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

export const deleteOrderList = async (id) => {
    try {
        const currentOrderList = await axios.get(`${apiDeleteOrderList}/${id}`);
        const updateOrderList = {
            ...currentOrderList.data.data,
            status: 0
        };
        const response = await axios.put(`${apiDeleteOrderList}/${id}`, updateOrderList);
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