import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://opchat.onrender.com/api",
    withCredentials: true,  // ✅ Send cookies with every request
    timeout: 10000,  // 10 second timeout
});

// ✅ Error interceptor to handle failed requests
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log error details for debugging
        if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("No response from server:", error.message);
        } else {
            console.error("Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);