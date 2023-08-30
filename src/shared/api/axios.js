import axios from "axios";
let baseURL = process.env.NEXT_PUBLIC_API_URL;
let adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Instance to use normal url as base
const axiosInstance = axios.create({
    baseURL,
    headers: {
        lang: "62fb966f6b331955bdcf8268",
    },
});

axiosInstance.interceptors.request.use(
    function (config) {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("authToken")
                : null;
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    function (response) {
        if (response.status === 401) {
            typeof window !== "undefined" &&
                localStorage.removeItem("authToken");
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Instance to use admin url as base
const adminAxiosInstance = axios.create({
    baseURL: adminBaseUrl,
});

export { axiosInstance, adminAxiosInstance };
