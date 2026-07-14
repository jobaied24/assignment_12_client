import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthContext';

const useUserRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user,loading:authLoading} = useContext(AuthContext);
    
    const {data:role='participant',isLoading:roleLoading,refetch}= useQuery({
       queryKey:['userRole',user?.email],
       enabled:!authLoading && !!user.email,
       queryFn:async()=>{
        const res = await axiosSecure.get(`/users/${user.email}/role`);
        return res.data.role;
       }
    })
    return {
        role,
        authLoading,
        roleLoading,
        refetch
    }
};

export default useUserRole;