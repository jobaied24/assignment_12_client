import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CampDetails = () => {
    const {campId} = useParams();
    const axiosSecure = useAxiosSecure();

    const {data:camp=[]}=useQuery({
        queryKey:['camp',campId],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/camps/${campId}`);
            return res.data;
        }
    });

    console.log(camp);

    return (
        <div>
            
        </div>
    );
};

export default CampDetails;