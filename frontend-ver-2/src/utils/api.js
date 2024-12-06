import axios from "axios";

const token = localStorage.getItem("token");

const params = {
  headers: {
    Authorization: `Bearer ${token}`, // Include your API key in the Authorization header
    "Content-Type": "application/json", // Adjust the content type as needed
  },
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("http://localhost:8080" + url, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchDataById = async (url, id) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080" + url + `/${id}`,
      params
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImage = async (url, formData) => {
  const res = await axios.post("http://localhost:8080" + url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const imageUrl = res.data;
  console.log("Image uploaded successfully:", imageUrl);
  return imageUrl;
};

export const login = async (url, formData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8080" + url, {
      method: "POST",
      headers: {
        // 'Authorization': `Bearer ${token}`, // Include your API key in the Authorization header
        "Content-Type": "application/json", // Adjust the content type as needed
      },

      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postData = async (url, formData) => {
  try {
    const response = await fetch("http://localhost:8080" + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Include your API key in the Authorization header
        "Content-Type": "application/json", // Adjust the content type as needed
      },

      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      //console.log(data)
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const editData = async (url, updatedData) => {
  const response = await axios.put(
    `${"http://localhost:8080"}${url}`,
    updatedData,
    params
  );
  return response.data;
};

export const deleteData = async (url) => {
  const { res } = await axios.delete(
    `${"http://localhost:8080"}${url}`,
    params
  );
  return res;
};

export const deleteImages = async (url, image) => {
  const { res } = await axios.delete(
    `${"https://ecommerce-server-node.onrender.com"}${url}`,
    image
  );
  return res;
};

const apiFetchProductWeb = "http://localhost:8080/shop/searchProducts";

export const fetchProductsWeb = async (searchTerm) => {
  try {
    // Xem xét dữ liệu gửi lên server
    console.log("Sending request with searchTerm: ", searchTerm);

    // Gửi request GET tới API với các tham số tìm kiếm
    const response = await fetch(
      `${apiFetchProductWeb}?keyword=${searchTerm.keyword || ""}&location=${
        searchTerm.location || ""
      }&priceFrom=${searchTerm.priceFrom || ""}&priceTo=${
        searchTerm.priceTo || ""
      }&rating=${searchTerm.rating || ""}&page=${searchTerm.page || 0}&size=${
        searchTerm.size || 10
      }`
    );

    console.log("Response Status:", response.status); // In ra mã status của phản hồi
    console.log("Response Headers:", response.headers); // In ra thông tin header nếu cần

    // Kiểm tra nếu phản hồi từ server là thành công (HTTP status 200-299)
    if (!response.ok) {
      throw new Error("Lỗi khi tìm kiếm sản phẩm: " + response.statusText);
    }

    // Chuyển đổi response thành JSON
    const data = await response.json();
    console.log("Response Data:", data); // In ra dữ liệu nhận được từ API

    // Kiểm tra dữ liệu nhận được từ API
    if (data.code === "SUCCESS") {
      // Trả về dữ liệu sản phẩm
      return data.data;
    } else {
      throw new Error(data.message || "Có lỗi xảy ra khi lấy dữ liệu");
    }
  } catch (error) {
    console.error("Có lỗi khi lấy dữ liệu sản phẩm:", error);
    throw error; // Rerun error để bên ngoài có thể xử lý nếu cần
  }
};
