import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST || 'https://mysocialmediaappgak.azurewebsites.net/api',
    withCredentials: true,
});

axiosInstance.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.status === 401 || err.response.status === 403)
        window.location = '/login'
})

console.log(process.env.REACT_APP_BACKEND_HOST)

export default axiosInstance;