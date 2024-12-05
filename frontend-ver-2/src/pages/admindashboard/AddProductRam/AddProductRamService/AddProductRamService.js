import axios from "axios";

const apiEndpoint = "http://localhost:9002/hr/ProductRams";
// const apiFetchProductRam = 'http://localhost:9002/hr/positions/all';
const apiAddProductRam = "http://localhost:9002/hr/ProductRams/create";
// const apiUpdateProductRam = "http://localhost:9002/hr/ProductRams/update";
const apiDeleteProductRam = "http://localhost:9002/hr/ProductRams/delete";
const apiFilterProductRam = "http://localhost:9002/hr/ProductRams/search";

const apiFetchProductRam = "http://localhost:8080/seller/getAllRams";
const apiUpdateProductRam = "http://localhost:8080/seller/updateRam";

export const fetchProductRam = async () => {
  try {
    const response = await axios.get(apiFetchProductRam);

    const ramData = response.data?.data;

    if (Array.isArray(ramData) && ramData.length > 0) {
      console.log("Danh sách RAM:", ramData);

      const sortedRam = ramData.sort((a, b) => {
        const ramA = parseInt(a.ram.replace(/\D/g, ""));
        const ramB = parseInt(b.ram.replace(/\D/g, ""));
        return ramB - ramA;
      });

      return sortedRam;
    } else {
      console.error("Dữ liệu RAM không hợp lệ hoặc không có!");
      return [];
    }
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu RAM:", error);
    throw error;
  }
};

export const filterProductRam = async (statusFilter) => {
  try {
    const response = await axios.get(apiFilterProductRam, {
      params: {
        pageNo: statusFilter.pageNo,
        pageSize: statusFilter.pageSize,
        status: statusFilter.status || "",
        keyword: statusFilter.keyword || "",
      },
    });

    const productRamData = response.data.data?.content || [];
    const pageData = response.data.data?.page || {};

    return {
      data: productRamData.sort((a, b) => b.status - a.status),
      currentPage: (pageData.number || 0) + 1,
      totalPages: pageData.totalPages || 1,
    };
  } catch (error) {
    console.error("Có lỗi xảy ra khi filter dữ liệu!", error);
    throw error;
  }
};

// Add a new ProductRam
export const addProductRam = async (newProductRam) => {
  try {
    try {
      const response = await axios.post(apiAddProductRam, newProductRam);
      return response.data.data;
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm phụ cấp!", error);
      throw error;
    }
  } catch (error) {
    console.error("Có lỗi xảy ra khi thêm phụ cấp!", error);
    throw error;
  }
};

// Update ProductRam
export const updateProductRam = async (updateProductRam) => {
  try {
    try {
      const response = await axios.put(
        `${apiUpdateProductRam}/${updateProductRam.id}`,
        updateProductRam
      );
      return response.data.data;
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật phụ cấp!", error);
      throw error;
    }
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật phụ cấp!", error);
    throw error;
  }
};

export const deleteProductRam = async (id) => {
  try {
    const currentProductRam = await axios.get(`${apiDeleteProductRam}/${id}`);
    const updateProductRam = {
      ...currentProductRam.data.data,
      status: 0,
    };
    const response = await axios.put(
      `${apiDeleteProductRam}/${id}`,
      updateProductRam
    );
    return response.data.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi cập nhật trạng thái phụ cấp!", error);
    throw error;
  }
};

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${apiEndpoint}/upload/excel`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
