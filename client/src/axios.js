import axios from "axios";



const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST || 'https://mysocialmediaappgak.azurewebsites.net/api',
    withCredentials: true,
});

console.log(process.env.REACT_APP_BACKEND_HOST)

export default axiosInstance;