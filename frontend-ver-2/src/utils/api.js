import axios from "axios";

const token = localStorage.getItem("token");

const params = {
    headers: {
        'Authorization': `Bearer ${token}`, // Include your API key in the Authorization header
        'Content-Type': 'application/json', // Adjust the content type as needed
    },

}

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get("http://localhost:8080" + url, params)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const fetchDataById = async (url,id) => {
    try {
        const {data} = await axios.get("http://localhost:8080" + url + `/${id}`,params)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const uploadImage = async (url, formData) => {

    const  res = await axios.post("http://localhost:8080" + url, formData,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    })

    const imageUrl = res.data;
    console.log('Image uploaded successfully:', imageUrl);
    return imageUrl;
}

export const login = async (url, formData) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:8080" + url, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`, // Include your API key in the Authorization header
                'Content-Type': 'application/json', // Adjust the content type as needed
            },

            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.text();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export const postData = async (url, formData) => {

    try {
        const response = await fetch("http://localhost:8080" + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Include your API key in the Authorization header
                'Content-Type': 'application/json', // Adjust the content type as needed
            },

            body: JSON.stringify(formData)
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
        console.error('Error:', error);
    }


}

export const editData = async (url, updatedData) => {
    const response = await axios.put(`${"http://localhost:8080"}${url}`, updatedData,params)
    return response.data;
}

export const deleteData = async (url) => {
    const { res } = await axios.delete(`${"http://localhost:8080"}${url}`, params)
    return res;
}


export const deleteImages = async (url, image) => {
    const { res } = await axios.delete(`${"https://ecommerce-server-node.onrender.com"}${url}`, image);
    return res;
}