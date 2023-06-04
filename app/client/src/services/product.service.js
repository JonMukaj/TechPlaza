import axios from "axios";
export const makeRequest = async (url, method, data) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      data: data,
    });
    // Handle response
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const makeAuthenticatedRequest = async (url, method, data) => {
  try {
    const token = JSON.parse(localStorage.getItem("user"));
    const response = await axios({
      url: url,
      method: method,
      data: data,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    // Handle response
    return response.data;
  } catch (error) {
    // Handle error
    throw error;
  }
};
