import Axios from "axios";
import envConfig from "./env.config";

const axios = Axios.create({
    baseURL: envConfig.app.apiURL,
});

// request interceptor to add token to request headers
axios.interceptors.request.use(
    async (config) => {
        // Implement function to get token
        const token = {
            accessToken: "my-access-token",
            refreshToken: "my-refresh-token",
        };

        if (token?.accessToken) {
            config.headers.Authorization = `Bearer ${token?.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Implement logic here

        return Promise.reject(error);
    }
);

export default axios;
