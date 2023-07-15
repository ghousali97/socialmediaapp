import axios from "axios";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST || 'https://mysocialmediaappgak.azurewebsites.net/api',
    withCredentials: true,
});

axiosInstance.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.status === 401 || err.response.status === 403)
        console.log('unauthoirsed');
    //  window.location = '/login'
})
axiosInstance.interceptors.request.use(function (config) {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    config.headers['x-auth-token'] = token;

    return config;
});
console.log(process.env.REACT_APP_BACKEND_HOST)

export default axiosInstance;