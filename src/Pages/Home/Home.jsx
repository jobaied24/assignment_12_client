import React from 'react';
import Banner from './Banner';
import useAxios from '../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import CampCard from './CampCard/CampCard';

const Home = () => {
    const axios=useAxios();

    const {data:camps=[],isLoading} = useQuery({
        queryKey:['popular-camps'],
        queryFn:async()=>{
            const res = await axios.get('/camps?limit=6');
            return res.data;
        }
    });
   
    console.log(camps);
    return (
        <div>
            <Banner></Banner>
          
          <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-16 md:mt-20 mb-4 md:mb-16 mx-12'>
            {
                camps.map(camp=><CampCard camp={camp}></CampCard>)
            }
          </div>

        </div>
    );
};

export default Home;