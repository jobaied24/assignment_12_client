import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import CampCard from '../CampCard/CampCard';

const AllCamps = () => {
    const axiosSecure = useAxiosSecure();

    const {data:camps=[],isLoading,refetch} = useQuery({
        queryKey:['camps'],
        queryFn:async()=>{
            const res = await axiosSecure.get('/camps');
            return res.data;
        },
    });

    console.log(camps);

    return (
        <div>
       <div className='text-5xl text-center mt-12 md:mt-16 font-semibold text-[#34ebae]'>
        Available Camps
       </div>

        <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-12 md:mt-16 mb-4 md:mb-16 mx-12'>
            {
                camps.map(camp=><CampCard key={camp._id} camp={camp}></CampCard>)
            }
        </div>
        </div>
    );
};

export default AllCamps;