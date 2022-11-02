import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (err) => {
        if (err.response.status === 401) {
            const originalRequest = err.config;
            if (originalRequest && !originalRequest._isRetry) {
                originalRequest._isRetry = true;
                try {
                    await axios.get(
                        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/refreshToken`,
                        { withCredentials: true }
                    );
                    return axiosInstance.request(originalRequest);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
        throw err;
    }
);

export default axiosInstance;
