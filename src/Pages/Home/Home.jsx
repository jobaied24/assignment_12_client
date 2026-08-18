import React from 'react';
import Banner from './Banner';
import useAxios from '../../Hook/useAxios';
import { useQuery } from '@tanstack/react-query';
import CampCard from './CampCard/CampCard';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router';
import FeedBackRatings from './FeedBackRatings/FeedBackRatings';
import WhyChooseCampCure from './WhyChooseCampCure/WhyChooseCampCure';

const Home = () => {
    const axios = useAxios();

    const { data, isLoading } = useQuery({
        queryKey: ['popular-camps'],
        queryFn: async () => {
            const res = await axios.get('/camps?limit=6');
            return res.data;
        }
    });

     const camps = data?.result || [];
     
    console.log(camps);
    return (
        <div>
            <Banner></Banner>
            
            {/* camp section title */}
            <Fade
                direction='up'
                duration={600}
                delay={0}>
                <h2 className='text-4xl md:text-4xl lg:text-5xl text-center mt-12 md:mt-16 lg:mt-24 font-semibold text-primary'>
                    Popular Medical Camps
                </h2>
            </Fade>
          
          {/* Populer camps */}
            <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-6 md:mt-12  lg:mt-16 mb-4 md:mb-8 lg:mb-10 mx-4 md:mx-8 lg:mx-12'>
                {
                    camps.map(camp => <CampCard key={camp._id} camp={camp}></CampCard>)
                }
            </div>


            {/* see all camp btn */}
            <div className='flex justify-center my-6 md:my-8'>
            <Link to='/allCamps' className='btn btn-primary btn-outline text-lg px-6 md:px-8 hover:scale-105 transition'>See All Camps</Link>
            </div>


            {/* FeedBack and Ratings */}
            <FeedBackRatings></FeedBackRatings>


            {/* why choose camp cure  */}
            <WhyChooseCampCure></WhyChooseCampCure>

        </div>
    );
};

export default Home;