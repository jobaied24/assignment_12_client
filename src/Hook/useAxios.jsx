import axios from 'axios';
import React from 'react';

const axiosInstance =axios.create({
    baseURL:'https://assignment12-server-smoky.vercel.app'
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;