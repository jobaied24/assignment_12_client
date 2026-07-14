import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});



const useAxiosSecure = () => {
    const { user,logOut} = useContext(AuthContext);
    const navigate = useNavigate(); 

    axiosInstance.interceptors.request.use(config => {

        if (user?.accessToken) {
            config.headers.authorization = `Bearer ${user.accessToken}`
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })

    // Response interceptors
    axiosInstance.interceptors.response.use(res=>{
return res;
    },
error=>{
console.log('Inside res interceptors',error.status);
const status = error.status;
console.log(status);


if(status === 403){
    navigate('/forbidden');
}

else if(status === 401){
    logOut()
    .then(()=>{
        navigate('/login');
    })
    .catch(()=>{})
}

return Promise.reject(error);
})

    return axiosInstance;
};

export default useAxiosSecure;