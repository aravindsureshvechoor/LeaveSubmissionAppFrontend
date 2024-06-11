import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';


const axiosInstance = axios.create({
    baseURL: baseURL,
});
console.log({refresh: localStorage.getItem('refreshToken')});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
                console.log(localStorage.getItem('refreshToken'));
            return axiosInstance
                .post(`api/token/refresh/`, {refresh: localStorage.getItem('refreshToken')})
                .then((res) => {
                    const accessToken = res.data['access'];

                    localStorage.setItem('accessToken', accessToken);

                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                })
                .catch((error) => {
                    console.error('Token refresh error:', error);
                });
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
export {baseURL};
