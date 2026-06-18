import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
});



const useAxiosSecure = () => {
    const {user}=useContext(AuthContext);

    axios.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    },error=>{
        return Promise.reject(error);
    })
    
    return axiosSecure;
};

export default useAxiosSecure;