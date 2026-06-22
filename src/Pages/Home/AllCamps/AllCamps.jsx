import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import CampCard from '../CampCard/CampCard';

const AllCamps = () => {
    const axiosSecure = useAxiosSecure();

    const {data:camps=[],isLoading} = useQuery({
        queryKey:['camps'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/camps');
            return res.data;
        }
    });

    console.log(camps);

    return (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-16 md:mt-20 mb-4 md:mb-16 mx-12'>
            {
                camps.map(camp=><CampCard key={camp._id} camp={camp}></CampCard>)
            }
        </div>
    );
};

export default AllCamps;